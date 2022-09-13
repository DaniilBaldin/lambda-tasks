import inquirer from 'inquirer';
import firstQuestion from './firstQuestion.js';
import fs from 'fs';

const userQuestions = (userInfo) => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'Gender',
                message: 'Select gender from the list:',
                choices: ['male', 'female', 'other'],
            },
            { type: 'input', name: 'Age', message: 'Enter your Age:' },
        ])
        .then((answers) => {
            let userName = userInfo;
            let answersInfo = answers;
            let userData = Object.assign(userName, answersInfo);
            fs.appendFileSync('database.txt', `${JSON.stringify(userData)}\n`);
            firstQuestion();
        });
};

export default userQuestions;
