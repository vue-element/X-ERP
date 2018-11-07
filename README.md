## 开发
```bash

	# 安装依赖
	npm install
	   
	# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
	npm install --registry=https://registry.npm.taobao.org

	# 启动服务
	npm run dev
```
浏览器访问 http://localhost:9527

## 发布
```bash
	# 构建测试环境
	npm run build:sit

	# 构建生成环境
	npm run build:prod
```

## 其它
```bash
	# --report to build with bundle size analytics
	npm run build:prod --report

	# --preview to start a server in local to preview
	npm run build:prod --preview

	# lint code
	npm run lint
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/#/deploy)

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 图片等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局 filter
│   ├── icons                  // 项目svg icons
│   ├── lang                   // 国际化 lang
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                  // views
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口js 初始化 加载组件等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── .eslintrc.js               // eslint 配置项
├── .postcssrc.js              // postcss 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

MIT
