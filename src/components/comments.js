import React, { Component } from 'react'

class Comments extends Component {

  render() {
    return (
      <div>
        <div className="col s6">
          <input placeholder="name" id="first_name" type="text" class="validate"/>
        </div>
        <div className="col s10">
        <textarea id="comment_area" placeholder="comment" class="materialize-textarea"></textarea>
        <a className="waves-effect waves-light btn"><i className="material-icons left">send</i>submit</a>
        </div>
      </div>
    )
  }
}

export default Comments
