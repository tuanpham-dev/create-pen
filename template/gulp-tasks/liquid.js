const gulp = require('gulp')
const plumber = require('gulp-plumber')
const log = require('fancy-log')
const changed = require('gulp-changed')
const beautify = require('gulp-jsbeautifier')
const liquid = require('@tuanpham-dev/gulp-liquidjs')
const fs = require('fs')

const errorHandler = (err) => {
    log(err)
    this.emit('end')
}

const liquidCompile = (dev = false) => {
    const config = JSON.parse(fs.readFileSync('src/config.json', 'utf8'))

    return gulp.src('src/liquid/*.liquid')
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(liquid({
            engine: {
                root: ['src/liquid', 'src/liquid/inc', 'src/liquid/templates', 'src/liquid/snippets']
            },
            data: {config: config}
        }))
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

gulp.task('liquid', () => liquidCompile())
gulp.task('liquid:dev', () => liquidCompile(true))
gulp.task('liquid:watch', () =>  gulp.watch(['src/liquid/**/*.liquid', 'src/config.json'], gulp.series('liquid:dev')))
