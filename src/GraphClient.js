import { Client } from '@microsoft/microsoft-graph-client';

/**
 * Get the MS Graph client to interact with APIs
 * 
 * @param {string} accessToken token returned after successful OAuth
 * @returns {Client} client object
 */
export default (accessToken) => {
  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}
