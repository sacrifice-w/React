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
```js
			// 1.创建类式组件,react中的类必须继承于react中内置的父类React.Component
            //render中的this是MyComponent的实例对象 <=> MyComponent组件实例对象
			class MyComponent extends React.Component {
				render() {
                    console.log(this);
					return <h2>Hello,Class</h2>
				}
			}
			// 2.渲染组件到页面
            ReactDOM.render(<MyComponent/>,document.getElementById('test'));
            /*
             * 执行了ReactDOM.render(<MyComponent/>...之后，发生了什么？
             * 1.React解析组件标签，找到了MyComponent组件
             * 2.发现组件是用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法
             * 3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中
             * 
             */
```
很奇怪，这里出现了个奇怪的bug，还没法复现，属于是莫名其妙，找了好久也没找到为啥。。。

## 3.3 组件实例的三大核心
组件实例指的是类式组件，因为函数组件里都没有this，没法玩实例。
### 3.3.1 state
```js
        // 1.创建组件
        class Weather extends React.Component {
            constructor(props) {
                super(props);
                // 2.初始化状态
                this.state =
                {
                    isHot: false,
                    wind: '微风'
                };
            }
            render() {
                // 3.读取状态
                return (
                    // 这里其实是错的，因为changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
                    // 而且类中的方法默认开启了局部的严格模式，所以changeWeather中的this是undefined
                    <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h1>
                );
            }
            changeWeather(){
                    console.log(this);  // undefined
                }
        }
        // 4.渲染
        ReactDOM.render(<Weather />, document.getElementById("test"));
```
state的是以key和value成键值存在的。和python中的字典类似。其主要目的就是储存一些自定义的变量值，以便以后进行调用或修改。

其中存在this的调用问题，因为在class类里会自动设置**严格模式**，所以说，如果在外部调用this会显示undefined。
就算在类里**直接调用**，也会显示undefined。只有通过**实例调用**，才能正确的调用。

```js
        class Weather extends React.Component {
            // 构造器只调用1次
            constructor(props) {
                super(props);
                this.state ={isHot: false};
                this.demo = this.test.bind(this);
            }
            // render调用1+n次，1是初始化的那次，n是状态更新的次数
            render() {
                return (
                    <h1 onClick={this.demo}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h1>
                );
            }
            // 点几次，调用几次
            test(){
                const isHot = this.state.isHot;
                // 状态必须通过setState进行改变，并且这种状态改变是合并不是替换
                this.setState({isHot: !isHot});
                }
        }
```
上面是正确的写法，为了好理解，我改变了函数的名称。test函数会将其自身传递到原型链上，所以说`this.test`可以通过去寻找原型链找到test函数，但因为其是直接调用，所以说这时候的this还是undefined。但是其通过`bind()`函数，将其转换成了一个新的函数，并且赋予了其一个新的this，所以说这个时候`this.test.bind()`变成了一个拥有类的this的函数，所以说这时候通过赋值语句给`this.demo`,这时候就把this成功的传递了。

**状态必须通过`setState()`进行改变，并且这种状态改变是合并不是替换**

#### 3.3.1.1 简写方式
类中可以直接写赋值语句，所以可以将state直接写到类里进行赋值
```js
        class Weather extends React.Component{
            state = {isHot: false,wind: '微风'};
            render() {
                // 这里通过定义一个对象就能够在下面直接进行调用了
                const{isHot,wind} = this.state;
                return (
                    <h1 onClick = {this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'},{wind}</h1>
                );
            }
            // 自定义方法
            // 通过赋值语句和箭头函数来实现寻找this
            changeWeather = () => {
                // 这里也是同理
                const isHot = this.state.isHot;
                this.setState({isHot: !isHot});
            }
        }
```
组件中render方法中的this为组件实例对象
组建中自定义方法的this为undefined，必须通过**bind方法**或者**箭头函数**来寻找this。

### 3.3.2 props

