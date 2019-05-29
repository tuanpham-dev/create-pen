const gulp = require('gulp')
const plumber = require('gulp-plumber')
const log = require('fancy-log')
const changed = require('gulp-changed')
const beautify = require('gulp-jsbeautifier')
const postcss = require('gulp-postcss')
const autoprefixer = require('gulp-autoprefixer')

const errorHandler = (err) => {
	log(err)
	this.emit('end')
}

const postCSSCompile = (dev = false) => {
	return gulp.src('src/postcss/**/*.css')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(postcss())
		.pipe(autoprefixer('last 2 version'))
		.pipe(beautify({
			indent_with_tabs: <@= indentStyle === 'tab' @>,
			indent_size: <@= indentSize @>
		}))
		.pipe(changed((dev ? 'dev' : 'dist') + '/css', {
			extension: '.css',
			hasChanged: changed.compareSha1Digest
		}))
		.pipe(gulp.dest((dev ? 'dev' : 'dist') + '/css'))
}

gulp.task('postcss', () => postCSSCompile())
gulp.task('postcss:dev', () => postCSSCompile(true))
gulp.task('postcss:watch', () => gulp.watch('src/postcss/**/*.css', gulp.series('postcss:dev')))
