import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import Model from './controls/equipmodel'
const App = () => {
  return (
    <div>
      <Model />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
