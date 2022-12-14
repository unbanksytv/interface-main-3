import { Variables } from 'react-relay'
import { GraphQLResponse, RequestParameters } from 'relay-runtime'

const GRAPHQL_URL = process.env.REACT_APP_AWS_API_ENDPOINT

if (!GRAPHQL_URL) {
  throw new Error('AWS URL MISSING FROM ENVIRONMENT')
}

const headers = {
  'Content-Type': 'application/json',
}

const fetchQuery = (params: RequestParameters, variables: Variables): Promise<GraphQLResponse> => {
  const body = JSON.stringify({
    query: params.text, // GraphQL text from input
    variables,
  })

  return fetch(GRAPHQL_URL, { method: 'POST', body, headers })
    .then((res) => res.json())
    .catch((e) => {
      console.error(e)
      return { data: [] }
    })
}

export default fetchQuery
