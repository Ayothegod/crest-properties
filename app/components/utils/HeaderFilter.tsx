import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "~/components/ui/use-toast";
import { filterSchema } from "~/lib/schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLocation } from "@remix-run/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { popoverItems } from "~/lib/data";
import { Checkbox } from "../ui/checkbox";

type filterSchemaInfered = z.infer<typeof filterSchema>;

export default function HeaderFilter() {
  const location = useLocation();
  const homepageUrl = "/";
  const { toast } = useToast();
  const form = useForm<filterSchemaInfered>({
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = (data: filterSchemaInfered) => {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    console.log(data);
    console.log("Hello");
  };

  return (
    <div className={`${location.pathname === homepageUrl && "hidden"} py-4`}>
      <div className="bodySize ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap items-center justify-evenly gap-4"
          >
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex gap-4 w-max">
                        <SelectValue placeholder="Format" className="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rent">m@example.com</SelectItem>
                      <SelectItem value="property">m@google.com</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search location or area"
                      {...field}
                      className="rounded-full w-max"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex gap-4 w-max">
                        <SelectValue placeholder="Property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bungalow">bungalow</SelectItem>
                      <SelectItem value="duplex">duplex</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Minimum price (#)"
                      {...field}
                      type="number"
                      className="rounded-full w-40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxPrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Maximum price (#)"
                      {...field}
                      type="number"
                      className="rounded-full w-40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Filters</Button>
              </PopoverTrigger>

              <PopoverContent className="">
                Hello
              </PopoverContent>
            </Popover>

            <Button type="submit" className="rounded-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

//   {/* <div className="grid gap-4">
//     <div className="space-y-2">
//       <h4 className="font-medium leading-none">Dimensions</h4>
//       <p className="text-sm text-muted-foreground">
//         Set the dimensions for the layer.
//       </p>
//     </div>
//     <div className="grid gap-2">
//       <div className="grid grid-cols-3 items-center gap-4">
//         <Label htmlFor="width">Width</Label>
//         <Input
//           id="width"
//           defaultValue="100%"
//           className="col-span-2 h-8"
//         />
//       </div>
//       <div className="grid grid-cols-3 items-center gap-4">
//         <Label htmlFor="maxWidth">Max. width</Label>
//         <Input
//           id="maxWidth"
//           defaultValue="300px"
//           className="col-span-2 h-8"
//         />
//       </div>
//       <div className="grid grid-cols-3 items-center gap-4">
//         <Label htmlFor="height">Height</Label>
//         <Input
//           id="height"
//           defaultValue="25px"
//           className="col-span-2 h-8"
//         />
//       </div>
//       <div className="grid grid-cols-3 items-center gap-4">
//         <Label htmlFor="maxHeight">Max. height</Label>
//         <Input
//           id="maxHeight"
//           defaultValue="none"
//           className="col-span-2 h-8"
//         />
//       </div>
//     </div>
//   </div> */}
