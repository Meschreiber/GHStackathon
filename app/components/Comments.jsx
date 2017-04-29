import React from 'react'
export default (props) => {
  const comments = props.comments.map((comment) =>
    <li key={comment.id}>{comment.text}</li>
  )

  return (
    <div className="Comments">
      <ul>
        {comments}
      </ul>
    </div>
  )
}


