# GitHub OAuth Helper Firebase Extension

This Firebase Extension provides HTTPS-triggered functions to handle the GitHub OAuth 2.0 flow. It is particularly useful as a backend for static site generators or CMS platforms like [Decap CMS](https://decapcms.org/) (formerly Netlify CMS) that require GitHub authentication.

## Features

*   **Simple OAuth Flow:** Implements the standard `authorization_code` grant type for GitHub.
*   **Configurable:** Set your GitHub OAuth Client ID, Client Secret, and desired scopes during installation.
*   **Secure:** Leverages Firebase's built-in secret management for your GitHub Client Secret.
*   **Easy Integration:** Designed for straightforward integration with services needing GitHub authentication.

## How it Works

1.  A client application (e.g., Decap CMS) directs the user to the `auth` function provided by this extension.
2.  The `auth` function constructs the GitHub authorization URL (including your Client ID and scopes) and redirects the user to GitHub.
3.  The user authenticates with GitHub and authorizes the application.
4.  GitHub redirects the user back to the `callback` function provided by this extension, along with an authorization code.
5.  The `callback` function exchanges this code (along with your Client ID and Client Secret) for a GitHub access token.
6.  The `callback` function then returns the access token to the client application using `window.postMessage`.

## Pre-installation Setup

Please see the [PREINSTALL.md](PREINSTALL.md) file for detailed instructions on creating a GitHub OAuth application and other prerequisites.

## Post-installation

Please see the [POSTINSTALL.md](POSTINSTALL.md) file for guidance on how to use the deployed functions and integrate with services like Decap CMS.

## Configuration Parameters

When you install this extension, you will be prompted for the following parameters:

*   **GitHub OAuth Client ID:** (Required) Your GitHub OAuth Application's Client ID.
*   **GitHub OAuth Client Secret:** (Required) Your GitHub OAuth Application's Client Secret.
*   **GitHub OAuth Scopes:** (Optional, default: `repo`) The OAuth scopes to request from GitHub (e.g., 'repo', 'user').
*   **Cloud Functions Region:** (Required) The region where you want to deploy the Cloud Functions.

## Implemented Functions

*   **`auth`**: Initiates the OAuth flow.
*   **`callback`**: Handles the callback from GitHub and returns the access token.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This extension is released under the [MIT License](LICENSE).
