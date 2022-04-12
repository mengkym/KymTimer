const glob = require('glob')
const path = require('path')
const PAGE_PATH = path.resolve(__dirname, '../src/renderer/page')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.entries = function () {
    var entryFiles = glob.sync(PAGE_PATH + '/*/main.js')
    var map = {}
    entryFiles.forEach((filePath) => {
        var entryPath = path.dirname(filePath)
        var filename = entryPath.substring(entryPath.lastIndexOf('\/') + 1)
        map[filename] = filePath
    })
    return map
}

exports.htmlPlugin = function () {
    let entryHtml = glob.sync(PAGE_PATH + '/*/index.ejs')
    let arr = []
    entryHtml.forEach((filePath) => {
        var entryPath = path.dirname(filePath)
        var filename = entryPath.substring(entryPath.lastIndexOf('\/') + 1)
        let conf = {
            template: filePath,
            filename: filename + `/index.html`,
            chunks: ['manifest', 'vendor', filename],
            inject: true,
            nodeModules: path.resolve(__dirname, '../node_modules'),
            templateParameters(compilation, assets, options) {
                return {
                    htmlWebpackPlugin: {
                        files: assets,
                        options: options
                    },
                    process,
                }
            }
        }
        if (process.env.NODE_ENV === 'production') {
            let productionConfig = {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            }
            conf = { ...conf, ...productionConfig }
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}