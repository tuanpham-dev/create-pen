const gulp = require('gulp')
const beautify = require('gulp-jsbeautifier')
const autoprefixer = require('gulp-autoprefixer')
const merge = require('merge-stream')

<@ if (css === 'css' || js === 'js') { @>
gulp.task('assets', () => {
	return merge(
		gulp.src('images/**/*.(svg|png|jpg|jpeg)')
			.pipe(gulp.dest('dist/images'))<@ if (css === 'css') { @>,
		gulp.src('src/css/**/*.css')
			.pipe(autoprefixer('last 2 version'))
			.pipe(beautify({
				indent_with_tabs: <@= indentStyle === 'tab' @>,
				indent_size: <@= indentSize @>
			}))
			.pipe(gulp.dest('dist/css'))<@ } @><@ if (js === 'js') { @>,
		gulp.src('src/js/**/*.js')
			.pipe(beautify({
				indent_with_tabs: <@= indentStyle === 'tab' @>,
				indent_size: <@= indentSize @>
			}))
			.pipe(gulp.dest('dist/js'))<@ } @>

})
<@ } else { @>
gulp.task('assets', () => {
	return gulp.src('images/**/*.(svg|png|jpg|jpeg)')
		.pipe(gulp.dest('dist/images'))
})
<@ } @>
