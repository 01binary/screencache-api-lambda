# Screen Cache Product Requirements

See [Screen Cache UX](./ux.md) for details of the user experience.

|Domain|Description|
|-|-|
|Account|Transparent and comprehensive user authentication experience with focus on security and reducing friction|
|Screenshots|The core business domain allowing users to upload and annotate screenshots as well as share them with each other|
|Profile|The social aspect allowing users to control how they are seen and personalize their experience|
|Friends|The social aspect allowing users to build a network of friends, adding to platform equity by making it harder to leave|
|Messages|The social aspect allowing users to message each other, enabling strong and meaningful connections|

## Account

### As an anonymous user, I can signup for a new account
* **Given** I launch Screen Cache without previously logging in or having been logged out
* **When** I am presented with the **Login** screen that has `Email`, `Password`, `Login` and `Sign Up` controls
* **And** I click `Sign Up`
* **Then** I am presented with the `Sign Up` screen that has `Email`, `Nickname`, `Password`, `Password Strength`, `Sign Up` and `Back` controls
* **Then** when I fill out the form, `Email` and `Nickname` are validated as being unique
* **And** `Password` strength is validated
* **And** I click **Sign up**
* **Then** provided my account was created successfully, Screen Cache opens on the **Home** tab

### As an anonymous user, I am shown validation errors when signing up for a new account
* **Given** I am on the `Sign Up` screen
* **When** the `Email` field is blank or is not an email
* **And** the field looses focus because I tap on the form or another control
* **Then** a validation error is displayed under the field with text `Please enter a valid email`

* **Given** I am on the `Sign Up` screen
* **When** the `Nickname` field is blank
* **And** the field looses focus because I tap on the form or another control
* **Then** a validation error is displayed under the field with text `Please enter a nickname`

* **Given** I am on the `Sign Up` screen
* **When** the `Password` field does not meet password strength requirements
* **And** the field looses focus because I tap on the form or another control
* **Then** a validation error is displayed under the field based on the calculated password strength:
    * Between `0` and `2`: the warning explains the reason why the password is weak
    * Above `2`: the validation error is hidden
* **Then** a 3-segment bar under the field but above the validation error (`Password Strength` bar) updates the segments according to the password score:
    * `0` or `1`: 1 of 3 bars is filled with `Screen Cache Danger` color
    * `2`: 2 of 3 bars are filled with `Screen Cache Warning` color
    * `3`: 3 of 3 bars are filled with `Screen Cache Success` color
    * `4`: 3 of 3 bars are filled with `Screen Cache Primary` color

* **Given** I am on the `Sign Up` screen
* **When** I tap `Sign Up` button with one or more fields being invalid
* **Then** Validation errors are displayed under the respective fields

### As an anonymous user, I am shown a meaningful error when the sign up fails
* **Given** I am on the `Sign Up` screen with a validated form
* **When** I click `Sign Up` and my account was not created successfully
* **Then** I see a sign up error message with the heading `We're sorry!` and text `There was a problem with out servers. Please try again later when we've had a chance to fix this!`

### As a user, I can login to my account

* **Given** I am on the `Login` screen and haven't previously logged in or have been logged out
* **When** I enter my `Email` and `Password` correctly
* **Then** my login information is stored and I am taken to the `Home` screen

### As a user, I see a meaningful error when I can't login to my account

* **Given** I am on the `Login` screen
* **When** When I tap `Login` button but there is a server error regardless of whether my login information was typed in correctly
* **Then** an error message is displayed under the `Login` form but above the `Login` button with text `We're sorry, there was a problem with our servers. Please try logging in later.`

* **Given** I am on the `Login` screen
* **When** I enter `Email` or `Password` that don't match one of the registered users
* **Then** an error message is displayed under the `Login` form but above the `Login` button with text `Email or password are incorrect`
* **And** a secondary `Forgot Password` button is displayed before the `Login` and `Sign Up` buttons.

### As a user, I can recover my password

* **Given** I am on the `Login` screen after an unsuccessful login attempt
* **When** I tap the `Forgot Password` button
* **Then** I am taken to the `Recover Password` screen with `Email`, `Recover Password`, and `Back` controls
* **And** the `Email` field is pre-populated with `Email` from the `Login` screen
* **And** I tap `Recover Password` button
* **Then** an `Email has been sent` notification is briefly displayed and I am taken back to the `Login` screen

