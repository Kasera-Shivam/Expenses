import React from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "@/api.config";
import { fetchMyAccount } from "@/redux/actions/user.action";
import { Link } from "react-router-dom";

const Section_3 = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogin = async () => {
    window.open(`${apiConfig.BACKEND_URL}/account/google`, "_self");
    await dispatch(fetchMyAccount());
  };

  return (
    <section className="flex h-auto w-full flex-col items-center justify-center bg-blue-500 px-5 py-12 text-white xl:px-24">
      <h2 className="text-center text-3xl font-bold">
        Ready to Take Control of Your Finances?
      </h2>
      <p className="mt-4 text-center">
        Join us now and start managing your expenses like a pro!
      </p>

      {user ? (
        <Link to={"/add-transaction"}>
          <Button className="mt-8 h-fit rounded-lg bg-white px-6 py-3 font-semibold text-blue-500 shadow-md transition duration-300 hover:bg-gray-100">
            {"Sign Up For Free"}
          </Button>
        </Link>
      ) : (
        <Button
          onClick={handleLogin}
          className="mt-8 h-fit rounded-lg bg-white px-6 py-3 font-semibold text-blue-500 shadow-md transition duration-300 hover:bg-gray-100"
        >
          {"Sign Up For Free"}
        </Button>
      )}
    </section>
  );
};

export default Section_3;
