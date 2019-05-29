const gulp = require('gulp')
const plumber = require('gulp-plumber')
const log = require('fancy-log')
const changed = require('gulp-changed')
const beautify = require('gulp-jsbeautifier')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')<@ if (css === 'sass') { @>
const convert = require('sass-convert')
const merge = require('merge-stream')<@ } @>

const errorHandler = (err) => {
	log(err)
	this.emit('end')
}

const sassCompile = (dev = false) => {
	<@ if (css === 'scss') { @>return gulp.src('src/sass/**/*.+(sass|scss)')
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
		.pipe(gulp.dest((dev ? 'dev' : 'dist') + '/css'))<@ } else if (css === 'sass') { @>return merge(
		gulp.src('src/sass/**/*.sass')
			.pipe(plumber({errorHandler: errorHandler}))
			.pipe(convert({
				from: 'sass',
				to: 'scss'
			}))
			.pipe(beautify({
				indent_with_tabs: <@= indentStyle === 'tab' @>,
				indent_size: <@= indentSize @>
			}))
			.pipe(changed('src/sass', {
				extension: 'scss',
				hasChanged: changed.compareSha1Digest
			}))
			.pipe(gulp.dest('src/sass')),
		gulp.src('src/sass/**/*.sass')
			.pipe(plumber({errorHandler: errorHandler}))
			.pipe(sass())
			.pipe(autoprefixer('last 2 version'))
			.pipe(beautify({
				indent_with_tabs: <@= indentStyle === 'tab' @>,
				indent_size: <@= indentSize @>
			}))
			.pipe(changed('dist/css', {
				extension: '.css',
				hasChanged: changed.compareSha1Digest
			}))
			.pipe(gulp.dest((dev ? 'dev' : 'dist') + '/css'))
	)<@ } @>
}

gulp.task('sass', () => sassCompile())
gulp.task('sass:dev', () => sassCompile(true))
gulp.task('sass:watch', () => gulp.watch('src/sass/**/*.+(sass|scss)', gulp.series('sass:dev')))
