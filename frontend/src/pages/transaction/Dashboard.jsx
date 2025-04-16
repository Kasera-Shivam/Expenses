import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "@/redux/actions/transaction.action";
import { Loader2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TransactionTable from "@/components/tables/TransactionTable";
import PrimaryButton from "@/components/form/PrimaryButton";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, transactions } = useSelector((state) => state.transaction);

  React.useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const COLORS = ["#00C49F", "#FF8042"];

  const chartData = React.useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    return [
      { name: "Income", value: income },
      { name: "Expense", value: expense },
    ];
  }, [transactions]);

  return loading ? (
    <Loader2 className="mx-auto" />
  ) : (
    <main className="flex w-screen max-w-full flex-col">
      {transactions?.length > 0 ? (
        <React.Fragment>
          <section className="flex w-full items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </section>
          <section className="flex w-full flex-col px-5 py-12 xl:px-24">
            <TransactionTable transactions={transactions} />
          </section>
        </React.Fragment>
      ) : (
        <section className="flex flex-col items-center justify-center gap-y-3 py-12 text-4xl font-medium">
          <span>No transactions</span>
          <Link to={"/add-transaction"}>
            <PrimaryButton>Add transaction</PrimaryButton>
          </Link>
        </section>
      )}
    </main>
  );
};

export default Dashboard;
