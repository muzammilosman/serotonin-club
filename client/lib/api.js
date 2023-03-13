import qs from "qs"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`
  const response = await fetch(requestUrl, mergedOptions)
  if (!response.ok) {
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}

export async function postAPI(path, apiBody = {}) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: apiBody,
    }),
  }

  const requestUrl = `${getStrapiURL(`/api${path}`)}`
  const response = await fetch(requestUrl, requestOptions)
  if (!response.ok) {
    console.error(response.statusText)
    // throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}
