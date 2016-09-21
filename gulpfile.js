var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest'),
    jshint = require('gulp-jshint');

gulp.task('default',['jshint','test','serve']);

gulp.task('jshint', () => {
    return gulp.src('./*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('fail'));
});

gulp.task('test', function () {
    env({ vars: { ENV: 'Test' } });
    gulp.src('tests/**/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'nyan' }))
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
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('Restarting');
        });
});
