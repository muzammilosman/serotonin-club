import React from "react"
import Card from "./card"

const Articles = ({ articles }) => {
  return (
    <div>
      <div className="col-md-12">
        <div>
          {articles.map((article, i) => {
            return (
              <Card
                article={article}
                index={i}
                key={`article__left__${article.attributes.slug}`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Articles
