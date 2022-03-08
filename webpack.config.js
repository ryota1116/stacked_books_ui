// https://qiita.com/suzuki0430/items/ebc2ab53a6456b3372ec
const path = require('path');                             // 絶対パスに変換するために
const htmlWebpackPlugin = require('html-webpack-plugin'); // index.htmlをビルドチェインの中で作る

module.exports = {
    entry: './src/index.tsx',  // エントリポイントの指定
    module: {
        rules: [
            {                             // Linterを走らせる
                enforce: 'pre',           // ビルド前処理
                loader: 'tslint-loader',  // tslint-loaderを使う
                test: /\.tsx?$/,          // tslint-loaderに渡すファイルの正規表現。xxx.tsとxxx.tsxの正規表現。
                exclude: [                // 渡さないファイル
                    /node_modules/
                ],
                options: {
                    emitErrors: true      // TSLintが出したwarningをエラーとして扱う（-Wall）
                }
            },
            {
                loader: 'ts-loader',      // ts-loaderを使う。コレがトランスパイルしてくれる。
                test: /\.tsx?$/,
                exclude: [
                    /node_modules/
                ],
                options: {
                    configFile: 'tsconfig.dev.json' // TypeScriptのコンパイル設定ファイル
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]    // importの時に、これらの拡張子を解決する。ex.) Hoge.tsxをimport Hoge from './Hoge'みたいに書ける
    },
    output: {
        filename: 'static/js/bundle.js',        // 出力ファイル名
        path: path.resolve(__dirname, 'dist')   // 出力ファイルを作成するパス(絶対パス)
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "index.html"    // 同じ階層にあるindex.htmlを元に、デプロイ用のindex.htmlを作って出力ディレクトリに配置してくれる
        })
    ]
};
