export default function Home(props: any) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <h1 className="text-7xl">{props.hello}</h1>
    </main>
  );
}

export const getServerSideProps = async () => {
  return { props: { hello: "hello world" } };
};
