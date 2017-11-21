function getComment (nameRef, commentRef) {
  const name = nameRef.value
  const comment = commentRef.value
  return {name: name, comment: comment}
}

function addComment (nameRef, commentRef, formRef) {
  const c = this.getComment(nameRef, commentRef)
  if (c.name !== '' && c.comment !== '') {
    this.state.currentNode.comments.unshift(c)
    this.setState({graph: this.state.graph})
  }
  formRef.reset()
}

export {getComment, addComment}
