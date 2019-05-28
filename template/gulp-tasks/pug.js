const config = require('../config')
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const log = require('fancy-log')
const changed = require('gulp-changed')
const beautify = require('gulp-jsbeautifier')
const pug = require('pug')

const errorHandler = (err) => {
	log(err)
	this.emit('end')
}


const pugCompile = (dev = false) => {
	return gulp.src('src/pug/*.pug')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(pug({locals: {config: config}}))
		.pipe(beautify({
			indent_with_tabs: <@= indentStyle === 'tab' @>,
			indent_size: <@= indentSize @>
		}))
		.pipe(changed(dev ? 'dev' : 'dist', {
			extension: '.html',
			hasChanged: changed.compareSha1Digest
		}))
		.pipe(gulp.dest(dev ? 'dev' : 'dist'))
}

gulp.task('pug', () => pugCompile())
gulp.task('pug:dev', () => pugCompile(true))
gulp.task('pug:watch', () =>  gulp.watch('src/pug/**/*.pug', gulp.series('pug:dev')))
