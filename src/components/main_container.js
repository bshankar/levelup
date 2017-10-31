import React, { Component } from 'react'
import TopButtons from './top_buttons'
import BottomButtons from './bottom_buttons'
import ProgressTree from './tree'

class MainContainer extends Component {
  render () {
    return (
      <div className="col s9">
        <TopButtons />
        <ProgressTree />
        <BottomButtons />
      </div>
    )
  }
}

export default MainContainer
