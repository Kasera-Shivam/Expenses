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
  deleteTransaction,
  fetchTransactions,
} from "@/redux/actions/transaction.action";
import { Delete, Edit } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TransactionTable = () => {
  const [select, setSelect] = React.useState("");

  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);

  const handleDeleteTransaction = async () => {
    await dispatch(deleteTransaction(select));
    dispatch(fetchTransactions());
  };

  return (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((txn) => (
          <TableRow
            key={txn._id}
            className={`relative cursor-pointer ${select === txn._id ? "bg-black text-white hover:bg-black hover:text-white" : "bg-white text-black"}`}
            onClick={() =>
              setSelect((state) => (state === txn._id ? "" : txn._id))
            }
          >
            <TableCell>
              {new Date(txn.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </TableCell>
            <TableCell className="border-r border-[#eeeeee] capitalize">
              {txn.type}
            </TableCell>
            <TableCell>{txn.category}</TableCell>
            <TableCell>₹ {txn.amount}</TableCell>
            {select === txn._id && (
              <section className="absolute right-2 flex h-full items-center gap-x-2">
                <Delete onClick={handleDeleteTransaction} />
              </section>
            )}
          </TableRow>
        ))}
        <TableRow className="border-t font-semibold">
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell>
            ₹ {transactions.reduce((acc, txn) => acc + Number(txn.amount), 0)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
