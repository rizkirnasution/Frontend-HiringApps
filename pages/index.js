import React from "react";
import axios from "axios";
import Head from "next/head";
import Home1 from "../components/Home/Home1";
import Home2 from "../components/Home/Home2";
import Home3 from "../components/Home/Home3";
import Carousel from "../components/Home/Carousel";
import Home4 from "../components/Home/Home4";

export async function getStaticProps(context) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/skill/static`
  );
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/worker`);

  return {
    props: {
      data: response.data.data,
      worker: res.data.data,
    },
    revalidate: 10,
  };
}

const Landing = ({ data, worker }) => {
  return (
    <>
      <Head>
        <title>Hiring App - Home</title>
        <meta name="description" content="Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home1 />
      <Home2 />
      <Home3 data={data} />
      <Carousel worker={worker} />
      <Home4 />
    </>
  );
};

Landing.layout = "Layout";

export default Landing;
