import React from "react"
import Moment from "react-moment"

const Attributes = ({ article }) => {
  const author = article.attributes.author.data.attributes.name
  const category = article.attributes.category.data.attributes.name
  const createdAt = new Date(article.attributes.createdAt).toDateString()

  return (
    <div className="article-attr d-flex justify-content-center text-decoration-none py-3">
      <div className="author px-1">
        Post by
        <span className="attribute-val px-1">
          {author ? author : `Anonymous`}
        </span>
        on
        <span className="attribute-val px-1">
          {createdAt ? (
            <Moment format="MMM Do YYYY">{createdAt}</Moment>
          ) : (
            <></>
          )}
        </span>
        in
        <span className="attribute-val px-1">{category ? category : ``}</span>
      </div>
    </div>
  )
}

export default Attributes
