import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Download() {
  return (
    <div className="flex w-full flex-col gap-y-5">
      <RadioGroup className="grid grid-cols-3 gap-2">
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-default has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <RadioGroupItem
            value="agent_call_activity"
            id="agent_call_activity"
            className="data-[state=checked]:border-default data-[state=checked]:bg-default data-[state=checked]:text-white dark:data-[state=checked]:border-default dark:data-[state=checked]:bg-default absolute"
          />
          <div className="flex flex-col gap-4 font-normal justify-center p-2 w-full">
            <Icon
              icon={"heroicons-outline:user-group"}
              className="w-10 h-10 m-auto"
            />
            <p className="text-sm font-medium text-center">Debitur</p>
          </div>
        </Label>
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-default has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <RadioGroupItem
            value="rekap_payment"
            id="rekap_payment"
            className="data-[state=checked]:border-default data-[state=checked]:bg-default data-[state=checked]:text-white dark:data-[state=checked]:border-default dark:data-[state=checked]:bg-default absolute"
          />
          <div className="flex flex-col gap-4 font-normal justify-center p-2 w-full">
            <Icon
              icon={"heroicons-outline:phone"}
              className="w-10 h-10 m-auto"
            />
            <p className="text-sm font-medium text-center">
              Agent Call Activity
            </p>
          </div>
        </Label>
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-default has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <RadioGroupItem
            value="debitur"
            id="debitur"
            className="data-[state=checked]:border-default data-[state=checked]:bg-default data-[state=checked]:text-white dark:data-[state=checked]:border-default dark:data-[state=checked]:bg-default absolute"
          />
          <div className="flex flex-col gap-4 font-normal justify-center p-2 w-full">
            <Icon
              icon={"heroicons-outline:document-text"}
              className="w-10 h-10 m-auto"
            />
            <p className="text-sm font-medium text-center">Rekap Payment</p>
          </div>
        </Label>
      </RadioGroup>
      <div className="flex justify-end gap-x-2 items-center">
        <Button>Download</Button>
      </div>
    </div>
  );
}
