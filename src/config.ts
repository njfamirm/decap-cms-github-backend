export const config = {
  client: {
    id: process.env.OAUTH_GITHUB_CLIENT_ID as string,
    secret: process.env.OAUTH_GITHUB_CLIENT_SECRET as string,
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize',
  },
};
