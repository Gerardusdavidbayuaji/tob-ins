import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  onChange: (date: Date | undefined) => void;
  value: string | undefined;
  label: string;
}

const DatePicker = (props: DatePickerProps) => {
  const { label, value, onChange } = props;
  const parsedDate = value ? new Date(value) : undefined;

  return (
    <div className="flex flex-col">
      <label className="text-xs mt-b ml-1">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal text-xs text-gray-700"
          >
            {parsedDate ? format(parsedDate, "PPP") : <span>{label}</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={parsedDate}
            onSelect={(selected) => {
              if (selected) {
                onChange(selected);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
