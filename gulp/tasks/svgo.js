var gulp     = require('gulp');
var svgmin   = require('gulp-svgmin');
var changed  = require('gulp-changed');
var plumber  = require('gulp-plumber');
var inject   = require('gulp-inject');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');
var config   = require('../config');


gulp.task('svgo', function() {
    var target = gulp.src(config.src.templates + "/partials/_svg-template.jade");
    var source = gulp.src(config.dest.img + '/svgo/**/*.svg')
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }
    return target
        .pipe(inject(source, { transform: fileContents }))
        .pipe(gulp.dest(config.src.templates + "/partials"));
    // return gulp
    //     .src(config.src.img + '/svgo/**/*.svg')
    //     .pipe(plumber({
    //         errorHandler: config.errorHandler
    //     }))
    //     // .pipe(changed(config.dest.img))
    //     .pipe(svgmin({
    //         js2svg: {
    //             pretty: true
    //         },
    //         plugins: [{
    //             removeDesc: true
    //         },
    //         {
    //             removeComments: false
    //         },
    //         {
    //             moveElemsAttrsToGroup: true
    //         },
    //         {
    //             minifyStyles: true
    //         },
    //         {
    //             collapseGroups: true
    //         },
    //         {
    //             removeDesc: true
    //         },
    //         {
    //             cleanupIDs: true
    //         }, 
    //         {
    //             mergePaths: true
    //         }]
    //     }))
    //     .pipe(svgstore({ inlineSvg: true }));
    //     .pipe(rename({
    //         suffix: '.min'
    //     }))
    //     function fileContents (filePath, file) {
    //         return file.contents.toString();
    //     }
    //     return target
    //         .pipe(inject(source, { transform: fileContents }))
    //         .pipe(gulp.dest(config.src.templates + "/partials"));
    //     // .pipe(gulp.dest(config.dest.img));
});

gulp.task('svgmin', function(){
    return gulp
        .src(config.src.img + '/svgo/**/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDesc: true
            },
            {
                removeComments: true
            },
            {
                moveElemsAttrsToGroup: true
            },
            {
                minifyStyles: true
            },
            {
                collapseGroups: true
            },
            {
                removeDesc: true
            },
            {
                removeUnknownsAndDefaults: true
            },
            {
                removeUselessStrokeAndFill: true
            },
            {
                transformsWithOnePath: true
            },
            {
                removeRasterImages: true
            },
            {
                cleanupIDs: true
            }, 
            {
                mergePaths: true
            }]
        }))
        .pipe(svgstore())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.dest.img + '/svgo'))
})

gulp.task('svgo:watch', function() {
    gulp.watch(config.dest.img + '/svgo/**/*.svg', ['svgo']);
});
gulp.task('svgmin:watch', function() {
    gulp.watch(config.src.img + '/svgo/**/*.svg', ['svgmin']);
})