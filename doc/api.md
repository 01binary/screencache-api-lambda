# API

The API is described by `api.yaml` OpenAPI specification at the root of the repository.

## Endpoints

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
  * `POST` upload screenshot
    * [Image Upload](#image-upload-request) request
    * [Image Upload](#image-upload-response) response
* `/users`
  * `GET` [List Users](#list-users-response) response
  * `/{id}`
    * `GET` [User Details](#user-details-response) response
    * `/friends`
      * `POST` add friend
        * [Add Friend](#add-friend-request) request
        * [Friend Details](#friend-details-response) response
      * `GET` [List Friends](#list-friends-response) response
      * `/{id}`
        * `GET` [Friend Details](#friend-details-response) response
        * `PUT` [Update Friend](#update-friend-request) request
        * `DELETE` friend
    * `/messages`
      * `POST` add message
        * [Add Message](#add-message-request) request
        * [Message Details](#message-details-response) response
      * `GET` [List Messages](#list-messages-response) response
      * `/{id}`
         * `GET` [Message Details](#message-details-response) response
         * `PUT` [Update Message](#update-message-request) request
         * `DELETE` message
* `/posts`
  * `GET` [List Posts](#list-posts-response) response
  * `POST` create a post
    * [Create Post](#add-post-request) request
    * [Post Details](#post-details-response) response
  * `/{id}`
    * `GET` [Post Details](#post-details-response) response
    * `PUT` [Update Post](#update-post-request) request
    * `DELETE` post

    * `POST` `/upvote` (no body)
    * `POST` `/downvote` (no body)
    * `/schedule`
      * `GET` [Get Schedule](#schedule-response) response
      * `PUT` [Update Schedule](#schedule-request) request

    * `/comments`
      * `GET` [List Comments](#list-comments-response) response
      * `POST` add comment
        * [Add Comment](#add-comment-request) request
        * [Comment Details](#comment-details-response) response
      * `/{id}`
        * `GET` [Comment Details](#comment-details-response) response
        * `PUT` update comment
          * [Update Comment](#update-comment-request) request
          * [Comment Details](#comment-details-response) response
        * `DELETE` comment

    * `/reactions`
      * `GET` [List Reactions](#list-reactions-response) response
      * `POST` add reaction
        * [Add Reaction](#add-reaction-request) request
        * [Reaction Details](#reaction-details-response) response
      * `/{id}`
        * `GET` [Reaction Details](#reaction-details-response) response
        * `PUT` update reaction
          * [Update Reaction](#update-reaction-request) request
          * [Reaction Details](#reaction-details-response) response
        * `DELETE` reaction

    * `/invites`
      * `GET` [List Invites](#list-invites-response) response
      * `POST` invite a user
        * [Add Invite](#add-invite-request) request
        * [Invite Details](#invite-details-response) response
      * `/{id}`
        * `GET` [Invite Details](#invite-details-response) response
        * `DELETE` invite

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

### List Posts Response

```
{
	page: 1,
	limit: 5,
	pages: 15,
	posts: [
		{
			post_id: "123",
			timestamp: 98309839038,
			title: "Post title",
			description: "Post description",
			annotation: "Post annotation",
			can_vote: true,
			up_votes: 1,
			down_votes: 0,
			screenshots: [
				post_screenshot_id: "123",
				timestamp: 1234444000,
				screenshot_url: "s23232",
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
	post_id: "123",
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
			post_screenshot_id: "123",
			timestamp: 1234444000,
			screenshot_url: "s23232",
			title: "Screenshot title",
			description: "Test",
			annotation: "ML annotation"
		}
	]
}
```

### Add Post Request

Request payload sent to create or save a post.

```
{
	title: "Post title",
	description: "Typed in description",
	public: true,
	screenshots: [
		{
			screenshot_url: "https://screenache.io/screenshot3r33.jpg",
			title: "Screenshot title",
			description: "Test"
		}
	]
}
```

### Update Post Request

Request payload sent to create or save a post.

```
{
	post_id: "43403930",
	title: "Post title",
	description: "Typed in description",
	public: true,
	screenshots: [
		{
			post_screenshot_id: "09298209280",
			screenshot_url: "https://screenache.io/screenshot3r33.jpg",
			title: "Screenshot title",
			description: "Test"
		}
	]
}
```

### Schedule Request

```
{
	type: "spacedRepetition",
	start: 4343434343
}
```

### Schedule Response

```
{
	timestamp: 90290290290,
	type: "spacedRepetition",
	start: 4343434343,
	schedule_type: "spacedRepetition"
}
```

### List Comments Response

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

### Comment Details Response

```
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
```

### Add Comment Request

```
{
	post_id: "09809890",
	screenshot_id: "934343",
	comment: "hello world"
}
```

### Update Comment Request

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
	recipient: "recipient username",
	message: "We met in an alley behind WinCo"
}
```

### Friend Details Response

```
{
	friendship_id: "29038232",
	timestamp: 298292022,
	sender: "sender username",
	recipient: "recipient username",
	approved: false
}
```

### List Friends Response

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

### Update Friend Request

Sent to accept or reject a friend request.

```
{
  id: "friend request id",
	approved: true
}
```

### Add Message Request

```
{
  username: "tassock343",
  message: "Message text"
}
```

### Message Details Response

```
{
	message_id: "1234",
	timestamp: 13434343,
	sender: "tassock343",
	recipient: "lonelyranger",
	message: "Message text"
}
```

### Update Message Request

```
{
  message_id: "message id",
  message: "Message text"
}
```

### List Messages Response

```
{
  page: 1,
  pages: 5,
  limit: 10,
  messages: [
    {
      message_id: "message id",
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

### List Users Response

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

### List Reactions Response

List reactions to post, screenshots in the post, or comments in the post.

```
{
	reactions: [
		{
			reaction_id: "23343",
			timestamp: 393038093,
			username: "foxtrot",
			post_id: "9343434",
			post_screenshot_id: "393309",
			post_comment_id: "29382932",
			reaction_type: "smile"
		}
	]
}
```

### Add Reaction Request

Sent to create or update a reaction to a post, screenshot on a post, or a comment on post/screenshot.

```
{
	post_id: "9343434",
	post_screenshot_id: "393309",
	post_comment_id: "29382932",
	reaction_type: "smile"
}
```

### Reaction Details Response

```
{
	reaction_id: 3232090,
	post_id: "9343434",
	post_screenshot_id: "393309",
	post_comment_id: "29382932",
	timestamp: 902323232,
	username: "username",
	reaction_type: "smile"
}
```

### Update Reaction Request

```
{
	reaction_id: "23343",
	post_id: "9343434",
	post_screenshot_id: "393309",
	post_comment_id: "29382932",
	reaction_type: "smile"
}
```

### List Invites Response

```
{
	invites: [
		{
			invite_id: "3434343",
			post_id: "29829829",
			sender: "sender username",
			recipient: "recipient username",
			timestamp: 29020290,
			message: "Please look at my post!"
		}
	]
}
```

### Add Invite Request

```
{
	post_id: "29829829",
	recipient: "recipient username",
	message: "Please look at my post!"
}
```

### Invite Details Response

```
{
	invite_id: "3434343",
	post_id: "29829829",
	sender: "sender username",
	recipient: "recipient username",
	timestamp: 29020290,
	message: "Please look at my post!"
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
