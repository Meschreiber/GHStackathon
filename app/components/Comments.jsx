import React from 'react'
export default (props) => {
  const comments = props.comments.map((comment) =>
    <div key={comment.id}>
      <li className="comment" >
        <blockquote>
          <p>{comment.text}</p>
        </blockquote>
        <p id="author"> - {comment.author}</p>
      </li>
    </div>
  )

  return (
    <div className="comments">
      <ul>
        {comments}
      </ul>
    </div>
  )
}