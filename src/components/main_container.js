import React, { Component } from 'react'
import TopButtons from './top_buttons'
import BottomButtons from './bottom_buttons'
import ProgressGraph from './graph'

class MainContainer extends Component {
  render () {
    return (
      <div className="col s9">
        <TopButtons />
        <ProgressGraph data={[5,10,1,3]} width={500} height={500} />
        <BottomButtons />
      </div>
    )
  }
}

export default MainContainer
