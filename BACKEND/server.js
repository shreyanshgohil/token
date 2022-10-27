import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import indexResolvers from "./gql/resolvers/indexResolvers.js";
import indexTypeDefs from "./gql/typedefs/indexTypeDefs.js";
const app = express();

app.use(express.json());
config();

const startServerHandler = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to db");
    const apolloServer = new ApolloServer({
      typeDefs: indexTypeDefs,
      resolvers: indexResolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(5001, () => {
      console.log("server is started");
    });
  } catch (err) {
    console.log(err);
  }
};
startServerHandler();
