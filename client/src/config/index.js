import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


export const client = new ApolloClient({
    uri: 'https://wadinodev.com',
    cache: new InMemoryCache(),
  });

export const GET_POSTS = gql`
query Post {
  posts {
    id
    title
    slug
    content
    imgUrl
    Category {
      id
      name
    }
  }
}
`

export const GET_SINGLE_POST = gql`
query Post($postId: ID) {
  post(id: $postId) {
    id
    title
    slug
    content
    imgUrl
    Category {
      id
      name
    }
  }
}
`