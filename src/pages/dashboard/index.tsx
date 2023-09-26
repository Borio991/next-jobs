import { useSession } from "next-auth/react";
import React from "react";

function Dashboard() {
  const { data } = useSession();
  console.log("session :", data);
  return <div>{data ? data?.user.email : "not logged in"}</div>;
}

export default Dashboard;
