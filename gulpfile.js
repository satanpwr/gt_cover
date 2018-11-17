var gulp        = require('gulp');
var minifyCss   = require('gulp-minify-css');
var sass        = require('gulp-sass');
var notify      = require('gulp-notify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var paths = {
  php:['./*.php'],
  css:['./scss/*.scss'],
  script:['./*.js']
};

// ////////////////////////////////////////////////
// CSS 
// ///////////////////////////////////////////////
gulp.task('mincss', function(){
  return gulp.src(paths.css)
    .pipe(sass().on('error', sass.logError))
    // .pipe(minifyCss())
    .pipe(gulp.dest('css/main'))
    .pipe(reload({stream:true}));
});
// ////////////////////////////////////////////////
// HTML 
// ///////////////////////////////////////////////
gulp.task('php', function(){
  gulp.src(paths.php)
  .pipe(reload({stream:true}));
});
// /////////////////////////////////////////////////
// JS
// ////////////////////////////////////////////////
gulp.task('scripts', function(){
  return gulp.src(paths.script)
    .pipe(reload({stream:true}));
});
// ////////////////////////////////////////////////
// Browser-Sync
// // /////////////////////////////////////////////
gulp.task('browserSync', function() {
  browserSync({
    proxy:'uce.dev',
    port: 8080,
    open: true,
    notify: false
  });
});


// ////////////////////////////////////////////////
// watcher
// // /////////////////////////////////////////////
gulp.task('watcher',function(){
  gulp.watch(paths.css, ['mincss']);
  gulp.watch(paths.script, ['scripts']);
  gulp.watch(paths.php, ['php']);
});

gulp.task('default', ['watcher', 'browserSync']);