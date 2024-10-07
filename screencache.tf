# Required Providers
provider "aws" {
  region = "us-west-2"
}

# API Gateway Resource
resource "aws_api_gateway_rest_api" "screencache_api_gateway" {
  name        = "screencache-api-gateway"

  # Import the OpenAPI specification from the api.yaml file
  body = file("${path.module}/api.yaml")
}

# API Gateway Deployment
resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.screencache_api_gateway.id
  stage_name  = "Prod"

  # Create the deployment every time the API spec changes
  triggers = {
    redeploy = sha256(file("${path.module}/api.yaml"))
  }

  depends_on = [
    aws_api_gateway_rest_api.screencache_api_gateway
  ]
}

# Global CORS OPTIONS Method
resource "aws_api_gateway_method" "options" {
  rest_api_id = aws_api_gateway_rest_api.screencache_api_gateway.id
  resource_id = aws_api_gateway_rest_api.screencache_api_gateway.root_resource_id
  http_method = "OPTIONS"
  authorization = "NONE"
}

# CORS Response Configuration
resource "aws_api_gateway_integration_response" "cors_response" {
  rest_api_id = aws_api_gateway_rest_api.screencache_api_gateway.id
  resource_id = aws_api_gateway_rest_api.screencache_api_gateway.root_resource_id
  http_method = aws_api_gateway_method.options.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,PUT,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  response_templates = {
    "application/json" = ""
  }
}

# API Gateway Method Response for CORS
resource "aws_api_gateway_method_response" "cors_method_response" {
  rest_api_id = aws_api_gateway_rest_api.screencache_api_gateway.id
  resource_id = aws_api_gateway_rest_api.screencache_api_gateway.root_resource_id
  http_method = aws_api_gateway_method.options.http_method
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# Lambda Role
resource "aws_iam_role" "lambda_role" {
  name = "screencache_api_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Attach Policies to the Lambda Role
resource "aws_iam_role_policy_attachment" "lambda_dynamodb_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_role_policy_attachment" "lambda_cognito_dev_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonCognitoDeveloperAuthenticatedIdentities"
}

resource "aws_iam_role_policy_attachment" "lambda_cognito_power_user_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonCognitoPowerUser"
}

# Lambda Archive
data "archive_file" "screencache_api_lambda_source" {
  type             = "zip"
  source_dir       = "./api"
  output_path      = "./api.zip"
}

# Lambda Function
resource "aws_lambda_function" "screencache_api_lambda" {
  filename         = "${data.archive_file.screencache_api_lambda_source.output_path}"
  function_name    = "screencache-api-lambda"
  role             = aws_iam_role.lambda_role.arn
  handler          = "app.handler"
  runtime          = "nodejs14.x"
  source_code_hash = "${base64sha256(data.archive_file.screencache_api_lambda_source.output_path)}"

  # Trigger creation of the Lambda zip package
  depends_on = [data.archive_file.screencache_api_lambda_source]
}

# Lambda Permission for API Gateway to invoke it
resource "aws_lambda_permission" "api_gateway_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.screencache_api_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.screencache_api_gateway.execution_arn}/*/*"
}
