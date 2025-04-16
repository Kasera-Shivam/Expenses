import React from "react";
import { FaSignInAlt, FaList, FaChartPie } from "react-icons/fa";

const object = [
  {
    icon: <FaSignInAlt />,
    title: "Sign Up",
    content: "Register and start managing your expenses in a minute.",
  },
  {
    icon: <FaList />,
    title: "Add Transactions",
    content: "Quickly add income and expenses to your account.",
  },
  {
    icon: <FaChartPie />,
    title: "View Reports",
    content: "See insightful reports & graphs of your finances.",
  },
];

const Section_2 = () => {
  return (
    <section className="flex h-auto w-full max-w-full flex-col items-center gap-y-6 overflow-x-hidden bg-white px-5 py-12 xl:px-24">
      <h1 className="text-center text-4xl font-semibold">How it works</h1>
      <ul className="flex w-full flex-col items-center gap-y-6 sm:flex-row sm:justify-center sm:gap-x-8">
        {object.map((obj, index) => (
          <li key={index} className="flex flex-col items-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white">
              {obj.icon}
            </span>
            <span className="font-medium">{obj.title}</span>
            <p className="text-center text-sm">{obj.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Section_2;
