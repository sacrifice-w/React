import React,{lazy} from 'react'
// import About from '../pages/About'
// import Home from '../pages/Home'
import {Navigate} from 'react-router-dom'

const Home = lazy(()=> import('../pages/Home'))
const About = lazy(()=> import('../pages/About'))

export default [
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/',
        element: <Navigate to='/about' />
    },
]