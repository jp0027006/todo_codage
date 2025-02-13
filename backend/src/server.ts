import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { verifyToken } from './utils/tokenUtils';
import { todoResolvers } from "../src/graphQL/resolvers/todo";
import { userResolvers } from "../src/graphQL/resolvers/user";
import { typeDefs } from "./graphQL/type";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

dotenv.config();

const prisma = new PrismaClient();
const app: express.Application = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());

// CORS setup
const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

// Apply CORS middleware to your app
app.use(cors(corsOptions));

// Resolvers
const resolvers = {
  Query: {
    ...todoResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...todoResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};

// Apollo Server Setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const token = req.cookies.token;
    
    let user = null;

    if (token) {
      try {
        const decodedToken = verifyToken(token);
        if (decodedToken) {
          user = { id: decodedToken.userId };
        }
      } catch (error) {
        console.error("Error during token verification:", error);
      }
    } else {
    }

    return {
      prisma,
      user,
      res,
    };
  },
});

const serverStart = async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' } as any);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
  });
};

// Start the server
serverStart().catch((err) => {
  console.error(`Server error: ${err}`);
});
