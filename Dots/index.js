import inquirer from 'inquirer'

inquirer
	.prompt({
		type: 'input',
		name: 'name',
		message: 'Please enter sequence of letters: ',
	})
	.then((answer) => {
		const recursion = (str) => {
			let result = [str[0]]
			for (let i = 1; i < str.length; i++) {
				const slice = result.slice()
				const copy = slice.map((value) => value + '.')
				result = [...result, ...copy]
				result = result.map((value) => value + str[i])
			}
			return result
		}
		console.log(recursion(answer.name))
	})
