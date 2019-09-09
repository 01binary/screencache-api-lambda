# Screen Cache API

Screen Cache exports a serverless public-facing API used by our mobile app client. The API is secured by HTTPS and [OAuth2 authentication](https://tools.ietf.org/html/rfc6749) using the [Password grant type](https://oauth.net/2/grant-types/password/).

See the [Screen Cache Open API Definition](../../api.yaml) for details. This file can be imported into [PostMan](https://www.getpostman.com/) to query our endpoints.

## Users

### GET /users

List registered users.

**request headers**

```
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request query string**

|Parameter|Description|
|-|-|
|q|User name query, returns users containing this keyword in their name when specified (not empty or whitespace)
|page|The 1-based page index when paginating (defaults to 1)|
|limit|How many items to return per page (defaults to 50)

**200: success**

```
Content-Type: application/json
```

```
{
    "page": 1,
    "limit": 50,
    "pages": 5,
    "users": {
        123: {
            "id": 123,
            "nickname": "xxx",
            "avatar_url": "xxx"
        },
        456: {
            "id": 456,
            "nickname": "xxx",
            "avatar_url": "xxx"
        }
    }
}
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The query parameter 'q' is too long"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The query parameter 'q' contains invalid characters"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The query parameter 'page' must be a number greater than 0"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The query parameter 'limit' must be a number greater than 0"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### GET /users/:userId

Retrieve user details.

**request headers**

```
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request path**

|Parameter|Description|
|-|-|
|userId|The user Id to retrieve the details for|

**request body**

```
No request body
```

**200: success**

```
Content-Type: application/json
```

```
{
    "id": 123,
    "nickname": "xxx",
    "avatar_url": "xxx",
    "bio": "xxx"
}
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The user id is invalid"
}
```

**404: not found**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "This user does not exist"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

## Images

### POST /users/:userId/images

Upload an image.

**request headers**

```
Content-Type: multipart/form-data
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request path**

|Parameter|Description|
|-|-|
|userId|The user to upload the image for, must be the current user|

**request body:** *multi-part form data*

```
{
    "image": {
        "uri": "xxx",
        "name": "screenshot.jpg",
        "type": "image/jpeg"
    }
}
```

**201: created**

```
Content-Type: application/json
```

```
{
    "image_id": 123,
    "image_url": "xxx"
}
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'image' is missing or invalid"
}
```

```
{
    "error": "invalid_request",
    "error_description": "This image was too large to upload, maximum size is 2 MB"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### DELETE /users/:userId/images/:imageId

Delete an uploaded image.

**request headers**

```
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request path**

|Parameter|Description|
|-|-|
|userId|The user to delete the image for, must be the current user|
|imageId|The image Id to delete|

**request body**

```
No request body
```

**204: no content**

```
No response body
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

```
{
    "error": "invalid_request",
    "error_description": "Attempted to delete image for a user Id that is not the current user"
}
```

**404: not found**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "not_found",
    "error_description": "This image Id does not exist"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

## Friends

### GET /users/:userId/friends

List user friends.

**request headers**

```
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request path**

|Parameter|Description|
|-|-|
|userId|The user to list friends for|

**request query string**

|Parameter|Description|
|-|-|
|q|Friend name query, returns friends containing this keyword in their name when specified (not empty or whitespace)
|page|The 1-based page index when paginating (defaults to 1)|
|limit|How many items to return per page (defaults to 50)

**request body**

```
No request body
```

**200: success**

```
Content-Type: application/json
```

```
{
    "page": 1,
    "limit": 50,
    "pages": 5,
    "users": {
        123: {
            "id": 123,
            "nickname": "xxx",
            "avatar_url": "xxx"
        },
        456: {
            "id": 456,
            "nickname": "xxx",
            "avatar_url": "xxx"
        }
    }
}
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The query parameter 'q' is too long"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The query parameter 'q' contains invalid characters"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The query parameter 'page' must be a number greater than 0"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The query parameter 'limit' must be a number greater than 0"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### POST /users/:userId/friends

Add a friend.

**request headers**

```
Content-Type: application/json
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request path**

|Parameter|Description|
|-|-|
|userId|The user to add a friend for, must be the current user|

**request body**

```
{
    "id": 123
}
```

**204: no content**

```
No response body
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Cannot add a friend because a user with this id does not exist"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### DELETE /users/:userId/friends/:friendId

Remove a friend.

**request headers**

```
Authorization: Bearer {ACCESS_TOKEN}
```

**request path**

|Parameter|Description|
|-|-|
|userId|The user to remove a friend for, must be the current user|
|friendId|The friend user Id to remove|

**request body**

```
No request body
```

**204: no content**

```
No response body
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**404: not found**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "not_found",
    "error_description": "A friend with this Id does not exist"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

## Posts

### GET /users/:userId/posts

List user posts.

**request headers**

```
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request path**

|Parameter|Description|
|-|-|
|userId|The user to list posts for|

**request query string**

|Parameter|Description|
|-|-|
|q|Search criteria for filtering posts including logical search operators that join search keywords
|page|The 1-based page index when paginating (defaults to 1)|
|limit|How many items to return per page (defaults to 50)

**request body**

```
No request body
```

**200: success**

```
Content-Type: application/json
```

```
{
    "page": 1,
    "limit": 50,
    "pages": 5,
    "order": [ 1234, 5678 ],
    "posts": {
        1234: {
            "id": 1234,
            "time_stamp": 999,
            "image_url": "xxx",
            "text": "xxx"
        },
        5678: {
            "id": 5678,
            "time_stamp": 999,
            "image_url": "xxx",
            "text": "xxx"
        }
    }
}
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**404: not found**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "not_found",
    "error_description": "A user with this Id does not exist"
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The query parameter 'q' is too long"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The query parameter 'page' must be a number greater than 0"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The query parameter 'limit' must be a number greater than 0"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### POST /users/:userId/posts

Create a new post.

**request headers**

```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {ACCESS_TOKEN}
```

**request path**

|Parameter|Description|
|-|-|
|userId|The user to create a new post for, must be the current user|

**request body**

```
{
    "image_url": "xxx"
    "text": "email@domain.com"
}
```

**201: created**

```
Content-Type: application/json
```

```
{
    "id": 1234,
    "time_stamp": 999
}
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**404: not found**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "not_found",
    "error_description": "A user with this Id does not exist"
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'image_url' is missing or invalid"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The image specified by 'image_url' does not exist"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'text' is too long"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### GET /users/:userId/posts/:postId

Get user post details.

**request headers**

```
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request path**

|Parameter|Description|
|-|-|
|userId|The user to retrieve the post for|
|postId|The post to retrieve|

**request body**

```
No request body
```

**200: success**

```
Content-Type: application/json
```

```
{
    "id": 1234,
    "time_stamp": 999,
    "image_url": "xxx",
    "text": "xxx",
}
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**404: not found**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "This user does not exist"
}
```

**404: not found**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "This post does not exist"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### PUT /users/:userId/posts/:postId

Update a user post.

**request headers**

```
Content-Type: application/json
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request path**

|Parameter|Description|
|-|-|
|userId|The user to update the post for, must be the current user|
|postId|The post Id to update|

**request body**

```
{
    "text": "xxx"
}
```

**204: no content**

```
No response body
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'text' is too long"
}
```

**404: not found**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "not_found",
    "error_description": "A user with this Id was not found"
}
```

