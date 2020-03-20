'use strict';

const gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    include = require('gulp-include'),
    //cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    ngrok = require('ngrok'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

const path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: './src/**/*.html',
        js: './src/js/**/*.js',
        style: './src/style/**/*.scss',
        img: './src/img/**/*.*',
        fonts: './src/fonts/**/*.*'
    },
    clean: './build'
};

// BrowserSync Reload
function browserSyncReload(done) {
    browserSync.reload();
    done();
}

// BrowserSync
function webserver(done) {
    browserSync({
        server: "./build"
    }, function (err, bs) {
        ngrok.connect(bs.options.get('port'), function (err, url) {
            // https://757c1652.ngrok.com -> 127.0.0.1:8080
        });
    });
    done();
}

function clean(done) {
    rimraf(path.clean, done);
}

function html() {
    return gulp
        .src(path.src.html)
        .pipe(include())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
}

function js() {
    return gulp
        .src(path.src.js)
        .pipe(include())
        .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
}

function css() {
    return gulp
        .src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .on('error', function (err) {
            console.log(err.toString());

            this.emit('end');
        })
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
}

function images() {
    return gulp
        .src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
}

function fonts() {
    return gulp
        .src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
}

// Watch files
function watchFiles() {
    gulp.watch(path.watch.style, css);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.html, gulp.series(html, browserSyncReload));
    gulp.watch(path.watch.img, images);
}

const buildTask = gulp.series(clean, gulp.parallel(html, css, images, js, fonts));
const defaultTask = gulp.series(webserver, watchFiles);

exports.IMG = images;
exports.CSS = css;
exports.JS = js;
exports.CLEAN = clean;
exports.WATCH = watchFiles;
exports.BUILD = buildTask;
exports.DEFAULT = defaultTask;
