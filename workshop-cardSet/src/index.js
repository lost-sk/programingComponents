import React from 'react'
import ReactDOM from 'react-dom'
import SortCard from './controls/sortCart'
const App = () => {
  return (
    <div>
      <SortCard></SortCard>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
