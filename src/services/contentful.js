export async function fetchGraphQL(query, preview = false) {
    return fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${preview ? process.env.REACT_APP_CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
          }`
      },
      body: JSON.stringify({ query })
    }).then((response) => response.json());
  }