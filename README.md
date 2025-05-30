# Decap CMS Github backend

OAuth service as Github backend for Decap CMS powered by Firebase Functions, inspired by [netlify-cms-oauth](https://github.com/ublabs/netlify-cms-oauth)

## Setup and Deployment

### Prerequisites

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Create a Firebase project or use an existing one
4. Update `.firebaserc` with your Firebase project ID

### Configuration

1. Set up your GitHub OAuth credentials:

```bash
firebase functions:config:set github.client_id="YOUR_GITHUB_CLIENT_ID" github.client_secret="YOUR_GITHUB_CLIENT_SECRET" github.scope="repo"
```

### Deploy

```bash
# Install dependencies
npm install
cd functions && npm install && cd ..

# Build and deploy
npm run deploy
```

### Local Development

```bash
# Install dependencies
npm install
cd functions && npm install && cd ..

# Start Firebase emulators
npm start
```

## Usage

Read [A Step-by-Step Guide to Self-Hosting Decap CMS without Netlify
](https://medium.com/@njfamirm/a-step-by-step-guide-to-self-hosting-decap-cms-5425ab44abca) from medium to learn how to use this service with Decap CMS.

### Important Firebase Function URLs

After deployment, your endpoints will be available at:
- Home: `https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/home`
- Auth: `https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/auth`
- Callback: `https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/callback`

Update your Decap CMS configuration to use these endpoints.
