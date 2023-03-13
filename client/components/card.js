import React from "react"
import Link from "next/link"
import NextImage from "./image"
import Attributes from "./attributes"
import Description from "./description"

const Card = ({ article, index }) => {
  return (
    <div className={"article-card pb-5 " + (index === 0 ? "pt-3" : "pt-5")}>
      <div className="article-header">
        <h2 className="text-center my-2">{article.attributes.title}</h2>
        {/* <p id="category" className="">
              {article.attributes.category.name}
            </p> */}
      </div>
      <Attributes article={article} />
      <div className="w-100 mx-auto">
        <NextImage image={article.attributes.image} />
      </div>
      <Description description={article.attributes.description} />
      <div className="continue-read text-center">
        <Link href={`/article/${article.attributes.slug}`}>
          <a className="text-decoration-none p-2 continue-reading-link">
            Continue reading
            <i className="bi bi-arrow-right px-1"></i>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Card
