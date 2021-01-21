'use strict';

// Импорт модулей для сборки
const gulp = require('gulp');
const webpack = require('webpack-stream');
const browsersync = require('browser-sync');

// Путь сборки
// const dist = './dist/';
const dist = 'C:/Programming/OpenServer/OpenServer/domains/proj';

// Задача для отслеживания изменений в html-файле
// index.html из src перемещаем в dist и запускаем browsersync, чтобы перезагрузить страницу
gulp.task('copy-html', () => {
    return gulp.src('./src/index.html')
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

// компиляция скриптов с webpack в черновом варианте для разработки
gulp.task('build-js', () => {
    return gulp
        .src('./src/js/main.js')
        .pipe(
            webpack({
                mode: 'development',
                output: {
                    filename: 'script.js',
                },
                watch: false,
                devtool: 'source-map',
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                debug: true,
                                                corejs: 3,
                                                useBuiltIns: 'usage',
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            })
        )
        .pipe(gulp.dest(dist))
        .on('end', browsersync.reload);
});

// берем из src/assets любые файлы в любых папках, если что-то поменяется, то переместим файлы в dist/assets
// и перезагружаем страницу
gulp.task('copy-assets', () => {
    return gulp
        .src('./src/assets/**/*.*')
        .pipe(gulp.dest(dist + '/assets'))
        .on('end', browsersync.reload);
});

// запуск сервера на browsersync, серверит файлы из папки dist
gulp.task('watch', () => {
    browsersync.init({
        server: './dist/',
        port: 4000,
        notify: true,
    });

    // также отслеживаем изменения в отдельных файлах, если что-то в них меняется, то запускаются || соответств. задачи
    gulp.watch('./src/index.html', gulp.parallel('copy-html'));
    gulp.watch('./src/assets/**/*.*', gulp.parallel('copy-assets'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('build-js'));
});

// параллельный запуск всех трех задач, на случай если до запуска gulp были изменения в проекте
gulp.task('build', gulp.parallel('copy-html', 'copy-assets', 'build-js'));

// задача на продакшн, компиляция будет намного дольше выводим проект в свет
gulp.task('build-prod-js', () => {
    return gulp
        .src('./src/js/main.js')
        .pipe(
            webpack({
                mode: 'production',
                output: {
                    filename: 'script.js',
                },
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                corejs: 3,
                                                useBuiltIns: 'usage',
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            })
        )
        .pipe(gulp.dest(dist));
});

// Задача по умолчанию. gulp в терминал. Запускает две задачи
// build - компиляция файлов, на случай если до запуска gulp были изменения
// watch - отслеживание изменений
gulp.task('default', gulp.parallel('watch', 'build'));
