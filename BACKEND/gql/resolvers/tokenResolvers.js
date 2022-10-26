import Tokens from "../../models/Tokens.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
const tokenResolvers = {
  Query: {
    getAllTokens: async (parent, args, context, info) => {
      try {
        const allTokens = await Tokens.find().limit(10);
        return allTokens;
      } catch (err) {
        console.log(err);
      }
    },
    getSingleToken: async (parent, args, context, info) => {
      try {
        const { id } = args;
        const allToken = await Tokens.findOne({ _id: id });
        return allToken;
      } catch (err) {
        console.log(err);
      }
    },
    filterTokens: async (parent, args, context, info) => {
      try {
        const { typeOfToken } = args;
        const allToken = await Tokens.find({ typeOfToken });
        return allToken;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    createToken: async (parent, args, context, info) => {
      try {
        const { token, adminPassword } = args;
        if (token && adminPassword) {
          const searchedUser = await User.findOne({ _id: token.tokenCreator });
          const isAdminAllowed = await bcrypt.compare(
            adminPassword,
            searchedUser.password
          );
          if (isAdminAllowed && searchedUser.typeOfUser === 1) {
            const newToken = new Tokens(token);
            await newToken.save();
            return "Token created sucessfully";
          } else {
            return "You are not allowed to create an token";
          }
        } else {
          return "Please enter all required data";
        }
      } catch (err) {
        console.log(err);
      }
    },
    updateToken: async (parent, args, context, info) => {
      try {
        const { token, adminId, adminPassword, tokenId } = args;
        if (token && adminId && adminPassword) {
          const searchedUser = await User.findOne({ _id: adminId });
          const searchedToken = await Tokens.findOne({ _id: tokenId });
          const isAdminAllowed = await bcrypt.compare(
            adminPassword,
            searchedUser.password
          );
          if (isAdminAllowed && searchedUser.typeOfUser === 1) {
            await searchedToken.updateOne({ $set: token });
            return "Token updated sucessfully";
          } else {
            return "You are not allowed to updated an token";
          }
        } else {
          return "Please enter all required data";
        }
      } catch (err) {
        console.log(err);
      }
    },
    deleteToken: async (parent, args, context, info) => {
      try {
        const { adminId, adminPassword, tokenId } = args;
        if (tokenId && adminId && adminPassword) {
          const searchedUser = await User.findOne({ _id: adminId });
          const searchedToken = await Tokens.findOne({ _id: tokenId });
          const isAdminAllowed = await bcrypt.compare(
            adminPassword,
            searchedUser.password
          );
          if (searchedToken) {
            if (isAdminAllowed && searchedUser.typeOfUser === 1) {
              await searchedToken.deleteOne();
              return { status: 200, message: "Token deleted sucessfully" };
            } else {
              return {
                status: 405,
                message: "You are not allowed to delete an token",
              };
            }
          } else {
            return { status: 405, message: "token not found" };
          }
        } else {
          return { status: 405, message: "Please enter all required data " };
        }
      } catch (err) {
        console.log(err);
      }
    },
    updateQuantity: async (parent, args, context, info) => {
      try {
        const { updateData } = args;
        await Promise.all(
          updateData.map(async (singleUpdate) => {
            await Tokens.updateOne(
              { _id: singleUpdate._id },
              {
                $set: {
                  availableTokenQuantity: singleUpdate.availableTokenQuantity,
                },
              }
            );
          })
        );
        return "Quntity updated successfully";
      } catch (err) {
        console.log(err);
      }
    },
  },
};
export default tokenResolvers;
