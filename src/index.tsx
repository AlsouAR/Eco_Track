import React from 'react'
import ReactDOM from 'react-dom/client'

import App from "./app";
import Routing from './components/routing';

const element = <Routing><App/></Routing>

const rootElement = document.getElementById('root')
if (!rootElement){
    throw new Error('No root element found')
}

const root = ReactDOM.createRoot(rootElement)

root.render(element)