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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, transactions } = useSelector((state) => state.transaction);

  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [type, setType] = React.useState("");

  if (type === "select") setType("");

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const onFromDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const now = new Date();
    const today = formatDate(now);

    if (selectedDate > now) {
      setFromDate(today);
    } else {
      setFromDate(event.target.value);
    }
  };

  const onToDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const now = new Date();
    const today = formatDate(now);

    if (selectedDate > now) {
      setToDate(today);
    } else {
      setToDate(event.target.value);
    }
  };

  const handleFilter = async () => {
    dispatch(fetchTransactions(fromDate, toDate, type));
  };

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
      (
      <React.Fragment>
        {transactions?.length > 0 ? (
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
        ) : (
          <section className="flex flex-col items-center justify-center gap-y-3 py-12 text-4xl font-medium">
            <span>No transactions</span>
            <Link to={"/add-transaction"}>
              <PrimaryButton>Add transaction</PrimaryButton>
            </Link>
          </section>
        )}
        <section className="flex w-full flex-col gap-y-4 px-5 py-12 xl:px-24">
          <section className="flex w-full flex-col items-center gap-x-4 sm:flex-row sm:justify-center">
            <section className="w-full">
              <label htmlFor="from-date">From Date</label>
              <Input
                id={"from-date"}
                type={"Date"}
                className={"w-full"}
                value={fromDate}
                onChange={onFromDateChange}
              />
            </section>
            <section className="w-full">
              <label htmlFor="to-date">To Date</label>
              <Input
                id={"to-date"}
                type={"Date"}
                className={"w-full"}
                value={toDate}
                onChange={onToDateChange}
              />
            </section>
            <section className="w-full">
              <label htmlFor="transaction-type">Transaction type</label>
              <Select onValueChange={(value) => setType(value)} value={type}>
                <SelectTrigger className="w-full" id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"select"}>Select type</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </section>
          </section>
          {(fromDate || toDate || type) && (
            <PrimaryButton loading={loading} onClick={handleFilter}>
              Filter
            </PrimaryButton>
          )}
          <TransactionTable transactions={transactions} />
        </section>
      </React.Fragment>
      )
    </main>
  );
};

export default Dashboard;
