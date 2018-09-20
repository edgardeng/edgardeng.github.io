# 在Vue中的Webpack的使用

> Webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。在处理应用程序时，会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后打包成一个或多个 bundle。

## 升级

### 3.0升级到4.8.1

#### webpack.optimize.CommonsChunkPlugin has been removed, please use splitChunks

  在webpack.prod.conf.js中，去除 new webpack.optimize.CommonsChunkPlugin。并添加：
```
name: 'production'
optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // test: path.resolve(__dirname, "node_modules"),
          chunks: 'initial',
          name: 'vendor'
        },
        'async-vendor': {
          test: /[\\/]node_modules[\\/]/,
          // test: path.resolve(__dirname, "node_modules"),
          chunks: 'async',
          name: 'async-vendor'
        }
      }
    }
  },
```

#### compilation.mainTemplate.applyPluginsWaterfall is not a function

升级 html-webpack-plugin即可

#### Use Chunks.groupsIterable and filter by instanceof Entrypoint instead

升级extract-text-webpack-plugin@


#### Path variable [contenthash] not implemented in this context: static/css/[name].[contenthash].css

在webpack.prod.conf.js 中:
将`new ExtractTextPlugin`中`contenthash`换成`hash`，也可删除不用hash值`[name].css`


#### Cannot find module 'webpack/bin/config-yargs'

webpack与webpack-dev-server版本不兼容,升级至3
npm install webpack-dev-server --save-dev

#### 缺少webpack-cli

npm install webpack-cli -D

#### vue-loader引发的问题

升级至vue-loader，15.4.2
在webpacke.base.conf.js中添加
```
  const vueLoaderPlugin = require('vue-loader/lib/plugin')
  plugins: [
    new vueLoaderPlugin()
  ],
```

