// 创建“外壳”组件
import React,{Component} from 'react'
import Hello from './components/Hello/Hello.js'

// 创建并暴露App组件
export default class App extends Component{
    render() {
        return (
            <div>
                <Hello />
            </div>
        );
    }
}

