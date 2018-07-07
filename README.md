# ssr-demo

> 推荐使用pnpm i安装依赖

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
- 支持happypack多线程打包（仅支持js）
- webpack编译时加上参数 --json > stat.json 后，可以上传到 [webpack-analyse](http://webpack.github.io/analyse/) 、[webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/) 等分析站点上，看看打包的模块信息
- js支持require路径别名（webpack），css支持从指定路径@import（postcss-import）

# ROADMAP

- GraphQL
- 错误统计
- 性能监控与分析
- 静态CDN自动上传
- TypeScript
