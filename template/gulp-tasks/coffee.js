const config = require('../config')
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const log = require('fancy-log')
const changed = require('gulp-changed')
const beautify = require('gulp-jsbeautifier')
const coffee = require('gulp-coffee')

const errorHandler = (err) => {
	log(err)
	this.emit('end')
}

const coffeeCompile = (dev = false) => {
	return gulp.src('src/coffee/*.coffee')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(coffee())
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

gulp.task('coffee', () => coffeeCompile())
gulp.task('coffee:dev', () => coffeeCompile(true))
gulp.task('coffee:watch', () =>  gulp.watch('src/coffee/**/*.coffee', gulp.series('coffee:dev')))
