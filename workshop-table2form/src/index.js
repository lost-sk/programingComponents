import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import Table2Form from './controls/table2form'
const App = () => {
  return (
    <div>
      <Table2Form />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
