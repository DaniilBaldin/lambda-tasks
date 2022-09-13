import inquirer from 'inquirer';
import searchQuestion from './searchQuestion.js';

const secondQuestion = () => {
    inquirer
        .prompt({
            type: 'confirm',
            name: 'searchDB',
            message: 'Do you like to search User in DB?(y/n)',
        })
        .then((answer) => (answer.searchDB ? searchQuestion() : process.exit(0)));
};

export default secondQuestion;
