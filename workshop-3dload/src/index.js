import React from 'react'
import ReactDOM from 'react-dom'
import Load3D from './controls/3dload'
const App = () => {
  return (
    <div>
      <Load3D />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
