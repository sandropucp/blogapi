var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('default', ['test', 'serve']);

gulp.task('lint', () => {
    return gulp.src('./app/**/*.js,./tests/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['lint'], function () {
    //env({ vars: { ENV: 'Test' } });
    gulp.src('tests/**/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'spec' }))
        .once('end', function () {
            process.exit();
        });
});

gulp.task('serve', function () {
    require('./app.js');
});

gulp.task('servedev', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        //env: {PORT: 8000},
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('Restarting');
        });
});
