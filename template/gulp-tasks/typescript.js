const config = require('../config')
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const log = require('fancy-log')
const changed = require('gulp-changed')
const beautify = require('gulp-jsbeautifier')
const typescript = require('gulp-typescript')

const errorHandler = (err) => {
	log(err)
	this.emit('end')
}

const typescriptCompile = (dev = false) => {
	return gulp.src('src/typescript/*.ts')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(typescript())
		.pipe(beautify({
			indent_with_tabs: <@= indentStyle === 'tab' @>,
			indent_size: <@= indentSize @>
		}))
		.pipe(changed((dev ? 'dev' : 'dist') + '/js', {
			extension: '.js',
			hasChanged: changed.compareSha1Digest
		}))
		.pipe(gulp.dest((dev ? 'dev' : 'dist') + '/js'))
}

gulp.task('typescript', () => typescriptCompile())
gulp.task('typescript:dev', () => typescriptCompile(true))
gulp.task('typescript:watch', () =>  gulp.watch('src/typescript/**/*.ts', gulp.series('typescript:dev')))
