# vue-ele-demo

> my test for vue

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
``` 

## Project Structure

``` bash
├── index.html                      入口页面
    ├── build                           构建脚本目录
    │   ├── build-server.js                 运行本地构建服务器，可以访问构建后的页面
    │   ├── build.js                        生产环境构建脚本
    │   ├── dev-client.js                   开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
    │   ├── dev-server.js                   运行本地开发服务器
    │   ├── utils.js                        构建相关工具方法
    │   ├── webpack.base.conf.js            wabpack基础配置
    │   ├── webpack.dev.conf.js             wabpack开发环境配置
    │   └── webpack.prod.conf.js            wabpack生产环境配置
    ├── config                          项目配置
    │   ├── dev.env.js                      开发环境变量
    │   ├── index.js                        项目配置文件
    │   └──  prod.env.js                    生产环境变量
    ├── mock                            mock数据目录
    │   └── data.json                       mock模拟测试数据
    ├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
    ├── .eslintrc.js                    eslint校验规则，可自定义
    ├── .eslintignore                   定义不需要进行eslint校验的js文件
    ├── src                             项目源码目录
    │   ├── main.js                         入口js文件
    │   ├── app.vue                         根组件
    │   ├── commmon                         公用资源目录
    │   │   └── fonts                          字体
    │   │   └── js                             js
    │   │   └── stylus                         stylus样式
    │   ├── components                      公共组件目录
    │   │   └── border.vue                    间隔线组件
    │   │   └── cartcontrol.vue               购物动作组件
    │   │   └── goods.vue                     商品组件
    │   │   └── header.vue                    页面header组件
    │   │   └── ratings.vue                   评论组件
    │   │   └── seller.vue                    商家组件
    │   │   └── shopcart.vue                  购物车组件
    │   │   └── spanicon.vue                  活动图标组件
    │   │   └── star.vue                      星星评级组件
    │   │   └── price.vue                     新旧价格组件
    └── static                          纯静态资源，不会被wabpack构建。
```

