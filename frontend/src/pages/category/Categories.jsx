import CategoryTable from "@/components/tables/CategoryTable";
import React from "react";

const Categories = () => {
  return (
    <main className="flex w-screen max-w-full flex-col gap-y-3 px-5 py-12 xl:px-24">
      <h1 className="text-xl font-bold">Your categories</h1>
      <CategoryTable />
    </main>
  );
};

export default Categories;
