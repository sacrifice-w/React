import React, { Component } from 'react'
import axios from 'axios'
export default class App extends Component {
    handleClick = () => {
        axios.get('http://localhost:3000/students').then(
            response => {console.log('成功了',response.data);},
            error => {console.log('失败了',error);}
        )
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>点我获取学生数据</button>
            </div>
        )
    }
}
