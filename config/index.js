
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
console.log(path, process);

//判断获取当前域名
function getCurHost(project){
	let curHref = '';
	let curOrigin = path.request.responseURL;
	let curProtocol = 'https';
	if(curOrigin.indexOf('linlile.com.cn') > -1){
		curHref = curProtocol + '//'+project+'.linlile.com.cn';
	}else if(curOrigin.indexOf('linlile.cn') > -1){
		curHref = curProtocol + '//'+project+'.linlile.cn';
	}else if(curOrigin.indexOf('jiefangqu') > -1){
		curHref = curProtocol + '//'+project+'.jiefangqu.com';
	}else{
		curHref = curProtocol + '//'+project+'.linlile.com.cn';
	}
	return curHref;
}

module.exports = {
  build: {
    env: require('./prod.env'),	// 使用 config/prod.env.js 中定义的编译环境
    index: path.resolve(__dirname, '../dist/index.html'),	// 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, '../dist'),	// 编译输出的静态资源路径
    assetsSubDirectory: 'static',	// 编译输出的二级目录
    assetsPublicPath: '/',	// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: false,	// 是否开启 cssSourceMap
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,	// 是否开启 gzip，默认没有compression模块，须安装，否则开启后build报错
    productionGzipExtensions: ['js', 'css'],	// 需要使用 gzip 压缩的文件扩展名
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {	// 需要 proxyTable 代理的接口（可跨域）//修改脚手架的东西后一定要npm run dev，否则不生效！！	
      '/hostname': {
        target: 'https://www.linlile.com.cn/LA',	//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/hostname': ''
          //这里理解成用‘/hostname’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/hostname/user/add’即可
        }
      }
    },
    //如果不用pathRewrite，则要将接口路径中开头的名称，定义到此处，拼接后的接口路径为：target + /common/url.json
    /*proxyTable: {	// 需要 proxyTable 代理的接口（可跨域）//修改脚手架的东西后一定要npm run dev，否则不生效！！	
      '/common': {
        target: 'https://www.linlile.com.cn/LA',	//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
      }
    },*/
   
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
