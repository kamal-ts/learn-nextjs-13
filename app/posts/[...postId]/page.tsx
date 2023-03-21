import React from 'react'

function PostDetile({params}: {params:{postId: String}}) {
  console.log(params);
  
  return (
    <div>Post Detile: {params.postId[2 ]}</div>
  )
}

export default PostDetile