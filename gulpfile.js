var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),    
    supertest = require('supertest'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('default', ['test', 'serve']);

gulp.task('lint', () => {
    return gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['lint'], function () {    
    gulp.src('tests/**/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'spec' }))
        .once('end', function () {
            process.exit();
        });
});

gulp.task('serve', function () {
    require('./server.js');
});

gulp.task('servedev', function () {
    nodemon({
        script: 'server.js',
        ext: 'js',        
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('Restarting');
        });
});
