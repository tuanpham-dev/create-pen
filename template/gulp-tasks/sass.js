const gulp = require('gulp')
const plumber = require('gulp-plumber')
const log = require('fancy-log')
const changed = require('gulp-changed')
const beautify = require('gulp-jsbeautifier')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

const errorHandler = (err) => {
	log(err)
	this.emit('end')
}

const sassCompile = (dev = false) => {
	return gulp.src('src/sass/**/*.+(<@ if (css === 'scss') { @>sass|scss<@ } else { @>scss|sass<@ } @>)')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(sass())
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

gulp.task('sass', () => sassCompile())
gulp.task('sass:dev', () => sassCompile(true))
gulp.task('sass:watch', () => gulp.watch('src/sass/**/*.+(sass|scss)', gulp.series('sass:dev')))
