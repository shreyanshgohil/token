import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
const MakeAdmin = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }
  return(
    <>
      <h1>shreyansh</h1>
    </>
  )
};

export default MakeAdmin;
