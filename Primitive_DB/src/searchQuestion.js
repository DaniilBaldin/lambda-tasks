import inquirer from 'inquirer';
import fs from 'fs';
import firstQuestion from './firstQuestion.js';

const searchQuestion = () => {
    let usersDB = fs.readFileSync('database.txt', 'utf-8');
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
            let user = answer.user;
            let searchResult = result.filter((e) => user.includes(e.Name));
            if (!searchResult.length || searchResult.Name !== user) {
                console.log('User not found!');
                searchQuestion();
            }
            console.log(`User "${user}" is found! Search result:`);
            console.log(searchResult);
            firstQuestion();
        });
};

export default searchQuestion;
