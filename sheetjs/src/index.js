import React from 'react'
import ReactDOM from 'react-dom'
import ExcelComponent from './controls/sheet'
const App = () => {
  return (
    <div>
      <ExcelComponent />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
