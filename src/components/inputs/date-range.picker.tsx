import * as React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { useEffect, useState } from 'react';

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dateFrom: ControllerRenderProps<any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dateTo: ControllerRenderProps<any, any>;
}

export function DatePickerWithRange({ className, placeholder, dateFrom, dateTo }: DatePickerWithRangeProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: dateFrom.value ? new Date(dateFrom.value) : undefined,
    to: dateTo.value ? new Date(dateTo.value) : undefined,
  });

  useEffect(() => {
    dateFrom.onChange(date?.from);
    dateTo.onChange(date?.to);
  }, [date]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="text-muted-foreground" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'yyyy-MM-dd')}
                  {' ~ '}
                  {format(date.to, 'yyyy-MM-dd')}
                </>
              ) : (
                format(date.from, 'yyyy-MM-dd')
              )
            ) : (
              <span className="text-muted-foreground">{placeholder ? placeholder : '날짜를 선택하세요'}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
