import React from 'react'
import ReactDOM from 'react-dom'
import SquareInventory from './controls/squareinventory'
const App = () => {
  return (
    <div>
      <SquareInventory></SquareInventory>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
