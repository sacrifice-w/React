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

# 二、脚手架学习
## 2.1 基本内容的编写
首先是`public/index,html`，因为这部分只负责引入一个用于渲染的节点。所以内容比较简单。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello-React</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```
其次是`src/App.js`，这部分是组件的主要内容,也是组件最后汇总的地方
```js
// 创建“外壳”组件
import React,{Component} from 'react'
// 引用，但是js后缀可以省略
import Hello from './components/Hello/Hello.js'
// 省略型引用
import Welcome from './components/Welcome'

// 创建并暴露App组件
export default class App extends Component{
    render() {
        return (
            <div>
                <Hello />
                <Welcome />
            </div>
        );
    }
}
```
通过引入两个子组件来完成组件的设置。子组件的引用有两种方式，一种是通过直接引用。另一种是如果文件夹中的js/jsx文件命名为index.js，则可以省略。
并通过暴露这个App组件使得能被index.js调用
`src/index.js`主要负责的就是渲染组件到页面上。
```js
// 引入库
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// 渲染
ReactDOM.render(<App />, document.getElementById('root'));

```
子组件以`Hello.js`为例：
```js
import React,{Component} from 'react';
import './Hello.css'
export default class Hello extends Component {
    render() {
        return (
            <h2 className='title'>
                Hello,react!
            </h2>
        );
    }
}
```
## 2.2 样式的模块化
```js
import React,{Component} from 'react';
import hello from'./Hello.module.css'
export default class Hello extends Component {
    render() {
        return (
            <h2 className={hello.title}>
                Hello,react!
            </h2>
        );
    }
}
```
通过给css文件命名为`xxx.module.css`来将样式文件进行模块化。之后就能在js文件中进行import调用了。
在下面的样式引用时，可以通过调用`className={hello.title}`这种类型来进行样式的调用。

## 2.3 vscode中的React插件
`ES7+ React/Redux/React-Native snippets`
提供rcc/rfc/等快捷键
`React Native Tools`
提供ren等快捷键0
`React Style Helper`

比较推荐这三个插件。-.-

## 2.5 组件化编码流程
1. 拆分组件：拆分界面，抽取组件
2. 实现静态组件：使用组件实现静态页面效果
3. 实现动态组件
   1. 动态显示初始化数据
      1. 数据类型
      2. 数据名称
      3. 保存在哪个组件
   2. 交互（从绑定事件监听开始）

## 2.6 React18的一些新特性
`ReactDOM.render`在React18中被废弃了，取而代之的是`createRoot render`
现在需要首先提取出这个节点，在这个节点上使用createRoot方法，之后在将其渲染。
```js
// 渲染
const container = document.getElementById('root');
// Create a root.
const root = ReactDOM.createRoot(container);
// Initial render: Render an element to the root.
root.render(<App />);
```
并且需要注意的是：`import ReactDOM from 'react-dom/client'`引用改成了这种形式。

# 三、react ajax
1. React本身只关注于界面，并不发送ajax请求的代码
2. 前端应用需要通过ajax请求与后台进行交互（json数据）
3. react应用需要集成第三方ajax库或自己封装
4. 不建议使用ajax。建议使用**axios**，可以在浏览器端和node服务器端

## 3.1 ajax
为了使用axios，应该使用yarn或者npm添加axios
`yarn add axios`或者是`npm install axios`
ajax引擎因为有同源策略，所以说不好使用跨域请求。
如果想要给其他端口发送请求，需要开启一个**中间服务器**，比如浏览器端口为3000，需要请求的端口是5000。就可以通过一个开在3000端口的中间服务器，而这个中间服务器是没有ajax引擎的。所以说不存在同源策略。首先浏览器发送请求到中间服务器，中间服务器转交到5000端口的后端服务器。之后再返回到3000的中间服务器。因为两个服务器的端口都是3000，所以不会产生跨域请求，这时候就能把请求传回来咧。这样就完成了一次请求。

第一种方式：
1. 在`package.json`中添加`"proxy":"http://localhost:5000"`，意思就是向5000端口进行代理。但是这种代理是有局限性的
2. `axios.get('http://localhost:3000/students')`在axios端向3000端口发送请求，如果在3000端口没有这个文件，则会向5000端口进行转发
3. 这种方式的局限性就是如果本来的端口就存在这个文件，则会首先请求本身端口的文件，而不是请求服务器端的文件。只有本身没有这个文件，才会向服务器端请求。

说明：
1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）


第二种方式：
在src文件夹中新建`setupProxy.js`,创建代理配置文件

```js
   const proxy = require('http-proxy-middleware')
   
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
```
说明：
1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。