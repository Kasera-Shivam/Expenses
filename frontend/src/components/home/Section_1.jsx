import { Banknote, ChartNoAxesColumn, Funnel } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "@/api.config";
import { fetchMyAccount } from "@/redux/actions/user.action";
import { Link } from "react-router-dom";

const object = [
  {
    icon: <Banknote />,
    name: "Efficient Tracking",
  },
  {
    icon: <Funnel />,
    name: "Transactions Filtering",
  },
  {
    icon: <ChartNoAxesColumn />,
    name: "Insightful Reports",
  },
];

const Section_1 = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogin = async () => {
    window.open(`${apiConfig.BACKEND_URL}/account/google`, "_self");
    await dispatch(fetchMyAccount());
  };

  return (
    <section className="flex h-auto w-full flex-col items-center justify-center gap-y-12 bg-gradient-to-r from-green-400 to-blue-500 px-5 py-5 text-white sm:h-96 sm:py-0 xl:px-24">
      <section className="flex flex-col items-center gap-y-2">
        <h1 className="text-center text-3xl text-white md:text-4xl lg:text-6xl">
          Track Your Expenses Effortlessly
        </h1>
        <p className="text-center text-2xl text-white">
          Manage your finances with a modern solution designed for you.
        </p>
      </section>
      <ul className="flex flex-col items-center gap-y-3 sm:flex-row sm:gap-x-6 sm:gap-y-0">
        {object.map((obj, index) => (
          <li key={index} className="flex flex-col items-center">
            {obj.icon}
            <h1 className="">{obj.name}</h1>
          </li>
        ))}
      </ul>
      {user ? (
        <Link to={"/add-transaction"}>
          <Button className="h-fit rounded-lg bg-white font-semibold text-black shadow-md transition duration-300 hover:bg-gray-100">
            {"Get Started"}
          </Button>
        </Link>
      ) : (
        <Button
          onClick={handleLogin}
          className="h-fit rounded-lg bg-white font-semibold text-black shadow-md transition duration-300 hover:bg-gray-100"
        >
          {"Get Started"}
        </Button>
      )}
    </section>
  );
};

export default Section_1;
