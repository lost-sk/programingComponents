import React from 'react'
import ReactDOM from 'react-dom'
import CkEditor5 from './controls/ckeditor5'
const App = () => {
  return (
    <div>
      <CkEditor5></CkEditor5>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
