import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Newsletter } from "../../components/newsletter"

const Article = ({ article, categories, articleList }) => {
  const imageUrl = getStrapiMedia(article.attributes.image)
  const author = article.attributes.author.data.attributes
  const [prevArticle, setPrev] = useState("")
  const [nextArticle, setNext] = useState("")

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  }

  useEffect(() => {
    const currentArticleIndex = articleList.findIndex(
      (indexArticle) => indexArticle.path === article.attributes.slug
    )
    if (currentArticleIndex >= 0) {
      articleList[currentArticleIndex - 1]
        ? setPrev(articleList[currentArticleIndex - 1])
        : setPrev("")
      articleList[currentArticleIndex + 1]
        ? setNext(articleList[currentArticleIndex + 1])
        : setNext("")
    }
  }, [articleList])

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div className="blog-title text-center py-5">
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="col-md-6 m-auto">
        <div className="blog-banner py-1 w-100">
          <img src={imageUrl} alt="blog banner" />
        </div>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown
            source={article.attributes.content}
            escapeHtml={false}
          />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.attributes.author.picture && (
                <NextImage image={article.attributes.author.picture} />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {author.name ? author.name : `Anonymous`}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">
                  {article.attributes.published_at}
                </Moment>
              </p>
            </div>
          </div>
          <div className="nav-blogs-section row py-5 my-3">
            {prevArticle ? (
              <div className="col-md-6 nav-blog-item previous-blog text-left px-2 py-3">
                <div className="nav-label">Previous blog</div>
                <Link
                  href={`/article/${prevArticle.path}`}
                  className="nav-name text-decoration-none"
                >
                  {prevArticle.title}
                </Link>
              </div>
            ) : (
              <div className="col-md-6 nav-blog-item previous-blog text-left px-2 py-3"></div>
            )}
            {nextArticle ? (
              <div className="col-md-6 nav-blog-item next-blog text-right px-2 py-3">
                <div className="nav-label">Next blog</div>
                <Link
                  href={`/article/${nextArticle.path}`}
                  className="nav-name text-decoration-none"
                >
                  {nextArticle.title}
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="newsletter-form">
            <Newsletter></Newsletter>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] })
  const paths = articlesRes.data.map((article) => {
    return {
      params: {
        slug: article.attributes.slug,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  })
  const categoriesRes = await fetchAPI("/categories")

  const articleListRes = await fetchAPI("/articles", {
    fields: ["slug", "title"],
  })
  const articleList = articleListRes.data.map((article) => ({
    path: article.attributes.slug,
    title: article.attributes.title,
  }))

  return {
    props: {
      article: articlesRes.data[0],
      categories: categoriesRes,
      articleList,
    },
    revalidate: 1,
  }
}

export default Article
