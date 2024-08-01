import React from 'react'
import ReactDOM from 'react-dom'
import EChartsGL from './controls/echarts-gl'
const App = () => {
  return (
    <div>
      <EChartsGL></EChartsGL>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