**404: not found**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "not_found",
    "error_description": "A post with this Id was not found"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### DELETE /users/:userId/posts/:postId

Delete a user post.

**request headers**

```
Authorization: Bearer {ACCESS_TOKEN}
```

**request path**

|Parameter|Description|
|-|-|
|userId|The user to delete the post for, must be the current user|
|postId|The post Id to delete|

**request body**

```
No request body
```

**204: no content**

```
No response body
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**404: not found**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "not_found",
    "error_description": "A user with this Id was not found"
}
```

**404: not found**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "not_found",
    "error_description": "A post with this Id was not found"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

## Account

### GET /account

Return information about the currently logged in user's account and a short-lived CSRF Token that can be passed to other auth requests in the `CSRF-Token` header. The user information will be `null` if the Bearer token is missing or expired. 

**request headers**

```
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request body**

```
No request body
```

**200: success**

```
Content-Type: application/json
```

```
{
    "user": {
        "id": "xxx",
        "nickname": "xxx",
        "username": "email@domain.com"
    },
    "csrf_token": "xxx"
}
```

**400: invalid request**

```
{
    "error": "invalid_request",
    "error_description": "Invalid Authorization header or Bearer token"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### POST /account/login

Authenticate a user and return the access token.

**request headers**

```
Content-Type: application/json
Accept: application/json
CSRF-Token: xxx
```

**request body**: [Password Grant Request](https://www.oauth.com/oauth2-servers/access-tokens/password-grant/)

```
{
    "grant_type": "password"
    "username": "email@domain.com",
    "password": "secret"
}
```
**200: success** [Access Token Response](https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/)

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "access_token": "xxx",
    "token_type": "Bearer",
    "expires_in": 36000,
}
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_grant",
    "error_description": "Provided credentials do not match an existing user"
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The header 'CSRF-Token' is missing or invalid"
}
```

```
{
    "error": "invalid_request",
    "error_description": "Unsupported grant_type"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'username' is required"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'password' is required"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'username' must be a valid email"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'username' is too long"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'password' is too long"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### POST /account/logout

Invalidate the access token provided in the authorization header.

**request headers**

```
Authorization: Bearer {ACCESS_TOKEN}
```

**request body**

```
No request body
```

**204: no content**

```
No response body
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### POST /account/signup

Create a new user account.

**request headers**

```
Content-Type: application/json
Accept: application/json
CSRF-Token: xxx
```

**request body**

```
{
    "nickname": "xxx"
    "username": "email@domain.com",
    "password": "secret"
}
```

**200: success** [Access Token Response](https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/)

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "access_token": "xxx",
    "token_type": "Bearer",
    "expires_in": 36000,
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The header 'CSRF-Token' is missing or invalid"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'username' is required"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'username' is not a valid email"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'username' is too long"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'password' is required"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'password' is too long"
}
```

```
{
    "error": "invalid_request",
    "error_description": "This password does not meet the complexity requirements"
}
```

```
{
    "error": "invalid_request",
    "error_description": "This email is already associated with an existing account"
}
```

```
{
    "error": "invalid_request",
    "error_description": "This field 'nickname' contains invalid characters"
}
```

```
{
    "error": "invalid_request",
    "error_description": "This field 'nickname' is too long"
}
```

```
{
    "error": "invalid_request",
    "error_description": "This nickname is already taken"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### POST /account/recover-password

Request a password recovery email.

**request headers**

```
Content-Type: application/json
Accept: application/json
CSRF-Token: xxx
```

**request body**

```
{
    "username": "email@domain.com"
}
```

**204: no content**

```
No response body
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The header 'CSRF-Token' is missing or invalid"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'username' is required"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'username' is not a valid email"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'username' is too long"
}
```

```
{
    "error": "invalid_request",
    "error_description": "This username is not associated with an existing account"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### POST /account/reset-password

Reset password given a token sent in the password recovery email and login.

**request headers**

```
Content-Type: application/json
Accept: application/json
CSRF-Token: xxx
```

**request body**

```
{
    "password_reset_token": "xxx"
}
```

**200: success** [Access Token Response](https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/)

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "access_token": "xxx",
    "token_type": "Bearer",
    "expires_in": 36000,
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The header 'CSRF-Token' is missing or invalid"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'password_reset_token' is missing or invalid"
}
```

```
{
    "error": "invalid_request",
    "error_description": "This token has expired"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### POST /account/change-password

Change the currently logged in user's password.

**request headers**

```
Content-Type: application/json
Authorization: Bearer {ACCESS_TOKEN}
CSRF-Token: xxx
```

**request body**

```
{
    "password": "new password"
}
```

**204: no content**

```
No response body
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The header 'CSRF-Token' is missing or invalid"
}
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'password' is required"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'password' is too long"
}
```

```
{
    "error": "invalid_request",
    "error_description": "This password does not meet the complexity requirements"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### PUT /account

**request headers**

```
Content-Type: application/json
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request body**

```
{
    "nickname": "xxx",
    "avatar_url": "xxx",
    "bio": "xxx"
}
```

**204: no content**

```
No response body
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**400: invalid request**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "The field `nickname` contains invalid characters"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field `nickname` is too long"
}
```

```
{
    "error": "invalid_request",
    "error_description": "This nickname is already taken"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'avatar_url' does not refer to a valid uploaded image"
}
```

```
{
    "error": "invalid_request",
    "error_description": "The field 'bio' is too long"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```

### DELETE /account

Delete the logged in user's account.

**request headers**

```
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/json
```

**request body**

```
No request body
```

**204: no content**

```
No response body
```

**401: unauthorized**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "invalid_request",
    "error_description": "Invalid or missing Authorization header or Bearer token"
}
```

**500: server error**

```
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
```

```
{
    "error": "server_error",
    "error_description": "The server was unable to process this request"
}
```
