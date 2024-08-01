import React from 'react'
import ReactDOM from 'react-dom'
import Cube from './controls/cube'
const App = () => {
  return (
    <div style={{ width: '600px', height: '600px' }}>
      <Cube></Cube>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
