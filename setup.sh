#!/bin/bash

# Decap CMS GitHub Backend - Firebase Setup Script

echo "Setting up Decap CMS GitHub Backend with Firebase Functions..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create functions directory if it doesn't exist
if [ ! -d "functions" ]; then
  echo "Creating functions directory..."
  mkdir -p functions/src
fi

# Install dependencies in the functions directory
echo "Installing functions dependencies..."
cd functions || exit
npm install
cd ..

# Prompt for Firebase project setup
echo ""
echo "Do you want to initialize Firebase for this project? (y/n)"
read -r init_firebase

if [ "$init_firebase" = "y" ] || [ "$init_firebase" = "Y" ]; then
  echo "Running Firebase initialization..."
  npx firebase init functions
else
  echo "Skipping Firebase initialization."
  echo "You will need to run 'firebase init functions' manually if you haven't already done so."
fi

# Prompt for GitHub OAuth credentials
echo ""
echo "Would you like to configure GitHub OAuth credentials now? (y/n)"
read -r config_oauth

if [ "$config_oauth" = "y" ] || [ "$config_oauth" = "Y" ]; then
  echo "Enter your GitHub OAuth Client ID:"
  read -r client_id
  
  echo "Enter your GitHub OAuth Client Secret:"
  read -r client_secret
  
  echo "Enter your desired GitHub scope (default is 'repo'):"
  read -r scope
  
  if [ -z "$scope" ]; then
    scope="repo"
  fi
  
  echo "Setting Firebase config values..."
  npx firebase functions:config:set github.client_id="$client_id" github.client_secret="$client_secret" github.scope="$scope"
  
  echo "GitHub OAuth configuration complete!"
else
  echo "Skipping GitHub OAuth configuration."
  echo "You will need to run the following command with your credentials:"
  echo "firebase functions:config:set github.client_id=\"YOUR_GITHUB_CLIENT_ID\" github.client_secret=\"YOUR_GITHUB_CLIENT_SECRET\" github.scope=\"repo\""
fi

echo ""
echo "Setup complete!"
echo "To start the local development server, run: npm start"
echo "To deploy to Firebase, run: npm run deploy"
