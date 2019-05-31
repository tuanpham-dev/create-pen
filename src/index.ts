#!/usr/bin/env node

import * as path from 'path'
import * as yargs from 'yargs'
import chalk from 'chalk'
import {TemplateData} from './utils/template'
import {createFile, createProject, postProcess} from './utils/creator'
import {slugify} from './utils/string'

const argv = yargs.usage('Usage: $0 <pen_name> [options]')
	.wrap(null)
	.example('$0 mypen -h pug -c scss -j typescript', 'create \'mypen\' project with pug as html, scss as css and typescript as javascript')
	.option('html', {
		alias: 'h',
		nargs: 1,
		describe: 'HTML preprocessor',
		choices: ['html', 'pug', 'liquid'],
		default: 'html',
		global: true
	})
	.option('css', {
		alias: 'c',
		nargs: 1,
		describe: 'CSS preprocessor',
		choices: ['css', 'scss', 'sass', 'postcss'],
		default: 'css',
		global: true
	})
	.option('js', {
		alias: 'j',
		nargs: 1,
		describe: 'Javascript preprocessor',
		choices: ['javascript', 'coffee', 'typescript'],
		default: 'javascript',
		global: true
	})
	.option('indent', {
		alias: 'i',
		nargs: 1,
		describe: 'Indent style',
		choices: ['tab', 'space'],
		default: 'tab',
		global: true
	})
	.option('indent-size', {
		alias: 's',
		nargs: 1,
		describe: 'Indent size',
		default: 4,
		global: true
	})
	.argv

if (argv._.length === 0) {
	console.log(chalk.red('Please provide project name!'))
	process.exit()
}

const projectName = argv._[0]
const projectSlug = slugify(projectName)
const projectDir = path.join(process.cwd(), projectSlug)
const html = argv.html
const css = argv.css
const js = argv.js
const indentStyle = argv.indent
const indentSize = <string> argv.indentSize
let preprocessors = []

if (html === 'pug' || html === 'liquid' || html === 'html') {
	preprocessors.push(html === 'html' ? 'liquid' : html)
}

if (css === 'scss' || css === 'sass' || css === 'postcss') {
	preprocessors.push(css === 'scss' ? 'sass' : css)
}

if (js === 'coffee' || js === 'typescript') {
	preprocessors.push(js)
}

const templateData: TemplateData = {
	projectName,
	projectSlug,
	html,
	css,
	js,
	indentStyle,
	indentSize,
	preprocessors
}

console.log(`Creating project ${projectName}...`)

if (!createProject(projectDir)) {
	process.exit()
}

console.log('Creating files...')

createFile(path.join(__dirname, 'template/.editorconfig'), path.join(projectDir, '.editorconfig'), templateData)
createFile(path.join(__dirname, 'template/.gitignore'), path.join(projectDir, '.gitignore'), templateData)
createFile(path.join(__dirname, 'template/gulpfile.js'), path.join(projectDir, 'gulpfile.js'), templateData)
createFile(path.join(__dirname, 'template/package.json'), path.join(projectDir, 'package.json'), templateData)
createFile(path.join(__dirname, 'template/gulp-tasks/assets.js'), path.join(projectDir, 'gulp-tasks/assets.js'), templateData)
createFile(path.join(__dirname, 'template/gulp-tasks/server.js'), path.join(projectDir, 'gulp-tasks/server.js'), templateData)
createFile(path.join(__dirname, 'template/images/favicon.png'), path.join(projectDir, 'images/favicon.png'))
createFile(path.join(__dirname, 'template/src/config.json'), path.join(projectDir, 'src/config.json'), templateData)

switch (html) {
	case 'pug':
		createFile(path.join(__dirname, 'template/gulp-tasks/pug.js'), path.join(projectDir, 'gulp-tasks/pug.js'), templateData)
		createFile(path.join(__dirname, 'template/src/pug/index.pug'), path.join(projectDir, 'src/pug/index.pug'), templateData)
		createFile(path.join(__dirname, 'template/src/pug/inc/template.pug'), path.join(projectDir, 'src/pug/inc/template.pug'), templateData)
		break
	default:
		createFile(path.join(__dirname, 'template/gulp-tasks/liquid.js'), path.join(projectDir, 'gulp-tasks/liquid.js'), templateData)
		createFile(path.join(__dirname, 'template/src/liquid/index.liquid'), path.join(projectDir, 'src/liquid/index.liquid'), templateData)
		createFile(path.join(__dirname, 'template/src/liquid/inc/template.liquid'), path.join(projectDir, 'src/liquid/inc/template.liquid'), templateData)
		break
}

switch (css) {
	case 'scss':
		createFile(path.join(__dirname, 'template/gulp-tasks/sass.js'), path.join(projectDir, 'gulp-tasks/sass.js'), templateData)
		createFile(false, path.join(projectDir, 'src/sass/style.scss'))
		break
	case 'sass':
		createFile(path.join(__dirname, 'template/gulp-tasks/sass.js'), path.join(projectDir, 'gulp-tasks/sass.js'), templateData)
		createFile(false, path.join(projectDir, 'src/sass/style.sass'))
		break
	case 'postcss':
		createFile(path.join(__dirname, 'template/gulp-tasks/postcss.js'), path.join(projectDir, 'gulp-tasks/postcss.js'), templateData)
		createFile(false, path.join(projectDir, 'src/postcss/style.css'))
		break
	default:
		createFile(false, path.join(projectDir, 'src/css/style.css'))
}

switch (js) {
	case 'coffee':
		createFile(path.join(__dirname, 'template/gulp-tasks/coffee.js'), path.join(projectDir, 'gulp-tasks/coffee.js'), templateData)
		createFile(false, path.join(projectDir, 'src/coffee/script.coffee'))
		break
	case 'typescript':
		createFile(path.join(__dirname, 'template/gulp-tasks/typescript.js'), path.join(projectDir, 'gulp-tasks/typescript.js'), templateData)
		createFile(false, path.join(projectDir, 'src/typescript/script.ts'))
		break
	default:
		createFile(false, path.join(projectDir, 'src/js/script.js'))
}

console.log('Installing package...')

if (!postProcess(projectDir)) {
	process.exit()
}

console.log('');
console.log(chalk.green('Done.'));
console.log(chalk.green(`Go into the project: cd ${projectSlug}`));
