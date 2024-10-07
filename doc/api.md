# API

The API is described by `api.yaml` at the root of the repository.

## Resources & Endpoints

```
/health (singleton)

/account (singleton)
	POST /login
	POST /logout
	POST /signup
	POST /validate
	POST /changepassword
	POST /resetpassword
	POST /recoverpassword

	GET account
	DELETE account
	PUT update account


/uploads (singleton)
	POST upload media	

/users
	GET list users
	/id
		GET user
		/friends
			GET list friends
			POST friend request
			/id
				PUT accept friend request
				DELETE friend
		/messages
			GET list messages
			POST add message
			/id
				PUT edit message
				DELETE message
/posts
	GET list posts
	POST create post
	/id
		GET post details
		PUT edit post
		DELETE post

		POST /upvote
		POST /downvote
		PUT /schedule

		/comments
			GET list comments
			POST add comment
			/id
				PUT edit comment
				DELETE comment

		/reactions
			GET list reactions
			POST react
			/id
				DELETE reaction

		/invites
			GET list invites
			POST invite a user
			/id
				DELETE invite
```

## Data Structures

TODO