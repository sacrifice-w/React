import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {

    search = () => {
        // 获取用户输入
        // const {value} = this.keyWordElement
        // 可以使用连续解构赋值+重命名的形式
        const { keyWordElement: { value: keyWord } } = this
        // 发送网络请求
        axios.get(`/api1/search/users2?q=${keyWord}`).then(
            response => { console.log('成功了', response.data) },
            error => { console.log('失败了', error) }
        )
    }
    render() {
        return (
            <div>
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">搜索GITHUB用户</h3>
                    <div>
                        <input ref={c => this.keyWordElement = c} type="text" placeholder="输入关键词点击搜索" />&nbsp;
                        <button onClick={this.search}>搜索</button>
                    </div>
                </section>
            </div >
        )
    }
}
