const path = require('path'); // Встроеный модуль NODE, помогает работать с путями
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Плагин WebPack - легко создавайт HTML-файлы для обслуживания ваших пакетов
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Плагин WebPack - экспортирует CSS в отдельный фаил
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Плагин WebPack - минимизирует CSS
const TerserPlugin = require("terser-webpack-plugin");  // Плагин WebPack - минимизирует JS

module.exports = {
    // mode: 'production', // production(все максимально оптимизировано) | development (для разработки)
    entry: './src/index.js', // вдохной фаил нашего приложения (точка входа)(от куда берем)
    output: {  // куда ложим
        filename: 'bundle.js',  // названия файла который должен получится в резульнате работы webpack
        path: path.resolve(__dirname, 'dist') // куда положить фаил resolve( текущая папка, указать ту папку куда нужно сложить)
    },
    module: {  // раздел манипуляций с файлами
        rules: [
            // подгрузчик 1: ( ДЛЯ CSS ) css-loader - подгружает css как модуль | style-loader вставляет стили в index.html
            {
                test: /\.css$/, // расширения файлов на которых будет влиять loader
                use: [MiniCssExtractPlugin.loader, 'css-loader'] // список используемых loader (вебпак будет их считывать с права на лево) | Вариант 1: CSS в отдельном файле
                // use: ['style-loader', 'css-loader'] // список используемых loader (вебпак будет их считывать с права на лево) | Вариант 2: CSS вместе с HTML
            },
            // подгрузчик 2: ( ДЛЯ LESS ) less-loader - компелирует Less | css-loader - подгружает less как модуль | MiniCssExtractPlugin.loader - экспортирует CSS в отдельный фаил
            {
                test: /\.less$/, // расширения файлов на которых будет влиять loader
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']  // список используемых loader (вебпак будет их считывать с права на лево)
            },
            // подгрузчик 3: ( ДЛЯ SCSS ) sass-loader - компелирует Scss | css-loader - подгружает sass как модуль | MiniCssExtractPlugin.loader - экспортирует CSS в отдельный фаил
            {
                test: /\.scss$/, // расширения файлов на которых будет влиять loader
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']  // список используемых loader (вебпак будет их считывать с права на лево)
            },
            // подгрузчик 4: ( ДЛЯ JS ) компелирует ES5 в ES6
            {
                test: /\.m?js$/, // расширения файлов на которых будет влиять loader
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", // список используемых loader (вебпак будет их считывать с права на лево)
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [ // раздел подгружаем плагин
        new HtmlWebpackPlugin({    // создаем экземпляр обьекта
            filename: "index.html",       // имя файла на выходе (попадет в dist)
            template: "./src/index.html"  // путь к входному файлу (шаблону)
        }),
        new MiniCssExtractPlugin({ // создаем экземпляр обьекта
            filename: 'style.css'         // имя файла на выходе (попадет в dist)
        })
    ],
    devServer: {  // Локальный сервер (перезагрузка браузера автоматически)
        // static: {
        //     directory: path.resolve(__dirname, 'src'), // откуда смотреть
        // },
        watchFiles: ['src/**/*'], // откуда смотреть
        port: 9000, // порт на которым открывать
    },
    optimization: { // раздел минимизация файлов
        minimizer: [
            new CssMinimizerPlugin(), // создаем экземпляр обьекта
            new TerserPlugin(), // создаем экземпляр обьекта
        ]
    }

}