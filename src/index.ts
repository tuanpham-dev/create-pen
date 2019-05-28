#!/usr/bin/env/ node

// import * as fs from 'fs'
// import * as path from 'path'
// import * as shell from 'shelljs'
import * as yargs from 'yargs'

const argv = yargs.usage('Usage: $0 <pen_name> [options]')
	.wrap(null)
	.example('$0 mypen -h pug -c sass -j typescript', 'create \'mypen\' project with pug as html, sass as css and typescript as javascript')
	.option('h', {
		alias: 'html',
		nargs: 1,
		describe: 'HTML preprocessor',
		choices: ['html', 'pug', 'liquid', 'haml', 'slim'],
		default: 'html',
		global: true
	})
	.option('c', {
		alias: 'css',
		nargs: 1,
		describe: 'CSS preprocessor',
		choices: ['css', 'scss', 'sass', 'postcss'],
		default: 'css',
		global: true
	})
	.option('j', {
		alias: 'js',
		nargs: 1,
		describe: 'Javascript preprocessor',
		choices: ['javascript', 'coffeescript', 'typescript'],
		default: 'javascript',
		global: true
	})
	.option('i', {
		alias: 'indent',
		nargs: 1,
		describe: 'Indent type',
		choices: ['tab', 'space'],
		default: 'tab',
		global: true
	})
	.option('s', {
		alias: 'indent-size',
		nargs: 1,
		describe: 'Indent size',
		choices: ['4', '2'],
		default: '4',
		global: true
	})
	.argv

//
console.log(argv)
