import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'
export default class App extends Component {
    // 状态在哪里，操作状态的方法就在哪里
    // 初始化状态
    state = {todo: [
        {id:'001', name:'吃饭',done:true},
        {id:'002', name:'睡觉',done:true},
        {id:'003', name:'打代码',done:false},
    ]}
    // 用于添加一个todo，接收的参数是todo对象
    addTodo = (todoObj) =>{
        const {todo} = this.state;
        const newTodos = [todoObj,...todo]
        this.setState({todo:newTodos});
    }
    // 用于勾选和取消勾选
    updateTodo = (id,done) => {
        const {todo} = this.state;
        const newTodo = todo.map((todoObj) =>{
            if(todoObj.id === id) return {...todoObj,done}
            else return todoObj
        })
        this.setState({todo:newTodo});
    }

    // 用于删除一个todo
    deleteTodo = (id) =>{
        const {todo} = this.state;
        // 删除指定id的todo对象
        const newTodo = todo.filter((todoObj) =>{
            return todoObj.id !== id 
        })

        // 更新状态
        this.setState({todo:newTodo});
    }

    checkAllTodo = (done) =>{
        const {todo} = this.state;
        const newTodo = todo.map((todoObj) =>{
            return {...todoObj,done}
        })
        this.setState({todo:newTodo})
    }

    clearAllDone = ()=>{
        const {todo} = this.state;
        const newTodo = todo.filter((todoObj) =>{
            return !todoObj.done
        });

        this.setState({todo:newTodo})
    }
    render() {
        const todo = this.state;
        // 这里传递的是this.state.todo
        return (
            <div className='todo-container'>
                <div className='todo-wrap'>
                    <Header addTodo = {this.addTodo}/>
                    <List todo={todo} updateTodo = {this.updateTodo} deleteTodo={this.deleteTodo}/>
                    <Footer todo={todo} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone}/>
                </div>
            </div>
        )
    }
}


