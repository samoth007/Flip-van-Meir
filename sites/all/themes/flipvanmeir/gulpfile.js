var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    less        = require('gulp-less'),
    prefix      = require('gulp-autoprefixer'),
    shell       = require('gulp-shell');

/**
 * Launch the Server
 */
 gulp.task('browser-sync', ['less'], function() {
 browserSync.init({
   // Change as required
   proxy: "www.flipvanmeir.be.dev",
   socket: {
       // For local development only use the default Browsersync local URL.
       //domain: 'localhost:3000'
       // For external development (e.g on a mobile or tablet) use an external URL.
       // You will need to update this to whatever BS tells you is the external URL when you run Gulp.
       domain: 'www.flipvanmeir.be.dev:3000'
   }
 });
});

/**
 * @task sass
 * Compile files from scss
 */
gulp.task('less', function () {
  return gulp.src('less/style.less')
  .pipe(less())
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({stream:true}))
});

/**
 * @task clearcache
 * Clear all caches
 */
gulp.task('clearcache', function() {
  return shell.task([
 'drush cc all'
  ]);
});

/**
 * @task reload
 * Refresh the page after clearing cache
 */
gulp.task('reload', ['clearcache'], function () {
  browserSync.reload();
});

/**
 * @task watch
 * Watch scss files for changes & recompile
 * Clear cache when Drupal related files are changed
 */
gulp.task('watch', function () {
  gulp.watch(['less/*.less', 'less/**/*.less'], ['less']);
  gulp.watch('**/*.{php,inc,info}',['reload']);
});

/**
 * Default task, running just `gulp` will 
 * compile Sass files, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);