import React from "react"
import { postAPI } from "../lib/api"

export const Newsletter = () => {
  const submitEmail = async (event) => {
    event.preventDefault()
    const newsletterEmail = event.target.email.value
    const emailResponse = await postAPI("/newsletters", {
      email: newsletterEmail,
    })
  }

  return (
    <div className="text-center newsletter-section p-4 rounded">
      <div className="newsletter-header">
        <div className="header-text">
          Get our latest posts on email and join our community of writers
        </div>
      </div>
      <div className="newsletter-form">
        <form className="row p-3 m-2" onSubmit={submitEmail}>
          <input
            placeholder="Enter your email here"
            name="email"
            className="col-md-8 rounded"
            type="email"
          />
          <button className="btn col-md-4" type="submit">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  )
}
