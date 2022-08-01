import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'
export default class List extends Component {
    static propTypes = {
        todo: PropTypes.array.isRequired,
        updateTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired
    }
    render() {
        const {todo,updateTodo,deleteTodo} = this.props
        // 因为这里传递过来的是todo。这里是一个对象
        // 所以说如果直接todo.map会显示不是function。因为传递到这里是一个包含了数组的对象
        // 所以说要将其提取出来，todo.todo就是提取出了其中的数组。
        return (
            <ul className='todo-main'>
                {
                    todo.todo.map((todo) => {
                        return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo = {deleteTodo}/>
                    })
                }
            </ul>
        )
    }
}
