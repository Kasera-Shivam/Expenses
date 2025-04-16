import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteCategory,
  fetchCategories,
} from "@/redux/actions/category.action";
import {
  deleteTransaction,
  fetchTransactions,
} from "@/redux/actions/transaction.action";
import { Delete, Edit } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateCategory from "../update/UpdateCategory";

const CategoryTable = () => {
  const [select, setSelect] = React.useState("");

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const handleDeleteCategory = async () => {
    await dispatch(deleteCategory(select));
    dispatch(fetchCategories());
    setSelect("");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((txn) => (
          <TableRow
            key={txn._id}
            className={`relative cursor-pointer ${
              select === txn._id
                ? "bg-black text-white hover:bg-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
            onClick={() =>
              setSelect((state) => (state === txn._id ? "" : txn._id))
            }
          >
            <TableCell>
              {new Date(txn.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </TableCell>
            <TableCell className="capitalize">{txn.name}</TableCell>
            <TableCell>{txn.type}</TableCell>
            {select === txn._id && (
              <section className="absolute right-2 flex h-full items-center gap-x-2">
                <Delete onClick={handleDeleteCategory} />
              </section>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
