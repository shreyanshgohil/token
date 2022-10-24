import User from "../../models/User.js";
import bcrypt from "bcrypt";
const userResolvers = {
  Query: {
    getAllUsers: async (parent, args, context, info) => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.log(err);
      }
    },
    getSingleUser: async (parent, args, context, info) => {
      try {
        const { emailId } = args;
        const user = await User.findOne({ email: emailId });
        return user;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      try {
        const salt = await bcrypt.genSalt(10);
        const { userName, email, password, typeOfUser } = args.user;
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          userName,
          email,
          password: hashedPassword,
          typeOfUser,
        });
        await newUser.save();
        return "new user created successfully";
      } catch (err) {
        console.log(err);
      }
    },
    updateUser: async (parent, args, context, info) => {
      try {
        const { emailId, password } = args;
        const { user: payloadUserData } = args;
        const searchedUser = await User.findOne({ _id: emailId });

        if (!payloadUserData.password && password) {
          const isValidPassword = await bcrypt.compare(
            password,
            searchedUser.password
          );
          if (isValidPassword) {
            await searchedUser.updateOne({ $set: payloadUserData });
            return "user data is updated sucessfully";
          } else {
            return "please enter the correct password";
          }
        } else if (payloadUserData.password && password) {
          const isValidPassword = await bcrypt.compare(
            password,
            searchedUser.password
          );
          if (isValidPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(
              payloadUserData.password,
              salt
            );
            payloadUserData.password = hashedPassword;
            await searchedUser.updateOne({ $set: payloadUserData });
            return "user updated sucessfully";
          } else {
            return "you cannot change others password";
          }
        } else {
          return "please fill the required data";
        }
      } catch (err) {
        console.log(err);
      }
    },
    deleteUser: async (parent, args, context, info) => {
      const { emailId, password } = args;
      const searchedUser = await User.findOne({ email: emailId });
      if (searchedUser) {
        const isValidPassword = await bcrypt.compare(
          password,
          searchedUser.password
        );
        if (isValidPassword) {
          await searchedUser.deleteOne();
          return "user deleted";
        } else {
          return "password is incorrect";
        }
      } else {
        return "user not found";
      }
    },
  },
};

export default userResolvers;
