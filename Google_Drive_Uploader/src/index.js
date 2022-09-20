import inquirer from 'inquirer';
import path from 'path';

import changePath from './utils/changePath.js';
import fileUpload from './utils/fileUpload.js';

const firstQuestion = () => {
    inquirer
        .prompt({
            type: 'input',
            name: 'Name',
            message: 'Drag and drop your image to terminal and press ENTER for upload:',
        })
        .then((answer) => {
            const res = JSON.parse(JSON.stringify(answer));
            console.log(`Path to file: ${res.Name} \nFile name: ${path.basename(res.Name)} \nFile extention: ${path.extname(res.Name)}`);
            answer.Name !== '' ? secondQuestion(answer.Name) : process.exit();
        });
};

const secondQuestion = (inputPath) => {
    inquirer
        .prompt({
            type: 'confirm',
            name: 'confirmChange',
            message: 'Do you like to change name of the file? (y/n)',
        })
        .then((answer) => {
            answer.confirmChange !== false ? changePath(inputPath) : fileUpload(inputPath);
        });
};

firstQuestion();

export default fileUpload;
