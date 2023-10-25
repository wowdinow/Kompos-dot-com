const axios = require('axios')
const Redis = require('ioredis')

const url = 'http://app-service:4002/'
const redis = new Redis({
  password: process.env.REDIS_PASS,
  host: 'redis-11109.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
  port: 11109
});

const typeDefs = `#graphql

  type Category{
    id: ID
    name: String
  }

  type Post {
    id: ID
    title: String
    slug: String
    content: String
    imgUrl: String
    Category: Category
  }

  type Response{
    message: String
  }

  input NewPost{
    title: String
    content: String
    imgUrl: String
    Category: NewCategory
  }

  input NewCategory{
    name: String
  }

  type Query {
    posts: [Post]
    post(id: ID): Post
    categories: [Category]
    category(id: ID): Category
  }

  type Mutation{
    createPost(newPost: NewPost) : Response
    updatePost(id: ID, editPost: NewPost) : Response
    deletePost(id: ID) : Response
    createCategory(newCategory: NewCategory) : Response
    updateCategory(id: ID, editCategory: NewCategory) : Response
    deleteCategory(id: ID) : Response
  }
`;

const resolvers = {
    Query: {
      posts: async() => {
        try {
            const cachedData = await redis.get("app:posts")
            if(!cachedData){
              const {data} = await axios(url + 'admin/posts')
              await redis.set("app:posts", JSON.stringify(data))
              return data
            } else {
              return JSON.parse(cachedData)
            }
        } catch (err) {
            console.log(err);
        }
      },

      post: async(_, {id}) => {
        try {
          const {data} = await axios(url + "admin/posts/" + id)
          return data
        } catch (err) {
          console.log(err);
        }
      },

      categories: async() => {
        try {
            const {data} = await axios(url + 'admin/categories')
            return data
        } catch (err) {
          console.log(err); 
        }
      },

      category: async(_, {id}) => {
        try {
          const {data} = await axios(url + 'admin/categories/' + id)
          return data
        } catch (err) {
          console.log(err);
        }
      }
    },

    Mutation: {
      createPost: async(_, args) => {
        try {
          const {data} = await axios ({
            url: url + 'admin/posts',
            method: "POST",
            data: args.newPost
          })
          await redis.del("app:posts")
          return data
        } catch (err) {
          console.log(err);
        }
      },

      updatePost: async(_, args) => {
        try {
          const {id, editPost} = args
          const {data} = await axios({
            url: url + 'admin/posts/' + id,
            method: "PUT",
            data: editPost
          })
          await redis.del("app:posts")
          return data
        } catch (err) {
          console.log(err);
        }
      },

      deletePost: async(_, {id}) => {
        try {
          const {data} = await axios({
            url: url + 'admin/posts/' + id,
            method: "DELETE",
          })
          await redis.del("app:posts")
          return data
        } catch (err) {
          console.log(err);
        }
      },

      createCategory: async(_, args) => {
        try {
          const {data} = await axios({
            url: url + 'admin/categories',
            method: "POST",
            data: args.newCategory
          })
          return data
        } catch (err) {
          console.log(err);
        }
      },

      updateCategory: async(_, args) => {
        try {
          const {id, editCategory} = args
          const {data} = await axios ({
            url: url + 'admin/categories/' + id,
            method: "PATCH",
            data: editCategory
          })
          return data
        } catch (err) {
          console.log(err);
        }
      },

      deleteCategory: async(_, {id}) => {
        try {
          const {data} = await axios({
            url: url + 'admin/categories/' + id,
            method: "DELETE",
          })
          return data
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

module.exports = [
    typeDefs,
    resolvers
]
