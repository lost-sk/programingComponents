import React from 'react'
import ReactDOM from 'react-dom'
import EchartsMap from './controls/bigdata'
const App = () => {
  return (
    <div>
      <EchartsMap></EchartsMap>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
