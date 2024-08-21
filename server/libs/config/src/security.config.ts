export default () => ({
  jwt: {
    secrete_access_key: process.env.JWT_SECRET_ACCESS_KEY,
    expires_in: process.env.JWT_EXPIRES,
  },
});