#### 3.3.2.1 ...运算符的用法
```js
let arr1 = [1,3,5,7,9]
let arr2 = [2,4,6,8,10]
// 1. 将一个数组展开
console.log(...arr1);   //1,3,5,7,9
// 2. 合并两个数组
console.log(...arr1,...arr2);  //1,3,5,7,9,2,4,6,8,10

// 3. 运用在函数中，传递一系列参数
function sum(...numbers) {
    return numbers.reduce((preValue,currentValue) => {
        return currentValue + preValue;
    })
  }

let person = {name:jack, age:20};
// 4. 值的复制
let person2 = {...person}; // {name:jack, age:20}
// 5. 值的复制和修改
let person3 = {...person, name:'tom'}; // {name:tom, age:20}
```

#### 3.3.2.2 props解析
```js
        class Person extends React.Component {
            render() {
                const {name,age,sex} = this.props;
                return (
                    <ul>
                        <li>姓名：{name}</li>
                        <li>性别：{age}</li>
                        <li>年龄：{sex}</li>
                    </ul>
                );
            }
        }
        // 对标签属性进行类型、必要性的限制
        Person.propTypes = {
            name: PropTypes.string.isRequired,  //限制传递类型为string，必须传递
            sex: PropTypes.string,
            age: PropTypes.number,
            speak:PropTypes.func  //限制传递类型为函数
        }
        // 对标签默认值进行限制
        Person.defaultProps = {
            sex : '男',
            age : 222
        }
        // 可以对输入数据进行赋值类型的传递
        const p = {name: 'wh' , age:18, sex: 'man'};
        // 在渲染时，可以通过{...p}这种类型来进行值的传递
        ReactDOM.render(<Person {...p}/>,document.getElementById('test'));
        // 或者说可以通过在标签中内置属性来进行数据的传递
        // 但其实这两种处理方式的本质是相同的，都是在标签里输入数据来传递
        ReactDOM.render(<Person name='whh'  sex='man'/>,document.getElementById('test1'));  //因为没传入age，所以会有一个默认age
        // 因为age是一个数字类型，不能够使用''进行传入，只能够通过{}来传入
        ReactDOM.render(<Person name='haha' age={16}/>,document.getElementById('test2'));  //因为没有sex，会传入一个默认sex。
```

需要注意的是：props是**只读**的，不能**直接进行修改**
#### 3.3.2.3 props简写
```js
			class Person extends React.Component {
				render() {
					const { name, age, sex } = this.props;
					return (
						<ul>
							<li>姓名：{name}</li>
							<li>性别：{age}</li>
							<li>年龄：{sex}</li>
						</ul>
					);
				}

				static propTypes = {
					name: PropTypes.string.isRequired, //限制传递类型为string，必须传递
					sex: PropTypes.string,
					age: PropTypes.number,
					speak: PropTypes.func, //限制传递类型为函数
				};

				static defaultProps = {
					sex: "男",
					age: 222,
				};
			}
```
props的简写核心就是将`propTypes`和`defaultProps`置入类内部，通过给其添加一个 **静态属性** `static`从而实现

#### 3.3.2.4 构造器与props
在react中，**一般情况下constructor都可以进行省略**。
只有两种情况需要使用构造器：
1. 通过给`this.state`赋值对象来初始化内部`state`。
2. 为事件处理函数绑定实例

但是初始化内部state可以通过在类中直接`state={}`来进行
而自定义事件处理函数可以通过`demo = () =>{}`这种箭头函数的形式来实现

但是如果使用构造器，一定不能省略`super()`
但是几乎用不到这种情况，可能会出现未定义的bug。
```js
constructor(props){
    // 构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
    super(props);
}
```

**所以说，开发过程中最好别写构造器**

#### 3.3.2.5 函数式组件使用props
```js
        function Person(props) {
            const {name, age, sex} = props;
            return(
                <ul>
                    <li>姓名：{name}</li>
                    <li>年龄：{age}</li>
                    <li>性别：{sex}</li>
                </ul>
            )
        }

        ReactDOM.render(<Person name='wh' age={18} sex='male'/>,document.getElementById('test'));
```
因为函数能够传递参数，所以说能够使用props，但是不能使用state