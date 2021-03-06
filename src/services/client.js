import ApolloClient from 'apollo-boost'

/**
 * If there is an authentication error doing a request,
 * "onError" function remove the token from localStorage
 * and return you to validation page (public route)
 */
export const createApolloClient = () => {
  return new ApolloClient({
    uri: process.env.REACT_APP_GITHUB_BASE,
    request: async (operation) => {
      const token = localStorage.getItem('token')

      operation.setContext({
        headers: {
          authorization: token ? `token ${token}` : '',
        },
      })
    },
    onError: ({ networkError }) => {
      const path = window.location.pathname
      if (networkError?.statusCode === 401 && path !== '/') {
        localStorage.removeItem('token')
        window.location.reload()
      }
    },
  })
}
