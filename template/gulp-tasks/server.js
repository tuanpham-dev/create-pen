const gulp = require('gulp')
const browserSync = require('browser-sync').create()

gulp.task('server:init', () => {
	return browserSync.init({
		ui: false,
		server: {
			baseDir: './dev',
			directory: true,
			routes: {
				'/images': 'image'<@ if (css === 'css') { @>,
				'/css': '/src/css'<@ } @><@ if (js === 'js') { @>,
				'/js': '/src/js'<@ } @>
			}
		},
		reloadDelay: 1000,
		files: ['dev/**/*.(html|css|js)', 'image/**/*.(svg|png|jpg|jpeg)'],
		browser: 'chrome',
		ghostMode: false,
		open: 'external'
	})
})
