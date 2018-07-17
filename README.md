# ssr-demo

> 推荐使用[pnpm](https://pnpm.js.org/)安装依赖

# FEATURES

- 支持vue应用standalone模式打包
- 支持vue ssr生产环境打包以及node服务部署
- 支持vue development hmr
- 支持pug, stylus, es6-7
- 支持stylelint, eslint
- 支持http proxy，css3 autoprefixer
- 支持serve static resouce
- 支持首屏critical css提取
- 支持通用头部管理
- 支持store动态注册注销
- 支持api模块化
- 支持webpack打包分析
- 支持happypack多线程打包（仅支持js），加快打包速率
- 支持dllPlugin打包静态vendor包，加快打包速率
- webpack编译时加上参数 --profile --json > stat.json 后，可以上传到[webpack-chart](https://alexkuz.github.io/webpack-chart/) 、[webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/)、[webpack-analyse](http://webpack.github.io/analyse/)、等分析站点上，看看打包的模块信息
- js支持require路径别名（webpack），css支持从指定路径@import（postcss-import）
- 内置[dayjs](https://github.com/iamkun/dayjs/tree/3c499f3a211f8bbdfe666095a6a4feef3d8ae12c)时间库

# CLI

开发

```shell
npm run dev
```

构建（修改config/index.js中的HOST_PLATFORM与PROJECT_ENV开关然后执行以下命令）

```shell
npm run build
```

分析

```shell
npm run analyze
```

# ROADMAP

- 支持工程级GraphQL
- 错误监控与上传
- 性能监控与数据上传
- 静态资源CDN自动上传
- 支持TypeScript
- 支持PWA
- 支持微信小程序build
- 支持蚂蚁小程序build
- 支持快应用build
- 支持weex build
- 支持vue-class-component

# SSR Tips

- 不要在beforeCreate,created生命周期内使用污染全局（Node）的方法，比如setTimeout,setInterval,setImmediate等，以避免损耗服务资源
- 不要访问或修改Node全局变量比如global,process等，以避免损耗服务资源
- 禁止在beforeCreate,created生命周期内访问window,document等浏览器端对象，以避免ssr crashed
- 使用第三方依赖库（同时包括UI库）时请严格调研是否支持ssr，以避免ssr crashed
- 编写指令存在限制，需要兼容ssr
- 在使用LRU等工具库做缓存策略时，注意过期时间的大小设定以及读到脏数据是否影响业务，另外建议仅当访问流量非常高时做缓存处理以提高服务器吞吐量
