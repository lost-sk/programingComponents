import React from 'react'
import ReactDOM from 'react-dom'
import LightingButton from './controls/lightingButton'
import FantasticButton from './controls/fantasticButton'
const App = () => {
  return (
    <div style={{ height: '80px', width: '200px' }}>
      <LightingButton></LightingButton>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
