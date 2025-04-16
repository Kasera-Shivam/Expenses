import React from "react";
import FormContailer from "@/components/form/FormContailer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PrimaryButton from "@/components/form/PrimaryButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { addTransaction } from "@/redux/actions/transaction.action";

const AddTransactionSchema = z.object({
  type: z
    .string({ required_error: "Type is required." })
    .refine((val) => val === "income" || val === "expense", {
      message: "Please select a valid type.",
    }),

  amount: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "Amount must be a number." })
      .positive("Amount must be greater than 0"),
  ),

  category: z
    .string({ required_error: "Category is required." })
    .default("Uncategorized"),

  date: z.preprocess(
    (val) =>
      typeof val === "string" || val instanceof Date ? new Date(val) : val,
    z.date().max(new Date(), "Date cannot be in the future."),
  ),

  description: z
    .string({ required_error: "Description is required." })
    .optional(),
});

const AddTransaction = () => {
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const form = useForm({
    resolver: zodResolver(AddTransactionSchema),
    defaultValues: {
      type: "",
      amount: 0,
      category: "Uncategorized",
      date: new Date(),
      description: "",
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    await dispatch(addTransaction(values));
    setLoading(false);
  };

  return (
    <main className="flex h-auto w-screen max-w-full justify-center py-12">
      <FormContailer>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex h-auto w-full flex-col gap-y-4"
          >
            <section className="flex flex-col justify-center gap-y-1">
              <h1 className="text-center text-2xl font-semibold">
                Transaction Details
              </h1>
              <p className="text-center text-xs">Fill in the details below.</p>
            </section>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel className={"w-fit"}>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className={"w-full"}
                  >
                    <FormControl>
                      <SelectTrigger className={"w-full"}>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className={"w-full"}>
                      <SelectItem value="income" className={"cursor-pointer"}>
                        Income
                      </SelectItem>
                      <SelectItem value="expense" className={"cursor-pointer"}>
                        Expense
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type={"number"}
                      placeholder={"Enter amount"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel className={"w-fit"}>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className={"w-full"}
                  >
                    <FormControl>
                      <SelectTrigger className={"w-full"}>
                        <SelectValue value={field.value}>
                          {field.value}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className={"w-full"}>
                      <SelectItem value={"Uncategorized"}>
                        {"Uncategorized"}
                      </SelectItem>
                      {categories.map((obj) => (
                        <SelectItem
                          value={obj.name}
                          className={"cursor-pointer"}
                        >
                          {obj.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type={"date"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      type={"text"}
                      placeholder={"Write description..."}
                      {...field}
                      className={"h-24 resize-none"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PrimaryButton type="submit" loading={loading}>
              Add Transaction
            </PrimaryButton>
          </form>
        </Form>
      </FormContailer>
    </main>
  );
};

export default AddTransaction;
