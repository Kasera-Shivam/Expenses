import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const { transactions } = useSelector((state) => state.transaction);

  return (
    <main className="flex h-auto w-screen max-w-full flex-col items-center justify-center py-12">
      <section className="flex w-48 flex-col items-center gap-x-3 gap-y-4">
        <Avatar className={"size-24"}>
          <AvatarImage src={user?.avatar.url} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        <section className="flex flex-col">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-xs font-medium">{user?.email}</p>
        </section>
        <section className="w-full">
          <p className="flex w-full items-center justify-between">
            <span>Total categories</span>
            <span>{categories.length}</span>
          </p>
          <p className="flex w-full items-center justify-between">
            <span>Total transactions</span>
            <span>{transactions.length}</span>
          </p>
        </section>
      </section>
    </main>
  );
};

export default Profile;
