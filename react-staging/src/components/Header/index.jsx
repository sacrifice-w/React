import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'
import './index.css'

export default class Header extends Component {
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }
    handleKeyUp = (event) => {
        const {keyCode,target} = event;
        if(keyCode !== 13) return;
        // 添加的todo名字不能为空
        if(target.value.trim() === ''){
            alert('输入不能为空');
            return;
        }
        // 子组件想要给父组件传递信息，需要父组件提前给子组件传递一个函数
        // 之后子组件再通过这个函数将信息传递回父组件
        const todoObj = {id: nanoid(), name:target.value,done:false}
        // 将这个对象添加到App
        this.props.addTodo(todoObj);

        // 清空输入
        target.value = '';
    }
    render() {
        return (
            <div className='todo-header'>
                <input type="text" placeholder='请输入你的任务名称，按回车键确认' onKeyUp={this.handleKeyUp}/>
            </div>
        )
    }
}
