const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `How do you like to sort values?
    1.Words by name(from A to Z).
    2.Show digits from the smallest.
    3.Show digits from the biggest.
    4.Words by quantity of letters.
    5.Only unique words.

    Print 'exit' to end programm.

    Select (1 - 5) and press ENTER:`,
});

rl.question('Hello. Enter words or digits, that you want to sort, dividing them with spaces: ', (userInput) => {
    if (userInput === 'exit') readline.close();
    else {
        let input = userInput.split(/[, ]+/);
        const onlyWords = input.filter(function (e) {
            return isNaN(e);
        });
        const onlyNumbers = input.filter(function (e) {
            return !isNaN(e);
        });

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
                    break;
                default:
                    console.log('Please enter ONLY numbers from 1 to 5!');
                    break;
            }
            rl.prompt();
        }).on('close', () => {
            console.log('Good bye! Have a nice day!');
        });
    }
});
