# 一、简介
1. 发送请求获取数据
2. 处理数据（过滤、整理格式等）
3. **操作DOM呈现页面**（这一步是react的主要目的）

所以说react是一个将数据渲染为HTML视图的开源js库

原生js特点：
1. 原生js操作dom繁琐，效率低
2. 使用js直接操作dom，浏览器会进行大量的重绘重排
3. 原生js没有**组件化**编码方案，代码复用率低

react特点：
1. 采用**组件化**模式，**声明式**编码，提高开发效率及组件复用率
2. 在React Native中可以使用React语法进行移动端开发
3. 使用**虚拟dom**和优秀的**diffing算法**，尽量减少与真实dom的交互

中文官网：`https://react.docschina.org`

# 二、入门
## 2.1 引入react
```js
// jsx组件库，用于将jsx转为js
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
// react核心库
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
// react扩展库，用于支持react操作dom
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
```

## 2.2 虚拟DOM和真实DOM
创建一个虚拟DOM：
```js
const VDOM = (
    <h1 id='title'>
        <span>Hello,react</span>
    </h1>
)   
```
1. **虚拟DOM的本质是Object类型的对象（一般对象）**
2. 虚拟DOM比较轻，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性
3. 虚拟DOM最终会被转换为真实DOM并渲染在页面上

## 2.3 jsx语法
全称：JavaScriptXML
XML早期用于存储和传输数据

1. 定义虚拟DOM时，不要写引号
2. 标签混入js**表达式**时要用{}
3. 样式的类名指定不要用class，要用className
4. 内联样式，要用`style={{key:value}}`的形式去写
5. 只能有一个根标签
6. 标签必须闭合
7. 标签首字母
   1. 若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错
   2. 若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错
8. 对于jsx中的每个元素，都需要产生一个**唯一对应**的key

```js
        const data = ['Angular','React','Vue']
        // 1.创建虚拟DOM
        const vDom = (
            <div>
                <h1>前端js框架列表</h1>
                <ul>
                    {
                        data.map((item,index)=>{
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
        // 2.渲染页面
        ReactDOM.render(vDom,document.getElementById('test'))
```

要注意区分js语句和js表达式
1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
   1. a
   2. a+b
   3. demo(1)
   4. arr.map()
   5. function test()
2. 语句：控制代码语句，不会产生值
   1. if(){}
   2. for(){}
   3. switch(){case:}

## 2.4 组件与模块
### 2.4.1 模块
1. 模块就是向外提供特定功能的js程序，一般就是一个js文件
2. 为什么要拆成模块：随着业务逻辑的增加，代码越来越多且复杂
3. 作用：复用js，简化js的编写，提高js的运行效率
4. 当应用的js都以模块化来编写的，这个应用就是一个模块化的应用

### 2.4.2 组件
1. 用来实现局部功能效果的代码和资源的集合（html/css/js/image等等）
2. 通过组件化，可以复用编码，简化项目编码，提高运行效率

# 三、React面向组件编程
## 3.1 函数式组件
```js
        function Demo() {
            console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
            return <h2>Hello,React</h2>
        }
        // 渲染组件到页面
        ReactDOM.render(<Demo/>, document.getElementById('test')) //这里的原理就是通过大写字母开头的标签去调用组件，之后在通过/来结束这个标签
```

## 3.2 类式组件
