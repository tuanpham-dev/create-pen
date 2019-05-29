const gulp = require('gulp')
const del = require('del')

require('./gulp-tasks/assets')<@ if (html === 'pug') { @>
require('./gulp-tasks/pug')<@ } else { @>
require('./gulp-tasks/liquid')<@ } @><@ if (css === 'scss' || css === 'sass') { @>
require('./gulp-tasks/sass')<@ } else if (css === 'postcss') { @>
require('./gulp-tasks/postcss')<@ } @><@ if (js === 'coffee') { @>
require('./gulp-tasks/coffee')<@ } else if (js === 'typescript') { @>
require('./gulp-tasks/typescript')<@ } @>
require('./gulp-tasks/server')

gulp.task('clean', () => {
	return del('dist/**/*.*')
})

gulp.task('build', gulp.series('clean', gulp.parallel('assets'<@ if (preprocessors.length) { @><@- ', ' + preprocessors.map((p) => `'${p}'`).join(', ') @><@ } @>)))
<@ if (preprocessors.length) { @>
gulp.task('dev', gulp.series(
	gulp.parallel(<@- preprocessors.map((p) => `'${p}:dev'`).join(', ') @>),
	gulp.parallel(<@- preprocessors.map((p) => `'${p}:watch'`).join(', ') @>, 'server:init')
))
<@ } else { @>
gulp.task('dev', gulp.series('server:init'))
<@ } @>
gulp.task('default', gulp.series('dev'))