### As a user, I see a meaningful error when I can't recover my password

* **Given** I am on the `Recover Password` screen
* **And** the email was not found in the system
* **Then** an error message is displayed above the `Recover Password` button with text `We're sorry, we couldn't find an account associated with this email.`

* **Given** I am on the `Recover Password` screen
* **And** there was a server error when trying to recover my account
* **Then** I am presented with an error message dispoayed above the `Recover Password` button with text `We're sorry, there was a problem with our servers. Please make another attempt later.`

### As a user, I can log out of my account

* **Given** I am logged in to Screen Cache
* **When** I navigate to the `Profile` tab
* **And** I tap `Log out`
* **Then** I am taken to the `Login` screen
* **And** my login information is erased from my device

### As a user, I can manage my account

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **When** I tap `Manage your account` heading
* **Then** the heading expands to reveal `Change Password` and `Delete Account` buttons

### As a user, I can delete my account

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **And** I tapped the `Manage your account` heading to expand it
* **And** I tapped the `Delete Account` button
* **Then** I see a confirmation prompt with heading `Delete Account`, text `Are you sure you want to delete your account?`, `Cancel`, and `Yes, delete my account` buttons
* **And** I tap `Yes, delete my account` button
* **Then** my account is deleted and I am directed to the `Login` screen

