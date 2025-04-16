import React from "react";
import Section_1 from "@/components/home/Section_1";
import Section_2 from "@/components/home/Section_2";
import Section_3 from "@/components/home/Section_3";

const Home = () => {
  return (
    <main className="flex h-auto w-screen max-w-full flex-col">
      <Section_1 />
      <Section_2 />
      <Section_3 />
    </main>
  );
};

export default Home;
