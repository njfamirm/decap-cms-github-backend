# Post-installation Guide for GitHub OAuth Helper

Thank you for installing the GitHub OAuth Helper extension!

## Function URLs

This extension deploys two HTTPS functions:

*   **`auth` function:** This function initiates the OAuth flow.
    *   URL: `https://<region>-<your-project-id>.cloudfunctions.net/ext-<instanceId>-auth`
    *   (The `instanceId` is `github-oauth-helper-decap-cms` if you used the default, or your custom instance ID if you provided one during installation).
*   **`callback` function:** This function handles the callback from GitHub.
    *   URL: `https://<region>-<your-project-id>.cloudfunctions.net/ext-<instanceId>-callback`

You can find the exact URLs for your deployed functions in the Firebase console under Functions, or on the Extensions dashboard by selecting this installed extension. The `LOCATION` parameter you selected during installation determines the `<region>` part of the URL.

## Using with Decap CMS (formerly Netlify CMS)

If you are using this extension for Decap CMS, you will need to configure your Decap CMS `config.yml` file.

Update the `backend` section of your `config.yml` like this:

```yaml
backend:
  name: github
  repo: your-username/your-repo # Your GitHub repository
  # Replace with the auth function URL from this extension
  base_url: https://<region>-<your-project-id>.cloudfunctions.net/ext-<instanceId>
  auth_endpoint: auth # This will be appended to base_url
  # branch: main # Optional, defaults to main
  # site_domain: your-site.com # Optional
```

**Important:**
*   Replace `https://<region>-<your-project-id>.cloudfunctions.net/ext-<instanceId>` with the base URL of your deployed functions (i.e., up to where `auth` or `callback` would start).
*   Ensure your GitHub OAuth Application's "Authorization callback URL" is correctly set to the full URL of the `callback` function (e.g., `https://<region>-<your-project-id>.cloudfunctions.net/ext-<instanceId>-callback`).

## Security

Remember that your GitHub Client ID and Client Secret are sensitive. This extension stores the Client Secret as a secret in Google Secret Manager.

If you have any questions or issues, please refer to the extension's repository or documentation.
