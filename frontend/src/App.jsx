import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "@/components/layout/Header";
import Home from "@/pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAccount } from "./redux/actions/user.action";
import AddCategory from "./pages/category/AddCategory";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import AddTransaction from "./pages/transaction/AddTransaction";
import { fetchCategories } from "./redux/actions/category.action";
import Dashboard from "./pages/transaction/Dashboard";
import AuthRoute from "./components/middleware/AuthRoute";
import Categories from "./pages/category/Categories";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/notfound/NotFound";

const App = () => {
  const dispatch = useDispatch();
  const { error: userError, message: userMessage } = useSelector(
    (state) => state.user,
  );
  const { error: categoryError, message: categoryMessage } = useSelector(
    (state) => state.category,
  );
  const { error: transactionError, message: transactionMessage } = useSelector(
    (state) => state.transaction,
  );

  React.useEffect(() => {
    dispatch(fetchMyAccount());
    dispatch(fetchCategories());
  }, []);

  React.useEffect(() => {
    if (userError) {
      toast.error(userError);
      dispatch({ type: "CE" });
    }
    if (userMessage) {
      toast.success(userMessage);
      dispatch({ type: "CM" });
    }

    if (categoryError) {
      toast.error(categoryError);
      dispatch({ type: "CE" });
    }
    if (categoryMessage) {
      toast.success(categoryMessage);
      dispatch({ type: "CM" });
    }

    if (transactionError) {
      toast.error(transactionError);
      dispatch({ type: "CE" });
    }
    if (transactionMessage) {
      toast.success(transactionMessage);
      dispatch({ type: "CM" });
    }
  }, [
    dispatch,
    userError,
    userMessage,
    categoryError,
    categoryMessage,
    transactionError,
    transactionMessage,
  ]);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/add-category" element={<AddCategory />} />

        <Route exact path="/add-transaction" element={<AddTransaction />} />

        <Route
          exact
          path="/categories"
          element={
            <AuthRoute>
              <Categories />
            </AuthRoute>
          }
        />

        <Route
          exact
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />

        <Route
          exact
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-center" />
    </React.Fragment>
  );
};

export default App;
