/*
 * slush-node
 * https://github.com/chrisenytc/slush-node
 *
 * Copyright (c) 2014, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer');

gulp.task('default', function(done) {
    var prompts = [{
        name: 'appName',
        message: 'What the module name?'
    }, {
        name: 'appDescription',
        message: 'What the description?'
    }, {
        name: 'appVersion',
        message: 'What the module version?',
        default: '0.1.0'
    }, {
        name: 'authorName',
        message: 'What the author name?',
    }, {
        name: 'authorEmail',
        message: 'What the author email?',
    }, {
        name: 'userName',
        message: 'What the github username?',
    }, {
        type: 'list',
        name: 'license',
        message: 'Choose your license type',
        choices: ['MIT', 'BSD'],
        default: 'MIT'
    }, {
        type: 'confirm',
        name: 'enableBin',
        message: 'Would you like to enable bin option?',
        default: false
    }];
    //Ask
    inquirer.prompt(prompts,
        function(answers) {
            if (!answers.appName) {
                return done();
            }
            answers.appNameSlug = _.slugify(answers.appName)
            var d = new Date();
            answers.year = d.getFullYear();
            answers.date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
            var files = [__dirname + '/templates/**'];
            if (answers.license === 'MIT') {
                files.push('!' + __dirname + '/templates/LICENSE_BSD');
            } else {
                files.push('!' + __dirname + '/templates/LICENSE_MIT');
            }
            if (!answers.enableBin) {
                files.push('!' + __dirname + '/templates/bin/**/**');
                files.push('!' + __dirname + '/templates/bin');
            }
            gulp.src(files)
                .pipe(template(answers))
                .pipe(rename(function(file) {
                    var appReplace = file.basename.replace(new RegExp('appName', 'g'), answers.appNameSlug);
                    file.basename = appReplace;
                    if (answers.license === 'MIT') {
                        var mit = file.basename.replace('LICENSE_MIT', 'LICENSE');
                        file.basename = mit;
                    } else {
                        var bsd = file.basename.replace('LICENSE_BSD', 'LICENSE');
                        file.basename = bsd;
                    }
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function() {
                    done();
                });
        });
});
