import inquirer from 'inquirer';
import secondQuestion from './secondQuestion.js';
import userQuestions from './userQuestions.js';

const firstQuestion = () => {
    inquirer
        .prompt({
            type: 'input',
            name: 'Name',
            message: "Enter user's name. To cancel press ENTER.",
        })
        .then((answer) => (answer.Name !== '' ? userQuestions(answer) : secondQuestion()));
};

firstQuestion();

export default firstQuestion;
