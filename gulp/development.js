'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    through = require('through'),
    gutil = require('gulp-util'),
    plugins = gulpLoadPlugins(),
    coffee = require('gulp-coffee'),
    less = require('gulp-less'),
    paths = {
        js: ['./*.js', 'config/**/*.js', 'gulp/**/*.js', 'tools/**/*.js', 'assets/**/*.js', '!assets/**/node_modules/**', '!assets/**/lib/**', '!assets/**/js/**'],
        html: ['assets/**/*.html', '!assets/**/node_modules/**', '!assets/**/assets/**/lib/**'],
        css: ['assets/**/*.css', '!assets/**/node_modules/**', '!**/assets/**/lib/**', '!**/assets/css/*.css'],
        less: ['assets/less/*.less', 'assets/**/*.less', '!assets/**/_*.less', '!assets/**/node_modules/**', '!assets/**/lib/**'],
        sass: ['assets/**/*.scss', '!assets/**/node_modules/**', '!**/assets/**/lib/**'],
        coffee: ['assets/**/*.coffee', '!assets/**/node_modules/**', '!**/assets/**/lib/**']
    };

/*var defaultTasks = ['clean', 'jshint', 'less', 'csslint', 'devServe', 'watch'];*/

var defaultTasks = ['coffee', 'clean', 'less', 'sass', 'watch'];

gulp.task('env:development', function () {
    process.env.NODE_ENV = 'development';
});

gulp.task('jshint', function () {
    return gulp.src(paths.js)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        // .pipe(plugins.jshint.reporter('fail')) to avoid shutdown gulp by warnings
        .pipe(count('jshint', 'files lint free'));
});

gulp.task('csslint', function () {
    return gulp.src(paths.css)
        .pipe(plugins.csslint('.csslintrc'))
        .pipe(plugins.csslint.reporter())
        .pipe(count('csslint', 'files lint free'));
});

/*gulp.task('less', function () {
return gulp.src(paths.less)
.pipe(plugins.less())
//.pipe(console.log(plugins.less()))
.pipe(gulp.dest('./assets'));
});*/

gulp.task('less', function () {
    //return gulp.src('assets/less/**/*.less')
    return gulp.src(paths.less)
        .pipe(plugins.less()/*.on('error', plugins.less.logError)*/)
        .pipe(gulp.dest('assets/css'));
});


gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('devServe', ['env:development'], function () {

    plugins.nodemon({
        script: 'server.js',
        ext: 'html js',
        env: {
            'NODE_ENV': 'development'
        },
        ignore: [
            'node_modules/',
            'bower_components/',
            'logs/',
            'assets/lib/',
            'node_modules/',
            '.DS_Store', '**/.DS_Store',
            '.bower-*',
            '**/.bower-*',
            '**/tests'
        ],
        nodeArgs: ['--debug'],
        stdout: false
    }).on('readable', function () {
        this.stdout.on('data', function (chunk) {
            if (/Mean app started/.test(chunk)) {
                setTimeout(function () {
                    plugins.livereload.reload();
                }, 500);
            }
            process.stdout.write(chunk);
        });
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('coffee', function () {
    gulp.src(paths.coffee)
        .pipe(coffee({
            bare: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function () {
    plugins.livereload.listen({
        interval: 500
    });

    //gulp.watch(paths.coffee,['coffee']);
    //gulp.watch(paths.js, ['jshint']);
    //gulp.watch(paths.css, ['csslint']).on('change', plugins.livereload.changed);
    gulp.watch(paths.less, ['less']);
    //gulp.watch(paths.sass, ['sass']);
    gutil.log('starting...');
});

function count(taskName, message) {
    var fileCount = 0;

    function countFiles(file) {
        fileCount++; // jshint ignore:line
    }

    function endStream() {
        gutil.log(gutil.colors.cyan(taskName + ': ') + fileCount + ' ' + message || 'files processed.');
        this.emit('end'); // jshint ignore:line
    }
    return through(countFiles, endStream);
}

gulp.task('development', defaultTasks);