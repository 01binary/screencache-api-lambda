# Introduction to Screen Cache

## Product Vision

Screen Cache is a social mobile app that lets users upload, manage and search screenshots they take while using other social platforms (including Reddit, Twitter, and Facebook) and share their uploaded screenshots with friends. Users can annotate their own screenshots and publish limited information about themselves in their profile, such as an avatar and bio. Connected users can also send messages to each other.

See [Product Requirements](./requirements.md) for a detailed breakdown of the supported functionality.

## Technology

Screen Cache will be distributed through the Apple store as an iOS application. We are using a React Native codebase scaffolded with Expo, so distributing for Android in addition to iOS can be accomplished with minimal effort.

The scalable backend infrastructure deployed on Amazon Web Services (AWS) will enable Screen Cache to serve many concurrent requests, scaling the price of running the application with the number of users without requiring changes to code, data, or the infrastructure. The infrastructure setup is scripted by using Cloud Formation and can be moved to or re-deployed on any number of additional AWS tenants.

See [Architecture Design](../architecture/index.md) for detailed information about Screen Cache application stack.
