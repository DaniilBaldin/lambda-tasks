import inquirer from 'inquirer';
import fs from 'fs';

const firstQuestion = () => {
    inquirer
        .prompt({
            type: 'input',
            name: 'Name',
            message: "Enter user's name. To cancel press ENTER.",
        })
        .then((answer) => (answer.Name !== '' ? elseQuestions(answer) : searchQuestion()));
};

const elseQuestions = (userInfo) => {
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

const searchQuestion = () => {
    inquirer
        .prompt({
            type: 'confirm',
            name: 'searchDB',
            message: 'Do you like to search User in DB?(y/n)',
        })
        .then((answer) => (answer.searchDB ? searchUser() : process.exit(0)));
};

const searchUser = () => {
    let usersDB = fs.readFileSync('database.txt', 'utf-8');
    console.log(usersDB);
    inquirer
        .prompt({
            type: 'input',
            name: 'user',
            message: ' Enter username to search:',
        })
        .then((answer) => {
            let result = usersDB
                .split('\n')
                .filter((e) => e !== '')
                .map(JSON.parse);
            let u = Object.values(answer);
            let res = result.filter((e) => u.includes(e.Name));
            if (res.length) {
                console.log(`User "${u}" is found! Search result:`);
                console.log(res);
                firstQuestion();
            } else if (res == '') {
                console.log('Please enter username!');
                searchUser();
            }
        });
};

firstQuestion();
