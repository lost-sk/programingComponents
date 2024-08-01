import React from 'react'
import ReactDOM from 'react-dom'
import WordCloud from './controls/wordCloud'
const App = () => {
  return (
    <div>
      <WordCloud></WordCloud>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
