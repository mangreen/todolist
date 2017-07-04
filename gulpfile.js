var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload');

livereload.listen();

/**
 * livereload refresh
 */
gulp.task( 'refresh', function(){
    // console.log( '\nlivereload > refresh\n' );
    setTimeout(function(){
      livereload.changed('');
    }, 500);
})


gulp.task('html', function() {
    gulp.src('views/**/*.html')
        .pipe(watch())
        .pipe(livereload());
});

gulp.task('develop', function() {

    // not a good way but gulp-nodemon sucks xD
    var nodemon = require('nodemon');
    nodemon({
        script: 'develop.js',
        ext: 'js json jsx'
    });

    nodemon.on('start', function() {
        console.log('App has started');
    }).on('quit', function() {
        console.log('App has quit');
    }).on('restart', function(files) {
        console.log('App restarted due to: ', files);
    });

});

gulp.task('default', ['develop', 'html']);