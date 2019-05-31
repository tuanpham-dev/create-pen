import * as fs from 'fs'
import * as path from 'path'
import * as shell from 'shelljs'
import chalk from 'chalk'
import * as template from './template'

export function createProject(projectPath: string) {
	if (fs.existsSync(projectPath)) {
		console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`))
		return false
	}

	fs.mkdirSync(projectPath)
	return true
}

export function postProcess(projectPath: string) {
	if (fs.existsSync(path.join(projectPath, 'package.json'))) {
		let cmd = '';

		shell.cd(projectPath)

		if (shell.which('yarn')) {
			cmd = 'yarn'
		} else if (shell.which('npm')) {
			cmd = 'npm install'
		}

		if (cmd) {
			const result = shell.exec(cmd)

			if (result.code !== 0) {
				return false
			}
		} else {
			console.log(chalk.red('No yarn or npm found. Cannot run installation.'))
		}
	}

	return true
}

export function createFile(source: string | false, dest: string, data: template.TemplateData | false = false) {
	const dirname = path.dirname(dest)

	if (!fs.existsSync(dirname)) {
		fs.mkdirSync(dirname, {recursive: true})
	}

	if (source) {
		if (fs.existsSync(source)) {
			let contents = fs.readFileSync(source, data ? 'utf8' : 'binary')

			if (data !== false) {
				contents = template.render(contents, data)

				if (data.indentStyle === 'space') {
					contents = contents.replace(/\t/g, ' '.repeat(Number(data.indentSize)))
				}
			}

			fs.writeFileSync(dest, contents, data ? 'utf8' : 'binary')
		}
	} else {
		fs.writeFileSync(dest, '')
	}
}
