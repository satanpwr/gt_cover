var gulp        = require('gulp');
var minifyCss   = require('gulp-minify-css');
var sass        = require('gulp-sass');
var notify      = require('gulp-notify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sassGlob    = require('gulp-sass-glob');

var paths = {
  php:['./src/*.php'],
  css:['./src/scss/*.scss'],
  script:['./src/*.js']
};
 
// ////////////////////////////////////////////////
// CSS 
// ///////////////////////////////////////////////
// gulp.task('mincss', function(){
//   return gulp.src(paths.css)
//     pipe(sass({
//           outputStyle: 'compressed',
//           includePaths: ['node_modules/susy/sass']
//       }).on('error', sass.logError))
//     // .pipe(minifyCss())
//     .pipe(gulp.dest('css/main'))
//     .pipe(reload({stream:true}));
// });


gulp.task('mincss', function(){
  return gulp.src(paths.css)
    .pipe(sassGlob())
    .pipe(sass({
          // outputStyle: 'compressed',
          includePaths: ['./node_modules/susy/sass']
      }).on('error', sass.logError))
    // .pipe(minifyCss())
    .pipe(gulp.dest('src/css/main'))
    .pipe(reload({stream:true}));
});


// gulp.task('mincss',function(){
//   return gulp.src(paths.css)
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest(''+paths.css+''))
//     .pipe(reload({stream:true}));
// });

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

gulp.task('default', ['watcher', 'browserSync', 'mincss']);