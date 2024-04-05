import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "restaurant name is required",
  }),
});

export type SearchData = z.infer<typeof formSchema>;

type props = {
  onSubmit: (formData: SearchData) => void;
  placeholder: string;
  onReset?: () => void;
  searchQuery: string;
};
function SearchBox({ onSubmit, onReset, placeholder, searchQuery }: props) {
  const form = useForm<SearchData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({
      searchQuery,
    });
  }, [form, searchQuery]);

  function handleReset() {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center justify-between gap-3 flex-row border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-seeGreen hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder={placeholder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-full"
        >
          Clear
        </Button>
        <Button type="submit" className="rounded-full bg-seeGreen">
          Search
        </Button>
      </form>
    </Form>
  );
}

export default SearchBox;
