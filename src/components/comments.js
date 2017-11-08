import React, { Component } from 'react'

class Comments extends Component {

  render() {

    const commentList = this.props.currentNode
          .comments
          .map(c => <li className="collection-item">
               <p style={{'fontWeight': 'bold'}}>{c.name}</p>
               <p>{c.comment}</p></li>)

    return (
      <div>
        <div className="col s10">
          <input placeholder="name" id="first_name" type="text" class="validate"/>
        </div>
        <div className="col s10">
        <textarea id="comment_area" placeholder="comment" class="materialize-textarea"></textarea>
        <a className="waves-effect waves-light btn"><i className="material-icons right">send</i>submit</a>
        </div>
        <ul className="collection col s12">
        {commentList}
        </ul>
      </div>
    )
  }
}

export default Comments
