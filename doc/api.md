# API

The API is described by `api.yaml` OpenAPI specification at the root of the repository.

* `/health` (singleton)
* `/account` (singleton)
  * `POST` `/login`
  * `POST` `/logout`
  * `POST` `/signup`
  * `POST` `/validate`
  * `POST` `/changepassword`
  * `POST` `/resetpassword`
  * `POST` `/recoverpassword`
  * `GET` account details
  * `DELETE` account
  * `PUT` update account

* `/uploads` (singleton)
  * `POST` upload screenshot

* `/users`
  * `GET` list users
  * `/{id}`
    * `GET` user
    * `/friends`
      * `GET` list friends
      * `POST` friend request
      * `/{id}`
        * `PUT` accept friend request
        * `DELETE` friend
    * `/messages`
      * `GET` list messages
      * `POST` add message
      * `/{id}`
         * `PUT` edit message
         * `DELETE` message
* `/posts`
  * `GET` list posts
  * `POST` create post
  * `/{id}`
    * `GET` post details
    * `PUT` edit post
    * `DELETE` post

    * `POST` `/upvote`
    * `POST` `/downvote`
    * `PUT` `/schedule`

    * `/comments`
      * `GET` list comments
      * `POST` add comment
      * `/{id}`
        * `PUT` edit comment
        * `DELETE` comment

    * `/reactions`
      * `GET` list reactions
      * `POST` react to post, post screenshot, or comment
      * `/{id}`
        * `DELETE` reaction

    * `/invites`
      * `GET` list invites
      * `POST` invite a user
      * `/{id}`
        `DELETE` invite

## Data Structures

### Validate Account Request

Validate the signup form.

```
{
	username: "weevoil",
	password: "ikoinokai"
}
```

### Validate Account Response

New account validation result.

```
{
	username_result: {
		valid: true
	},
	password_result: {
		valid: true,
		score: 20.
		feedback: {
			warning: "Rationale here",
			suggestions: [
				"Try including a number",
				"Make it longer"
			]
		}
	}
}
```

### Login Request

Login with username and password.

```
{
	grant_type: "password",
	username: "lonelyranger",
	password: "sixshooter"
}
```

### Change Password Request

Change current user password.

```
{
	password: "XWmRawEcKNuKoWyk"
}
```

### Reset Password Request

Reset password after requesting a reset.

```
{
	password_reset_token: "09809EFFF",
	new_password: "I5mxYaOJmwGwQKf5"
}
```

### Recover Password Request

Sends an email to the user with their username and password.

```
{
	email: "lonely_ranger@yahoo.com"
}
```

### Signup Request

```
{
	username: "kontaktuser",
	email: "andy@outlook.com",
	password: "GxRihKiZiO1g5Xfa"
}
```

### Signin Response

```
{
	access_token: "long JWT string",
	token_type: "Bearer",
	expires_in: 10000
}
```

### Get Account Response

```
{
	id: "30493043",
	username: "trevor",
	email: "trevor@email.com",
	bio: "Skateboarding is life",
	location: "Austin, TX",
	avatar_url: "http://screencache/images/123.jpg"
}
```

### Update Account Request

```
{
	avatar_url: "http://screencache/images/123.jpg",
	bio: "A little about me",
	location: "Austin, TX",
	email: "lonely_ranger@yahoo.com"
}
```

### Posts Response

```
{
	page: 1,
	limit: 5,
	pages: 15,
	posts: [
		{
			id: "123",
			timestamp: 98309839038,
			title: "Post title",
			description: "Post description",
			annotation: "Post annotation",
			screenshots: [
				id: "123",
				timestamp: 1234444000,
				url: "s23232",
				title: "Screenshot title",
				description: "Test",
				annotation: "ML annotation"
			]
		}
	]
}
```

### Post Details Response

Response payload returned for post details.

```
{
	id: "123",
	timestamp: 1234444000,
	title: "Post title",
	description: "Typed in description",
	annotation: "ML annotation",
	public: true,
	screenshots: [
		{
			id: "123",
			timestamp: 1234444000,
			url: "s23232",
			title: "Screenshot title",
			description: "Test",
			annotation: "ML annotation"
		}
	]
}
```

### Post Request

Request payload sent to save a post.

```
{
	title: "Post title",
	description: "Typed in description",
	public: true,
	screenshots: [
		{
			id: "123",
			url: "https://screenache.io/screenshot3r33.jpg",
			title: "Screenshot title",
			description: "Test"
		}
	]
}
```

### Add Friend Request

Request payload sent to request a friend connection.

```
{
	userId: "target user id",
	message: "We met in an alley behind WinCo"
}
```

### Image Upload Request

Request payload sent to upload a screenshot.
Contains the URI of the screenshot on user's device.

```
{
	uri: "image uri",
	name: "file name",
	type: "mime type"
}
```

### Image Upload Response

Response payload received after a screenshot was uploaded.
Contains the URI of the screenshot uploaded to S3 bucket.

```
{
	uri: "image uri"
}
```

### Users Response

```
{
	page: 1,
	pages: 5,
	limit: 10,
	users: [
		{
			username: "teddy",
			avatar_url: "image url",
			bio: "about me",
			location: "Austin, TX"
		},
		...
	]
}
```

### User Details Response

```
{
	username: "legacywolf",
	avatar_url: "image uri",
	bio: "Born to be wild",
	location: "Salem, OR"
}
```

### Error Response

Response sent for 4xx and 5xx errors.

```
{
	error: "error code",
	error_description: "error description"
}
```
