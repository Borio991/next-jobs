import Image from "next/image";
import { Inter } from "next/font/google";
import { db } from "@/server/db";
import { PrismaClient } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-7xl">{props.hello}</h1>
    </main>
  );
}

export const getServerSideProps = async () => {
  const example = await db.example.findFirst();
  return { props: { hello: example?.name } };
};
