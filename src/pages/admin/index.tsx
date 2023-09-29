import { authOptions } from "@/server/auth-lib/authOptions";
import { getServerSession } from "next-auth";

function Admin(props: any) {
  return (
    <div>
      <div>{props.hello}</div>
      <div>{props.users}</div>
    </div>
  );
}

export default Admin;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hello`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.user.accessToken}`,
      cookie: context.req.headers.cookie || "",
    },
  });
  const result = await res.json();
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.user.accessToken}`,
        cookie: context.req.headers.cookie || "",
      },
    }
  );
  const users = await userRes.json();
  return {
    props: {
      hello: JSON.stringify(result),
      users: JSON.stringify(users),
    },
  };
}
