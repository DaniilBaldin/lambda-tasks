import prettylink from 'prettylink';
import inquirer from 'inquirer';

import drive from './auth.js';

const tinyurl = new prettylink.TinyURL();

const shortUrl = async (longUrl) => {
    const short = await tinyurl.short(longUrl);
    console.log(short);
};

const generateUrl = async (responseData) => {
    try {
        const fileId = responseData.id;
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
        const longUrl = result.data.webViewLink;
        inquirer
            .prompt({
                type: 'confirm',
                name: 'shortUrl',
                message: 'Would you like to shorten your link? (y/n):',
            })
            .then((answer) => {
                answer.shortUrl !== true ? console.log(longUrl) : shortUrl(longUrl);
            });
    } catch (error) {
        console.log(error.message);
    }
};

export default generateUrl;
