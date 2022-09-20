import inquirer from 'inquirer';
import path from 'path';
import * as fs from 'fs';

import fileUpload from '../index.js';

const changePath = (input) => {
    let pathToChange = JSON.parse(JSON.stringify(input));
    inquirer
        .prompt({
            type: 'input',
            name: 'newName',
            message: 'Please enter new file name without extension: ',
        })
        .then((answer) => {
            let oldName = path.basename(pathToChange).replace(/['"]+/g, '');
            let newName = `${answer.newName}.jpg`;
            fs.renameSync(oldName, newName, () => {
                console.log('File Name changed!');
            });
            const newPath = path.join(path.dirname(pathToChange), newName);
            fileUpload(newPath);
        });
};

export default changePath;
