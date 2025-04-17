import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAccount } from "@/redux/actions/user.action";
import apiConfig from "@/api.config";

const PrimaryButton = ({
  type = "button",
  children,
  loading,
  onClick,
  className,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogin = async () => {
    window.open(`${apiConfig.BACKEND_URL}/account/google`, "_self");
    await dispatch(fetchMyAccount());
  };

  return (
    <Button
      type={user ? type : "button"}
      disabled={loading}
      onClick={!user ? handleLogin : onClick}
      className={`bg-gradient-to-r from-green-400 to-blue-500 ${className}`}
    >
      {loading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
};

export default PrimaryButton;
