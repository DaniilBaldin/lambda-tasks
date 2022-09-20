const questions = require('./utils/questions');

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: questions.questions,
});

rl.question('Hello. Enter words or digits, that you want to sort, dividing them with spaces: ', (userInput) => {
    if (userInput === 'exit') {
        readline.close();
    }

    let input = userInput.split(/[, ]+/);
    const onlyWords = input.filter((e) => {
        return isNaN(e);
    });
    const onlyNumbers = input.filter((e) => {
        return !isNaN(e);
    });
    1;

    rl.prompt();

    rl.on('line', (line) => {
        switch (line.trim()) {
            case '1':
                const resultOne = onlyWords.sort();
                console.log('Words by name(from A to Z)');
                console.log(resultOne);
                break;
            case '2':
                const resultTwo = onlyNumbers.sort((a, b) => a - b);
                console.log('Show digits from the smallest');
                console.log(resultTwo);
                break;
            case '3':
                const resultThree = onlyNumbers.sort((a, b) => b - a);
                console.log('Show digits from the biggest.');
                console.log(resultThree);
                break;
            case '4':
                const resultFour = onlyWords.sort((a, b) => a.length - b.length);
                console.log('Words by quantity of letters');
                console.log(resultFour);
                break;
            case '5':
                let resultFive = [...new Set(onlyWords)];
                console.log('Only unique words');
                console.log(resultFive);
                break;
            case 'exit':
                console.log('Good bye! Have a nice day!');
                process.exit(0);
            default:
                console.log('Please enter ONLY numbers from 1 to 5!');
                break;
        }
        rl.prompt();
    }).on('close', () => {
        console.log('Good bye! Have a nice day!');
    });
});
