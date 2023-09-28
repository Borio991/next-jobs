import { authOptions } from "@/server/auth-lib/authOptions";
import { getServerSession } from "next-auth";

function Admin(props: any) {
  return <div>{props.hello}</div>;
}

export default Admin;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log("session :", session);
  const res = await fetch("http://localhost:3000/api/hello", {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const result = await res.json();
  return {
    props: {
      hello: JSON.stringify(result),
    },
  };
}
