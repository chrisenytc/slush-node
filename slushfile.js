/*
 * slush-node
 * https://github.com/chrisenytc/slush-node
 *
 * Copyright (c) 2015, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}


var defaults = (function() {
    var workingDirName = path.basename(process.cwd()),
        homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE;
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    } else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(homeDir, '.gitconfig');
    user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        appName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    };
})();

gulp.task('default', function(done) {
    var prompts = [{
        name: 'appName',
        message: 'What the module name?',
        default: defaults.appName
    }, {
        name: 'appDescription',
        message: 'What the description?'
    }, {
        name: 'appVersion',
        message: 'What the module version?',
        default: '1.0.0'
    }, {
        name: 'authorName',
        message: 'What the author name?',
        default: defaults.authorName
    }, {
        name: 'authorEmail',
        message: 'What the author email?',
        default: defaults.authorEmail
    }, {
        name: 'userName',
        message: 'What the github username?',
        default: defaults.userName
    }, {
        type: 'list',
        name: 'license',
        message: 'Choose your license type',
        choices: ['MIT', 'BSD', 'UNLICENSED'],
        default: 'UNLICENSED'
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
            answers.appNameSlug = _.slugify(answers.appName);
            answers.appNameOnly = _.capitalize(answers.appNameSlug);
            var d = new Date();
            answers.year = d.getFullYear();
            answers.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
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
