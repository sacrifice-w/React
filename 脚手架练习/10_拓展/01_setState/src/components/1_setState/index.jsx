import React, { Component } from 'react'

export default class Count extends Component {
    state = {count: 0};
    add = () => {
        const {count} = this.state;

        // 对象式的setState
        // this.setState({count: count + 1},()=>{
        //     console.log(this.state.count);
        // });

        // 函数式的setState
        this.setState((state,props)=>{
            return {count : state.count +1}
        })
    }
    render() {
        return (
            <div>
                <h1>当前求和为：{this.state.count}</h1>
                <button onClick = {this.add}>点我加一</button>
            </div>
        )}
}
