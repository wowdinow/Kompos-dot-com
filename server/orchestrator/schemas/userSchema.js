const axios = require("axios");

const url = "http://user-service:4001/";

const typeDefs = `#graphql
  
type User{
    _id: String
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
}

type Response{
  message: String
}

input NewUser{
  username: String
  email: String
  password: String
  phoneNumber: String
  address: String
}

  type Query {
    users: [User]
    user(_id: String): User
  }

  type Mutation {
    createUser(newUser: NewUser): Response
    deleteUser(_id: String) : Response
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const { data } = await axios(url + "users");
        return data;
      } catch (err) {
        console.log(err);
      }
    },

    user: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios(url + "users/" + _id);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      try {
        const { data } = await axios({
          url: url + "users",
          method: "POST",
          data: args.newUser,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },

    deleteUser: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios({
          url: url + "users/" + _id,
          method: "DELETE",
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
