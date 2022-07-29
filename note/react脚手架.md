# 一、使用create-react-app创建react应用
## 1.1 react脚手架
1. 脚手架就是用来帮助快速创建一个基于xxx库的模板项目
   1. 包含所有需要的配置(语法检查，jsx编译，devServer...)
   2. 下载好了所有相关的依赖
   3. 可以直接运行一个简单效果
2. react提供了一个用于创建react项目的脚手架库:create-react-app
3. 项目的整体技术架构为：react+webpack+es6+eslint
4. 使用脚手架开发的项目的特点：模块化，组件化，工程化

## 1.2 配置
比较古老的方式：`npm install -g create-react-app`
但是这种方式可能会出现一些小bug，比如说显示：
```js
mayankthakur@Mayanks-MacBook-Air ~ % npm install -g create-react-app

npm WARN deprecated tar@2.2.2: This version of tar is no longer supported, and will not receive security updates. Please upgrade asap.

changed 67 packages, and audited 68 packages in 1s

4 packages are looking for funding
  run `npm fund` for details

3 high severity vulnerabilities

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
```
但是这不是error，是一个warning。就是告诉你的tar版本太低咧。但是没啥事儿。我试着更新了一下tar的版本，但是好像没啥用。
之后再创建项目`create-react-app react-staging`类似于这样就行了。

或者说，可以使用新的方法：
`npx create-react-app my-app`
**这条命令会临时安装 create-react-app 包，命令完成后create-react-app 会删掉，不会出现在 global 中。下次再执行，还是会重新临时安装。**

之后在安装完成后，进入已经创建好的项目目录，`npm start`启动项目。

## 1.3 内容
1. node_modules存放脚手架所需的依赖
2. public存放静态资源文件。包括favicon.ico的网页图标，index.html为react提供节点。

以下是index.html文件中自带的一些设置
`<link rel="icon" href="%PUBLIC_URL%/favicon.ico"/>`这里的这个路径`%PUBLIC_URL%`表示的是public这个文件夹的路径
`<meta name="theme-color" content="#000000" />`用于配置浏览器页签+地址栏的颜色（仅安卓手机浏览器），兼容性不好，不常用
```html
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
```
上面这个标签为网页提供一个描述，告诉浏览者们网页的用处
`<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />`这个的作用比较奇怪，就是在ios端，当你想要将一个网页放到主屏幕时，会显示这个图片。也就是在主屏幕上显示的，类似于app图标的图片。
可以在网页外面加壳，从而将一个网页变成一个apk文件。`<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />`这个json文件决定了网页加壳时的一些设置。
`<noscript>You need to enable JavaScript to run this app.</noscript>`若浏览器不支持js，则显示标签内的内容
`robots.txt`决定了爬虫的规则，是爬虫规则文件

3. src文件夹中：
   1. app.js和app.css组成了一个app组件。因为在public文件夹里的index.html中有一个`<div id='root'></div>`，这个就是虚拟dom需要渲染的节点，而app组件就是渲染到这个这个节点上的唯一组件。其他组件需要当作app的子组件。
   2. app.test.js用做测试app组件
   3. index.js是入口文件。这里引入了app组件，并在页面上进行渲染。index.css是他的样式文件。
   4. `<React.StrictMode> <App /> </React.StrictMode>`这个的目的是检查App组件，会提醒一些写的不合理的东西
   5. reportWebVital.js是做页面性能检测的
   6. setupTests.js是做组件检测的
4. 主要编写的内容就是public/index.html和src/App.js和src/index.js

