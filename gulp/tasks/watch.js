var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', 
    ['copy:watch',

    'sprite:svg:watch',
    'svgmin:watch',
    'svgo:watch',
    'jade:watch',
    'list-pages:watch',
    'webpack:watch',
    'sass:watch'
]);
