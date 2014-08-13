var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  schemas: ['archetypes/**/*.json']
};

// Build Task
gulp.task('build', function() {
  gulp.src(applicationjsLocations)
    .pipe(gconcat('applications.js'))
    .pipe(ngmin())
    .pipe(rename('applications.min.js'))
    .pipe(gulp.dest('./public/dist'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))
    .pipe(gzip())
    .pipe(gulp.dest('public/dist'));
  gulp.src(connectjsLocations)
    .pipe(gconcat('connect.js'))
    .pipe(ngmin())
    .pipe(rename('connect.min.js'))
    .pipe(gulp.dest('./public/dist'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))
    .pipe(gzip())
    .pipe(gulp.dest('public/dist'));
  gulp.src(dashboardjsLocations)
    .pipe(gconcat('dashboard.js'))
    .pipe(ngmin())
    .pipe(rename('dashboard.min.js'))
    .pipe(gulp.dest('./public/dist'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))
    .pipe(gzip())
    .pipe(gulp.dest('public/dist'));
  gulp.src(homejsLocations)
    .pipe(gconcat('home.js'))
    .pipe(ngmin())
    .pipe(rename('home.min.js'))
    .pipe(gulp.dest('./public/dist'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))
    .pipe(gzip())
    .pipe(gulp.dest('public/dist'));
});



// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images']);