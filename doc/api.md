# API

The API is described by `api.yaml` OpenAPI specification at the root of the repository.

* `/health` (singleton)
  * text `healthy`
* `/account` (singleton)
  * `POST` `/login`
    * [Login](#login-request) request
    * [Login](#login-response) response
  * `POST` `/logout`
  * `POST` `/signup` [Signup](#signup-request) request
  * `POST` `/validate`
    * [Validate](#validate-account-request) request
    * [Validate](#validate-account-response) response
  * `POST` `/changepassword` [Change Password](#change-password-request) request
  * `POST` `/resetpassword` [Reset Password](#reset-password-request) request
  * `POST` `/recoverpassword` [Recover Password](#recover-password-request) request
  * `GET` [Account Details](#account-details-response) response
  * `PUT` [Update Account](#update-account-request) request
  * `DELETE` account

* `/uploads` (singleton)
  * `POST` [Image Upload](#image-upload-request) request
* `/users`
  * `GET` [List Users](#users-response) response
  * `/{id}`
    * `GET` [User Details](#user-details-response) response
    * `/friends`
      * `POST` [Add Friend](#add-friend-request) request
      * `GET` [List Friends](#friends-response) response
      * `/{id}`
        * `PUT` [Accept Friend](#accept-friend-request) request
        * `DELETE` friend
    * `/messages`
      * `POST` add message
        * [Add Message](#add-message-request) request
        * [Add Message](#add-message-response) response
      * `GET` [List Messages](#messages-response) response
      * `/{id}`
         * `PUT` [Update Message](#update-message-request) request
         * `DELETE` message
* `/posts`
  * `GET` [List Posts](#posts-response) response
  * `POST` [Create Post](#post-request) request
  * `/{id}`
    * `GET` [Post Details](#post-details-response) response
    * `PUT` [Edit Post](#post-request) request
    * `DELETE` post

    * `POST` `/upvote` (no body)
    * `POST` `/downvote` (no body)
    * `PUT` `/schedule` [Schedule](#post-schedule-request) request

    * `/comments`
      * `GET` [List Comments](#comments-response) response
      * `POST` [Add Comment](#comment-request) request
      * `/{id}`
        * `PUT` [Update Comment](#comment-request) request
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

### Login Response

```
{
	access_token: "long JWT string",
	token_type: "Bearer",
	expires_in: 10000
}
```

### Account Details Response

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
			can_vote: true,
			up_votes: 1,
			down_votes: 0,
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
	can_vote: true,
	up_votes: 1,
	down_votes: 0,
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

Request payload sent to create or save a post.

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

### Post Schedule Request

```
{
	type: "spacedRepetition",
	start: 4343434343
}
```

### Comments Response

```
comments: [
	{
		comment_id: "123",
		post_id: "09809890",
		screenshot_id: "934343",
		comment_id: "34234343",
		timestamp: 98309839038,
		username: "author",
		avatar_url: "avatar image",
		comment: "hello world"
	}
]
```

### Comment Request

```
{
	post_id: "09809890",
	screenshot_id: "934343",
	comment_id: "34093039",
	comment: "hello world"
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

### Friends Response

Lists user friends.

```
{
  page: 1,
  pages: 5,
  limit: 10,
  friends: [
    {
      id: "friend request id",
      username: "tassock343",
      avatar_url: "image url",
      bio: "about me",
      location: "self reported location",
      accepted: true
    }
  ]
}
```

### Accept Friend Request

Sent to accept a friend request.

```
{
  id: "friend request id"
}
```

### Add Message Request

```
{
  username: "tassock343",
  message: "Message text"
}
```

### Add Message Response

```
{
	messageId: "1234",
	timestamp: 13434343
}
```

### Update Message Request

```
{
  id: "message id",
  message: "Message text"
}
```

### Messages Response

```
{
  page: 1,
  pages: 5,
  limit: 10,
  messages: [
    {
      id: "message id",
      username: "tassock343",
      timestamp: 232323232,
      sender: "Sender username",
      recipient: "Recipient username",
      message: "Message text"
    }
  ]
}
```

### Image Upload Request

Request payload sent to upload a screenshot.
Contains the url of the screenshot on user's device.

```
{
	url: "image url",
	name: "file name",
	type: "mime type"
}
```

### Image Upload Response

Response payload received after a screenshot was uploaded.
Contains the URL of the screenshot uploaded to S3 bucket.

```
{
	url: "image url"
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
	avatar_url: "image url",
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
