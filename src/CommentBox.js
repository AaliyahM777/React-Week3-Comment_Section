import React from 'react'


export default class CommentBox extends React.Component{
constructor() {
    super();

this.state= {
   showComments: false,
   comments:[]
}
}

render(){
    const comments= this._getComments();
    let commentNodes;
    let buttonText= 'Show Comments';


if(this.state.showComments){
    buttonText='Hide Comments';
    commentNodes = <div className="comment-list">{comments}</div>;
  }

  return(
      <div className="comment-box">
          <h2>Join the Discussion Circle!</h2>
          <CommentForm addComment={this._addComment.bind(this)}/>
        <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
          {buttonText}
        </button>
        <h3>Comments</h3>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        {commentNodes}

      </div>
  );

} // end render here

_addComment(author, body){
  const comment = {
    id: this.state.comments.length + 1,
    author,
    body
  };

this.setState({comments: this.state.comments.concat([comment]) }); // new array refences help React stay fast, so concat works better than push here
}
_handleClick(){
  this.setState({
    showComments: !this.state.showComments
  });
}
_getComments(){
  return this.state.comments.map((comment) => {
    return(
      <Comment
        author={comment.author}
        body={comment.body}
        key={comment.id} 
        deleteComment={this._deleteComment}
        />
    )
  })
}
// commonet count keeping track of number of comments
_getCommentsTitle(commentCount){
  if (commentCount=== 0) {
    return 'No comments yet';
  }else if (commentCount === 1){
    return "1 comment";
  }else{
    return `${commentCount} comments`;
  }
}// end of Comment Box Component
_deleteComment = (index) => {
  console.log(index)
  const commentsCopy = [...this.state.comments]
  commentsCopy.splice(index, 1)
  this.setState({
    comments:commentsCopy
  })
}

}

class CommentForm extends React.Component{
  render(){
    return(
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-form-fields">
          <input placeholder="Name" required ref={(input) => this._author= input}></input><br />
            <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">Post Comment</button>
        </div>
      </form>
    );
  }// end render

 _handleSubmit(event) {
   event.preventDefault(); // prevents page from reloading on submit
   let author= this._author;
   let body = this._body;
   this.props.addComment(author.value, body.value);
 }

}


class Comment extends React.Component{
  constructor(){
    super()
    this.state={
      likes:0,
      dislikes:0
    }
  }
  render(){
    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className= "comment-body">-{this.props.body}</p>
        <button onClick={this.addLikes}>Likes:{this.state.likes}</button>
        <button onClick={this.addDislikes}>Likes:{this.state.dislikes}</button>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete" onClick={this.props.deleteComment}>Delete Comment</a>

        </div>

      </div>

    )
  }
  addLikes=() => {
    this.setState({
      likes:this.state.likes + 1
    })
  }
  addDislikes=()=> {
    this.setState({
      dislikes:this.state.dislikes + 1
    })
  }
  _deleteComment(){
    alert("-- DELETE Comment Functionality COMING SOON...");

  }
}






