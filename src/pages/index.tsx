export default function Home(props: any) {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <h1 className="text-7xl">{props.hello}</h1>
      <h1 className="text-7xl">{process.env.NEXT_PUBLIC_BASE_URL}</h1>
    </main>
  );
}

export const getServerSideProps = async () => {
  return { props: { hello: "hello world" } };
};
