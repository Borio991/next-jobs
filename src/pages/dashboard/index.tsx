import { useSession } from "next-auth/react";
import React from "react";

function Dashboard() {
  const { data } = useSession();
  if (!data?.user) {
    return <div>access denied : only authorized can see this page</div>;
  }

  return (
    <div>
      <div>{data ? data.user?.email : "not logged in"}</div>
      <div>{data ? data.user?.role : "role"}</div>
    </div>
  );
}

export default Dashboard;
