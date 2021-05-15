/**
 * Created by ali on 16-12-6.
 */

var gulp = require('gulp');
var liverload = require('gulp-livereload');
var less = require('gulp-less');
var browserSync = require('browser-sync');

// var minifycss = require('gulp-minify-css'),//css压缩
//     jshint = require('gulp-jshint'),//js检测
//     uglify = require('gulp-uglify'),//js压缩
//     concat = require('gulp-concat'),//文件合并
//     rename = require('gulp-rename'),//文件更名
//     notify = require('gulp-notify');//提示信息
gulp.task('less',function(){
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('public/css/'));
    //gulp.run('combineCss');
});

//gulp.task('combineCss', function(){
//    gulp.src('tempCss/*.css')
//        .pipe(concat('shopcart.css'))
//        .pipe(gulp.dest('css'))
//        .pipe(rename({ suffix: '.min' }))
//        .pipe(minifycss())
//        .pipe(gulp.dest('css'));
//        //.pipe(notify({ message: 'css task ok' }));
//});
gulp.task('serve', function(){
    browserSync.init({
        server: "./"
    });
    gulp.watch('less/*.less', ['less']);
    gulp.watch(['*.html', 'public/js/*.js', 'public/css/*.css']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);


