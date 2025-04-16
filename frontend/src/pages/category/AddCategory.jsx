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
import { useDispatch } from "react-redux";
import { addCategory, fetchCategories } from "@/redux/actions/category.action";

const AddCategorySchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a type string.",
    })
    .min(1, "Name is required."),

  type: z
    .string({ required_error: "Type is required." })
    .refine((val) => val === "income" || val === "expense", {
      message: "Please select a valid type.",
    }),
});

const AddCategory = () => {
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(AddCategorySchema),
    defaultValues: { name: "", type: "" },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    await dispatch(addCategory(values));
    await dispatch(fetchCategories());
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
                Add New Category
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type={"text"}
                      placeholder={"Enter name"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PrimaryButton type="submit" loading={loading}>
              Add Category
            </PrimaryButton>
          </form>
        </Form>
      </FormContailer>
    </main>
  );
};

export default AddCategory;
