const gulp = require('gulp')
const browserSync = require('browser-sync').create()

gulp.task('server:init', () => {
	return browserSync.init({
		ui: false,
		server: {
			baseDir: './dev',
			directory: true,
			routes: {
				'/images': 'images'<@ if (css === 'css') { @>,
				'/css': 'src/css'<@ } @><@ if (js === 'javascript') { @>,
				'/js': 'src/js'<@ } @>
			}
		},
		reloadDelay: 1000,
		files: ['dev/**/*.(html|css|js)', 'image/**/*.(svg|png|jpg|jpeg)'],
		ghostMode: false,
		open: 'external'
	})
})