### As a user, I can see a meaningful error message when my account could not be deleted

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **And** I tapped the `Manage your account` heading to expand it
* **And** I tapped the `Delete Account` button
* **When** I tap `Yes, delete my account` on the `Delete Account` confirmation prompt
* **And** my account could not be deleted due to a server error
* **Then** I see an error [banner](https://material.io/components/banners/) with text `Error communicating with our servers`
* **And** the error persists while the application retries the request with exponential back-off
* **And** the error is hidden if the request finally succeeds
* **And** user has the option to go back to the previous screen, which will stop retrying the request

### As a user, I can change my password

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **And** I tap the `Manage your account` heading to expand it
* **And** I tap the `Change Password` button
* **Then** I am directed to the `Change Password` screen with `New Password`, `Confirm Password`, `Password Strength`, `Change Password` and `Back` controls
* **And** I tap the `Change Password` button after entering and confirming my new password
* **And** the form has no validation errors for `Confirm Password` or `Password Strength`
* **Then** my password is changed
* **And** I see an informational [banner](https://material.io/components/banners/) with text `Your password has been changed`
* **And** The banner disappears after one second

### As a user, I can see meaningful validation errors when submitting the change password form

* **Given** I am logged into Screen Cache
* **And** I am submitting the `Change Password` form
* **When** the `New Password` does not match the password requirements
* **And** the field looses focus because I tap on the form or another control
* **Then** a validation error is displayed under the field based on the calculated password strength:
    * Between `0` and `2`: the warning explains the reason why the password is weak
    * Above `2`: the validation error is hidden
* **Then** a 3-segment bar (`Password Strength` bar) under the field but above the validation error updates the segments according to the password score:
    * `0` or `1`: 1 of 3 bars is filled with `Screen Cache Danger` color
    * `2`: 2 of 3 bars are filled with `Screen Cache Warning` color
    * `3`: 3 of 3 bars are filled with `Screen Cache Success` color
    * `4`: 3 of 3 bars are filled with `Screen Cache Primary` color

* **Given** I am logged into Screen Cache
* **And** I am submitting the `Change Password` form
* **When** the text entered into `Confirm Password` field does not match the text in `New Password` field
* **And** the field looses focus because I tap on the form or another control
* **Then** a validation error is displayed under the field with text `Please re-enter the same password`

### As a user, I can see a meaningful error message when my password could not be changed

* **Given** I am logged into Screen Cache
* **And** I am submitting the `Change Password` form
* **When** my password could not be changed due to a server error
* **Then** I see an error [banner](https://material.io/components/banners/) with text `Error communicating with our servers`
* **And** the error persists while the application retries the request with exponential back-off
* **And** the error is hidden if the request finally succeeds
* **And** user has the option to go back to the previous screen, which will stop retrying the request

## Screenshots

### As a user, I can upload and annotate a screenshot

* **Given** I am logged in to Screen Cache
* **When** I tap the `Upload` button on the right side of the bottom tab bar
* **Then** I am taken to the `Upload` screen with `Browse` and `Upload` controls
* **And** I tap `Browse`
* **Then** I can select an image from my camera roll
* **And** the image is displayed filling all available space above the `Browse` and `Upload` controls
* **And** I tap `Upload`
* **Then** the image is uploaded and I am taken to the `Home` screen
* **And** the new image is displayed at the top of the list of screenshots on the `Home` screen
* **And** the focus is set to the text entry field allowing me to annotate the image
* **And** I enter the annotation text
* **And** I tap on another part of the screen
* **Then** the annotation for the image is updated

### As a user, I see a meaningful error when the application doesn't have access to my camera roll

* **Given** I am logged into Screen Cache and on the `Upload` screen
* **When** I tap the `Upload` button
* **And** the application doesn't have access to my camera roll
* **Then** an error message is displayed above the `Upload` button with text `Please let Screen Cache access your camera roll in your phone's settings.`

### As a user, I see a meaningful error when the screenshot upload has failed

* **Given** I am logged into Screen Cache and on the `Upload` screen
* **When** I tap the `Upload` button
* **And** the upload fails due to a server error
* **Then** an error message is displayed above the `Upload` button with text `We're sorry, there was a problem with our servers that prevented the upload. Please try again later!`

### As a user, I can view my screenshots

* **Given** I am logged into Screen Cache
* **When** I access the `Home` screen
* **Then** I can see a list of my uploaded screenshots with associated annotations arranged in descending order by upload date
* **And** a search bar is displayed under the top menu and above the list of screenshots

### As a user, I can search screenshots by keywords appearing in text

* **Given** I am logged into Screen Cache and on the `Home` screen
* **When** I type in a search criteria consisting of one or more case-insensitive keywords optionally separated by search operators:
    * `+`, `and`, any other punctuation or whitespace character: the keywords or groups of keywords separated by this operator must both appear in annotated text
    * `or`: either keyword or either group of keywords separated by this operator must appear in annotated text
    * `-`, `not`: the keyword directly following this operator must not appear in annoated text
* **Then** the list of uploaded screenshots is filtered to the ones that match the search criteria
* **And** contiguous whitespace or punctuation in the search criteria are normalized to `and` operators joining the keywords

### As a user, I can erase the search bar to remove the search filter

* **Given** I am logged into Screen Cache
* **And** I am viewing the list of screenshots on the `Home` screen
* **And** I specified a search criteria
* **When** I erase the search bar
* **Then** Then the list of screenshots is no longer filtered

### As a user, I can enter whitespace and punctuation into the search bar with no keywords by mistake without affecting the search filter

* **Given** I am logged into Screen Cache
* **And** I am viewing the list of screenshots on the `Home` screen
* **And** I typed in a search criteria containing only whitespace and punctuation either by mistake or by erasing parts of keywords
* **Then** the search criteria or parts of search criteria not containing then keywords is ignored

### As a user, I see a meaningful message when search criteria excludes all items

* **Given** I am logged into Screen Cache
* **And** I am viewing the list of screenshots on the `Home` screen
* **When** I enter a search criteria that doesn't match any items
* **Then** I see a message in the empty list area with text `Your search criteria doesn't match any items`

### As a user, I can edit text associated with a screenshot

* **Given** I am logged into Screen Cache
* **And** I am viewing the list of screenshots on the `Home` screen
* **When** I tap on the text of one of the items
* **Then** the text area becomes editable
* **And** all text in the text area is selected so that it's ready to be replaced by typing or pasting
* **And** I am able to edit the text
* **Then** tapping on another part of the interface to remove the focus from the text area will save changes
* **And** after saving changes, the list of screnshots keeps its scroll position or scrolls to the top of item being edited

### As a user, I can paste into the text area of a screenshot

* **Given** I am logged into Screen Cache
* **And** I am viewing the list of screenshots on the `Home` screen
* **When** I tap on the text of one of the items
* **Then** the text area becomes editable
* **And** all text in the text area is selected so that it's ready to be replaced by typing or pasting
* **And** I perform a long press on the text area by tapping and holding for at least one second
* **Then** any text on the clipboard is pasted into the text area
* **Then** a small toast message appears within the item for one second with text `Copied to clipboard!`
* **And** tapping on another part of the interface to remove the focus from the text area will save changes
* **And** after saving changes, the list of screnshots keeps its scroll position or scrolls to the top of item being edited

### As a user, I see a meaningful error message when screenshot text could not be edited

* **Given** I am logged into Screen Cache
* **And** I am editing screenshot text
* **When** I am done editing text but there is a server error while saving changes
* **Then** I see an error [banner](https://material.io/components/banners/) with text `Error communicating with our servers`
* **And** the error persists while the application retries the edit request with exponential back-off
* **And** the error is hidden if the request finally succeeds
* **And** user has the option to go back to the previous screen, which will loose the changes being requested

### As a user, I can delete a screenshot

* **Given** I am logged into Screen Cache
* **And** I am viewing the list of screenshots on the `Home` screen
* **When** I swipe left on one or more items
* **Then** The items I swiped on slide to the left to expose a `Delete` button
* **Then** I am prompted for a confirmation to delete the item if I tap the `Delete` button
* **Then** The item is deleted from the list while keeping the list scroll position

### As a user, I see a meaningful error message when a screenshot could not be deleted

* **Given** I am logged into Screen Cache
* **And** I am viewing the list of screenshots on the `Home` screen
* **And** I tapped the `Delete` button on an item after swiping left to expose this action
* **And** there was a server error while attempting to delete the item
* **Then** I see an error [banner](https://material.io/components/banners/) with text `Error communicating with our servers`
* **And** the error persists while the application retries the delete request with exponential back-off
* **And** the error is hidden if the request finally succeeds
* **And** user has the option to go back to the previous screen, which will loose the changes being requested

## Profile

### As a user, I can view my profile

* **Given** I am logged into Screen Cache
* **When** I tap the `Profile` button on the top tab bar (displayed as a face outline icon)
* **Then** I am taken to the `Profile` screen with `Avatar`, `Bio`, `Friends`, `Add Friend`, and `Manage your account` controls

### As a user, I can update my avatar image

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **When** I click on the `Avatar` image
* **Then** I can select an image to use as my avatar from my camera roll
* **Then** my avatar is updated to fit the avatar image control

### As a user, I see a meaningful error message when my avatar image could not be updated

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **And** there was a server error while attempting to update my avatar image
* **Then** I see an error [banner](https://material.io/components/banners/) with text `Error communicating with our servers`
* **And** the error persists while the application retries the update request with exponential back-off
* **And** the error is hidden if the request finally succeeds
* **And** user has the option to go back to the previous screen, which will loose the changes being requested

### As a user, I can update my bio

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **When** I click on the `bio` label
* **Then** the `bio` label becomes editable
* **And** all of the text in the `bio` text box is selected, if any
* **And** I type my updated bio blurb
* **And** I tap another UI element to focus out of the `bio` text box, completing the edit
* **Then** my bio is updated

### As a user, I see a meaningful error message when my bio could not be updated

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **And** there was a server error while attempting to update my bio
* **Then** I see an error [banner](https://material.io/components/banners/) with text `Error communicating with our servers`
* **And** the error persists while the application retries the update request with exponential back-off
* **And** the error is hidden if the request finally succeeds
* **And** user has the option to go back to the previous screen, which will loose the changes being requested

## Friends

### As a user, I can view my friends

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **Then** I can see a list of my friends or a message `Add some friends here!`
* **And** each friend is displayed with their nickname and avatar

### As a user, I can search for and send a friend request to a friend

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **When** I tap the `Add Friend` button
* **Then** I am taken to the `Find Friends` screen with `Search` text box, `Search Friends` list, and `Back` button
* **And** I start typing into `Search` text box
* **Then** `Search Friends` list is populated with search results while the search criteria is not empty and does not entirely consist of whitespace
* **And** each item includes an `Alias` that contains the search criteria in addition to `Add Friend` button
* **And** I tap the `Add Friend` button
* **Then** the `Add Friend` button is toggled and the friend request is sent

### As a user, I see a meaningful error message when sending a friend request fails

* **Given** I am logged into Screen Cache
* **And** I am on the `Find Friends` screen
* **When** I tap the `Add Friend` button on a search result
* **And** there was a server error while sending the friend request
* **Then** I see an error [banner](https://material.io/components/banners/) with text `Error communicating with our servers`
* **And** the error persists while the application retries the request with exponential back-off
* **And** the error is hidden if the request finally succeeds
* **And** user has the option to go back to the previous screen, which will loose the changes being requested

### As a user, I can accept a friend request

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **When** I have one or more friend requests
* **Then** the friend requests are displayed at the top of the `Friends` list
* **And** I tap `Accept` on one or more friend requests
* **And** the friend requests are accepted successfullly
* **Then** the `Accept` button on the accepted friend requests is replaced by text `Accepted!`
* **Then** the `Approved!` label is hidden after one second

### As a user, I see a meaningful error message when accepting a friend request fails

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **When** I accept one or more friend requests
* **And** the was a server error accepting the friend requests
* **Then** I see an error [banner](https://material.io/components/banners/) with text `Error communicating with our servers`
* **And** the error persists while the application retries the request with exponential back-off
* **And** the error is hidden if the request finally succeeds
* **And** user has the option to go back to the previous screen, which will loose the changes being requested

### As a user, I can remove a friend or a friend request

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **When** I tap `Remove` on a friend or a friend request
* **Then** the friend or a friend request is removed from the list
* **And** if a friend was removed, they will no longer see the current user in their friends list

### As a user, I can see a meaningful error message when removing a friend or a friend request fails

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **When** I tap `Remove` on a friend or a friend request
* **And** the was a server error removing the friend or a friend request
* **Then** I see an error [banner](https://material.io/components/banners/) with text `Error communicating with our servers`
* **And** the error persists while the application retries the request with exponential back-off
* **And** the error is hidden if the request finally succeeds
* **And** user has the option to go back to the previous screen, which will loose the changes being requested

### As a user, I can view a friend's screenshots

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Profile` screen
* **When** I tap on a friend in my `Friends` list
* **Then** I am taken to my `Home` screen displaying my friend's screenshots instead of my own

> Note: acceptance criteria for friend's screenshots is the same as for the user's own screenshots, including all searching and error cases.

## Messages

### As a user, I can view messages sent to a friend

* **Given** I am logged into Screen Cache
* **When** I tap on `Messages` icon on the top navigation bar
* **Then** I am directed to `Messages` screen with `Friends`, `Search Friends`, `Messages`, `Message` and `Send` controls
* **And** The `Message` list displays a message with text `Select a friend to see your messages`
* **And** I tap on a friend
* **Then** I see the message history with that friend
* **And** messages are arranged in ascending order with last message displayed last
* **And** the `Messages` list is scrolled to display the last message

### As a user, I can see a meaningful error message when my messages sent to a friend could not be loaded

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Messages` screen
* **When** I tap on a friend in the `Friends` list to see my correspondence with that friend
* **And** there is a server error loading the message history
* **Then** I see a meaningful error in the `Messages` list with text `We're sorry, there is an issue with our servers`
* **And** I see an error [banner](https://material.io/components/banners/) with text `Error communicating with our servers`
* **And** the error persists while the application retries the request with exponential back-off
* **And** the error is hidden if the request finally succeeds
* **And** user has the option to go back to the previous screen, which will stop retrying the request

### As a user, I can send a message to a friend

* **Given** I am logged into Screen Cache
* **And** I am viewing my correspondence with a friend on the `Messages` screen
* **When** I type text into the `Message` field
* **And** tap `Send` button
* **Then** the message I typed will be seen by that friend the next time their Screen Cache client requests an update from the server using the pull notification strategy

### As a user, I can see a meaningful error message when a message I sent to a friend could not be processed

* **Given** I am logged into Screen Cache
* **And** I am viewing my correspondence with a friend on the `Messages` screen
* **When** I attempt to message a friend by typing in the `Message` field and tapping `Send` button
* **And** there was a server error while sending the message
* **Then** I see an error [banner](https://material.io/components/banners/) with text `Error communicating with our servers`
* **And** the error persists while the application retries the request with exponential back-off
* **And** the error is hidden if the request finally succeeds
* **And** user has the option to go back to the previous screen, which will stop retrying the request

### As a user, I can search friends on the messages screen

* **Given** I am logged into Screen Cache
* **And** I am viewing the `Messages` screen
* **When** I type into `Search Friends` field
* **Then** the `Friends` list is filtered based on case-insensitive sub-string search based on the text I entered in `Search Friends` field, without attempting to tokenize the search criteria
