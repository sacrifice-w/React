import React from 'react'
import root from'./index'

export default function App() {
    const [count,setCount] = React.useState(0)

    const myRef = React.useRef();

    React.useEffect(() => {
        let timer = setInterval(() => {
            setCount(count => count + 1)
        }, 1000)
        return () => {
            clearInterval(timer);
        }
    },[])

    function add() {
        // setCount(count+1);
        setCount(count => count+1);
    }

    function show() {
        alert(myRef.current.value);
    }

    function remove() {
        root.unmount();
    }
    return (
        <div>
            <input type="text" ref={myRef}/>
            <h2>当前求和为：{count}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={remove}>点我卸载</button>
            <button onClick={show}>点我提示数据</button>
        </div>
    )
}
