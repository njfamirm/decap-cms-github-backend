# Pre-installation Setup for GitHub OAuth Helper

This extension provides HTTPS functions to perform a GitHub OAuth 2.0 flow. Before installing, you need to create a GitHub OAuth Application.

## 1. Create a GitHub OAuth Application

1.  Go to your GitHub **Developer settings**. You can find this by clicking your profile picture in the top-right corner, then **Settings**, then **Developer settings** in the left sidebar.
2.  Click **OAuth Apps**, then **New OAuth App**.
3.  Fill in the application details:
    *   **Application name:** Choose a descriptive name (e.g., "My Decap CMS Auth").
    *   **Homepage URL:** Your application's main URL (e.g., your Decap CMS site URL).
    *   **Application description:** Optional.
    *   **Authorization callback URL:** This is important. It needs to be the URL of the `callback` function that this extension will deploy. It will be in the format: `https://<your-firebase-project-id>.cloudfunctions.net/ext-github-oauth-helper-decap-cms-callback` or `https://<region>-<your-firebase-project-id>.cloudfunctions.net/ext-github-oauth-helper-decap-cms-callback` if you choose a non-default region. You can also use a custom domain if configured for your Firebase Functions.
        *   **Note:** You might need to install the extension first to get the exact callback URL, and then update it in your GitHub OAuth App settings. Alternatively, you can often use a placeholder like `https://localhost` initially and update it after deployment. Some OAuth providers allow multiple callback URLs.
4.  Click **Register application**.
5.  On the next page, you will see your **Client ID** and you can generate a **Client Secret**. **Copy these values.** You will need them to configure this extension during installation.

## 2. Billing Account

This extension deploys Cloud Functions. To deploy Cloud Functions, your Firebase project must be on the Blaze (pay-as-you-go) billing plan.

Once you have your GitHub OAuth Client ID and Client Secret, you are ready to install this extension.
