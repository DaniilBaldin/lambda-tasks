import dotenv from 'dotenv';
import { google } from 'googleapis';
dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, REDIRECT_URL } = process.env;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

export default drive;
