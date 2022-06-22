import * as fs from 'fs'
import inquirer from 'inquirer'
import { google } from 'googleapis'
import path, { resolve } from 'path'
import prettylink, { TinyURL } from 'prettylink'
const credentials = fs.readFileSync('./googleCred.json', 'utf-8')
const credResult = JSON.parse(credentials)
const CLIENT_ID = credResult.web.client_id
const CLIENT_SECRET = credResult.web.client_secret
const REFRESH_TOKEN = credResult.web.refresh_token
const REDIRECT_URL = credResult.web.redirect_uris

const oauth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URL
)
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
const drive = google.drive({
	version: 'v3',
	auth: oauth2Client,
})

const firstQuestion = () => {
	inquirer
		.prompt({
			type: 'input',
			name: 'Name',
			message:
				'Drag and drop your image to terminal and press ENTER for upload:',
		})
		.then((answer) => {
			const res = JSON.parse(JSON.stringify(answer))
			console.log(
				`Path to file: ${res.Name} \nFile name: ${path.basename(
					res.Name
				)} \nFile extention: ${path.extname(res.Name)}`
			)
			answer.Name !== '' ? secondQuiestion(answer) : process.exit()
		})
}
const changePath = (input) => {
	let pathToChange = JSON.parse(JSON.stringify(input))
	inquirer
		.prompt({
			type: 'input',
			name: 'newName',
			message: 'Please enter new file name without extension: ',
		})
		.then((answer) => {
			let oldPath = pathToChange.Name
			let Name = `./${answer.newName}.jpg`
			fs.rename(oldPath, Name, () => {
				console.log('File Name changed!')
			})
			Name = { Name }
			fileUpload(Name)
		})
}

const secondQuiestion = (inputPath) => {
	inquirer
		.prompt({
			type: 'confirm',
			name: 'confirmShort',
			message: 'Do you like to change name of the file? (y/n)',
		})
		.then((answer) => {
			answer.confirmShort !== false
				? changePath(inputPath)
				: fileUpload(inputPath)
		})
}

async function fileUpload(filePath) {
	const response = await drive.files.create({
		requestBody: {
			name: path.parse(filePath.Name).name,
			mimeType: 'image/jpg',
		},
		media: {
			mimeType: 'image/jpg',
			body: fs.createReadStream(filePath.Name),
		},
	})
	console.log('File is uploaded!')
	const resData = response.data
	async function generateUrl() {
		try {
			const fileId = resData.id
			await drive.permissions.create({
				fileId: fileId,
				requestBody: {
					role: 'reader',
					type: 'anyone',
				},
			})
			const result = await drive.files.get({
				fileId: fileId,
				fields: 'webViewLink, webContentLink',
			})
			const longUrl = result.data.webViewLink
			const tinyurl = new prettylink.TinyURL()
			const shortUrl = async () => {
				const short = await tinyurl.short(longUrl)
				console.log(short)
			}
			inquirer
				.prompt({
					type: 'confirm',
					name: 'shortUrl',
					message: 'Would you like to shorten your link? (y/n):',
				})
				.then((answer) => {
					answer.shortUrl !== true
						? console.log(longUrl)
						: console.log(shortUrl())
				})
		} catch (error) {
			console.log(error.message)
		}
	}
	generateUrl()
}

firstQuestion()
