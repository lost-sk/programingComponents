import React from 'react'
import ReactDOM from 'react-dom'
import Card from './controls/card'
const App = () => {
  return (
    <div>
      <Card></Card>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
