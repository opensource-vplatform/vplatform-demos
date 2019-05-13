var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var postCssUrl = require("postcss-url");
/**
 * 分析依赖资源
*/
function analyRefResources(){
  var dirPath = path.resolve(__dirname,"../../node_modules");
  let fileNames = fs.readdirSync(dirPath);
  var refInfos = [];
  var refInfoMaps = {};
  if (fileNames && fileNames.length > 0) {
    for (let j = 0, len = fileNames.length; j < len; j++) {
      let absPath = dirPath + "/" + fileNames[j] + "/.v3devrc";
      if (fs.existsSync(absPath)) {
        var v3devrcFile = fs.readFileSync(absPath);
        if(v3devrcFile){
          v3devrcFile = JSON.parse(v3devrcFile.toString());
          var symbolicName = v3devrcFile.symbolicName;
          var refInfo = {
            symbolicName : symbolicName,
            dependencies : v3devrcFile.dependencies,
            libs : v3devrcFile.libs,
            parent : []
          };
          refInfoMaps[symbolicName] = refInfo;
        }
      }
    }
  }
  for(var symbolicName in refInfoMaps){
    var refInfo = refInfoMaps[symbolicName];
    var dependencies = refInfo.dependencies;
    var symbolicName = refInfo.symbolicName;
    if(dependencies && dependencies.length > 0){
      for(var i = 0,len = dependencies.length;i<len;i++){
        var depen = dependencies[i];
        if(refInfoMaps[depen]){
          refInfo.parent.push(refInfoMaps[depen]);
        }
      }
    }
    refInfos.push(refInfo);
  }
  var _resources = {
    styles:[],
    scripts:[],
    other:[]
  };
  var addedNames = [];
  var addPath = function(refInfo){
    if(refInfo.parent.length > 0){
      for(var i = 0,l = refInfo.parent.length;i<l;i++){
        var parentInfo = refInfo.parent[i];
        addPath(parentInfo);
      }
    }
    if(addedNames.indexOf(refInfo.symbolicName)==-1){
      var libs = refInfo.libs;
      if(libs && libs.length > 0){
        for(var j = 0,l = libs.length;j<l;j++){
          var suffix = libs[j].substring(libs[j].lastIndexOf("."));
          if(suffix === ".css" || suffix === ".less"){
            _resources.styles.push(libs[j]);
          }else if(suffix === ".js"){
            _resources.scripts.push(libs[j]);
          }else{
            _resources.other.push(libs[j]);
          }
        }
      }
      addedNames.push(refInfo.symbolicName);
    }
  }
  for(var i = 0,len = refInfos.length;i<len;i++){
    var refInfo = refInfos[i];
    addPath(refInfo);
  }
  return _resources;
}
module.exports = {
  entry: {
    "widget/v3dropdown":'./index.js'
  },
  output: {
    path: path.resolve(__dirname,'../../', './dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    "vue": "Vue",
    "jQuery": "jQuery"
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@vPlatform': path.resolve(__dirname,'../../', './node_modules/v3-pack-cli/src/vendor/vplatform')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "vue-style-loader",
        use: [
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')(),
                postCssUrl({
                  url: function (asset) {
                    var res = asset.url;
                    if (res) {
                      res = res.trim();
                      var prefix = res.indexOf("?") != -1 ? '&' : '?';
                      res = res + prefix + "cssRes=true";
                    }
                    return res;
                  }
                })
              ]
            }
          }
        ]
      })
    }, {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'vue-style-loader'
          }),
          less: ExtractTextPlugin.extract({
            use: 'css-loader!less-loader',
            fallback: 'vue-style-loader'
          })
        },
        postLoaders: {
          html: 'babel-loader'
        },
        postcss: {
          plugins: [
            require('autoprefixer')(),
            postCssUrl({
              url: function (asset) {
                var res = asset.url;
                if (res) {
                  res = res.trim();
                  var prefix = res.indexOf("?") != -1 ? '&' : '?';
                  res = res + prefix + "cssRes=true";
                }
                return res;
              }
            })
          ]
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.ejs$/,
      loader: 'ejs-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf)(\?\S*)?$/,
      loader: 'v3-file-loader',
      options: {
        name: '[sha512:hash:base64:7].[ext]',
        publicPath: function (url) {
          var queryStr = this.resourceQuery;
          if (queryStr && this.resourceQuery.indexOf("cssRes=true") != -1) {
            var array = url.split("/");
            return "./" + array.pop();
          } else {
            return url;
          }
        }
      }
    }]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '../../', './node_modules/v3-pack-cli/src/vendor/vplatform/assets'),
      to: path.join(__dirname, '../../','dist/vendor/vplatform/assets')
    }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
	    title: 'v3dropdown测试页面',
      resources: analyRefResources(),
      template: path.join(__dirname, '../../', '/examples/index.html')
    }),
    new ExtractTextPlugin({
      filename: "[name].css"
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    open:true,
    inline:true,
    host:"localhost",
    port:9090,
    contentBase:"./dist/"
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};
if (process.env.NODE_ENV === 'production') {
  //module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}