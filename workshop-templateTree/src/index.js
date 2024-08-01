import React from 'react'
import ReactDOM from 'react-dom'
import TemplateTree from './controls/templateTree'
import 'antd/dist/antd.css'
const App = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <TemplateTree></TemplateTree>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
