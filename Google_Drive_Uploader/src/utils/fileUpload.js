import path from 'path';
import * as fs from 'fs';

import drive from './auth.js';
import generateUrl from './generateUrl.js';

const fileUpload = async (filePath) => {
    const file = filePath.replace(/['"]+/g, '');
    const response = await drive.files.create({
        requestBody: {
            name: path.parse(filePath).name,
            mimeType: 'image/jpg',
        },
        media: {
            mimeType: 'image/jpg',
            body: fs.createReadStream(file),
        },
    });
    console.log('File is uploaded!');
    const responseData = response.data;
    generateUrl(responseData);
};

export default fileUpload;
