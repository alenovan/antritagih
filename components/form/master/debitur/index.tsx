import {
  createDebiturAction,
  updateDebiturAction,
} from "@/actions/master/debitur";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { debiturSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/site/combobox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id as ID } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

interface DebiturFormProps {
  onClose: () => void;
  initialData?: Debitur | null;
  mode: "create" | "update";
  clients: Client[];
}

export default function DebiturForm({
  onClose,
  initialData,
  mode,
  clients,
}: DebiturFormProps) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof debiturSchema>>({
    resolver: zodResolver(debiturSchema),
    defaultValues: {
      client_id: initialData?.client_id || 0,
      account_number: initialData?.account_number || "",
      identity_number: initialData?.identity_number || "",
      product_type: initialData?.product_type || "",
      fee: initialData?.fee || 0,
      name: initialData?.name || "",
      mobile_phone: initialData?.mobile_phone || "",
      email: initialData?.email || "",
      address: initialData?.address || "",
      province: initialData?.province || "",
      gender: initialData?.gender || "",
      mariage_status: initialData?.mariage_status || "",
      spouse_name: initialData?.spouse_name || "",
      profession: initialData?.profession || "",
      emergency_contact: initialData?.emergency_contact || "",
      emergency_phone1: initialData?.emergency_phone1 || "",
      emergency_phone2: initialData?.emergency_phone2 || "",
      company_name: initialData?.company_name || "",
      asset_desc: initialData?.asset_desc || "",
      asset_category: initialData?.asset_category || "",
      license_plate: initialData?.license_plate || "",
      color: initialData?.color || "",
      manufacturing_year: initialData?.manufacturing_year || 0,
      next_installment_number: initialData?.next_installment_number || 0,
      last_paid_date: initialData?.last_paid_date
        ? new Date(initialData.last_paid_date)
        : undefined,
      last_paid_due_date: initialData?.last_paid_due_date
        ? new Date(initialData.last_paid_due_date)
        : undefined,
      due_date: initialData?.due_date
        ? new Date(initialData.due_date)
        : undefined,
      zone: initialData?.zone || "",
      tenur: initialData?.tenur || 0,
      branch_location: initialData?.branch_location || "",
      installment_amount: initialData?.installment_amount || 0,
      total_debt: initialData?.total_debt || 0,
      remaining_debt: initialData?.remaining_debt || 0,
      status: initialData?.status || 0,
      call_status: initialData?.call_status || "",
      payment_status: initialData?.payment_status || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof debiturSchema>) => {
    setIsPending(true);
    const res =
      mode === "create"
        ? await createDebiturAction(data)
        : await updateDebiturAction(initialData?.id as number, data);

    if (res.status) {
      toast.success(res.message);
      onClose();
    } else {
      toast.error(res.message);
    }
    setIsPending(false);
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-5"
      >
        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <FormControl>
                <Combobox
                  data={clients.map((x) => {
                    return { label: x.name, value: x.id };
                  })}
                  field={field}
                  form={form}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="account_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter Account Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="identity_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identity Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter Identity Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="product_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter Product Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fee</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter Fee" {...field} />
              </FormControl>
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
                <Input placeholder="Enter Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobile_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter Mobile Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Input placeholder="Enter Province" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mariage_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mariage Status</FormLabel>
              <FormControl>
                <Input placeholder="Enter Mariage Status" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="spouse_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spouse Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Spouse Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <FormControl>
                <Input placeholder="Enter Profession" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergency_contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact</FormLabel>
              <FormControl>
                <Input placeholder="Enter Emergency Contact" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergency_phone1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Phone 1</FormLabel>
              <FormControl>
                <Input placeholder="Enter Emergency Phone 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergency_phone2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Phone 2</FormLabel>
              <FormControl>
                <Input placeholder="Enter Emergency Phone 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="asset_desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter Asset Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="asset_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter Asset Category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="license_plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Plate</FormLabel>
              <FormControl>
                <Input placeholder="Enter License Plate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Enter Color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="manufacturing_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manufacturing Year</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Manufacturing Year"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="next_installment_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Next Installment Number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Next Installment Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_paid_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last Paid Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "md:py-2 md:px-3 h-9 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ID })
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_paid_due_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last Paid Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "md:py-2 md:px-3 h-9 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ID })
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "md:py-2 md:px-3 h-9 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ID })
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zone</FormLabel>
              <FormControl>
                <Input placeholder="Enter Zone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tenur"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tenur</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter Tenur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="branch_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter Branch Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="installment_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Installment Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Installment Amount"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="total_debt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Debt</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Total Debt"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remaining_debt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remaining Debt</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Remaining Debt"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="call_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Call Status</FormLabel>
              <FormControl>
                <Input placeholder="Enter Call Status" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payment_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Status</FormLabel>
              <FormControl>
                <Input placeholder="Enter Payment Status" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-x-2 items-center">
          <Button disabled={isPending} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
