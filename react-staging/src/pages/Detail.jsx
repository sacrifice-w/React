import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Detail() {
    const {state} = useLocation();
    return (
        <ul>
            <li>消息编号：{state.id}</li>
            <li>消息标题：{state.title}</li>
            <li>消息内容：{state.content}</li>
        </ul>
    )
}
