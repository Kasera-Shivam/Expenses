import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import config from "@/api.config";
import { fetchMyAccount } from "@/redux/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogin = async () => {
    window.open(`${config.BACKEND_URL}/account/google`, "_self");
    await dispatch(fetchMyAccount());
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{user.name}</AvatarFallback>
          <AvatarImage src={user.avatar.url} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"}>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={"/dashboard"} className="w-full">
            Your Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/profile"} className="w-full">
            Your Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            className={"w-full"}
            onClick={() => {
              Cookies.remove("auth-token");
              dispatch({ type: "LOGOUT" });
            }}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button onClick={handleLogin}>Login</Button>
  );
};

export default Profile;
