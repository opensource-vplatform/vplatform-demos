var v3Configs = require('./v3/webpack.v3.config');
var extensions = require('./webpack.ext.config');
var merge = require('webpack-merge');
module.exports = merge(v3Configs,extensions);