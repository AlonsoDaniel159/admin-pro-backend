
import { OAuth2Client } from 'google-auth-library';


const client = new OAuth2Client(process.env.GOOGLE_SECRET);

export async function googleVerify( token ) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();

  return payload;
}
