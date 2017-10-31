import React, { Component } from 'react'
import TopButtons from './top_buttons'
import BottomButtons from './bottom_buttons'

class MainContainer extends Component {
  render () {
    return (
      <div className="col s9">
        <TopButtons />
        <BottomButtons />
      </div>
    )
  }
}

export default MainContainer
