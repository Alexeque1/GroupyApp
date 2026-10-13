"use client"

import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

const navButtonClass =
  "inline-flex cursor-pointer items-center justify-center rounded-lg border border-black/10 text-black/60 transition-colors duration-200 hover:bg-black/5 hover:text-black disabled:pointer-events-none disabled:opacity-30 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  weekStartsOn = 1,
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames()
  const localeCode = locale?.code ?? "en-US"

  // "days" = calendario normal; "months" = cuadrícula para elegir mes y año
  const [view, setView] = React.useState<"days" | "months">("days")
  const [internalMonth, setInternalMonth] = React.useState<Date>(
    props.month ?? props.defaultMonth ?? new Date()
  )
  const month = props.month ?? internalMonth

  const handleMonthChange = (nextMonth: Date) => {
    setInternalMonth(nextMonth)
    props.onMonthChange?.(nextMonth)
  }

  if (view === "months") {
    return (
      <MonthYearPicker
        month={month}
        startMonth={props.startMonth}
        endMonth={props.endMonth}
        localeCode={localeCode}
        className={className}
        onSelect={(nextMonth) => {
          handleMonthChange(nextMonth)
          setView("days")
        }}
        onClose={() => setView("days")}
      />
    )
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      weekStartsOn={weekStartsOn}
      className={cn(
        "group/calendar w-full p-0 in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(localeCode, { month: "long" }),
        // "Mo", "Tu", "We"...
        formatWeekdayName: (date) =>
          date.toLocaleString(localeCode, { weekday: "short" }).slice(0, 2),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full", defaultClassNames.root),
        months: cn(
          "relative flex w-full flex-col gap-4",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-3", defaultClassNames.month),
        nav: cn(
          "pointer-events-none absolute inset-x-0 top-0 z-20 flex w-full items-center justify-between gap-1 [&>button]:pointer-events-auto",
          defaultClassNames.nav
        ),
        button_previous: cn(
          navButtonClass,
          "size-8 p-0 select-none aria-disabled:opacity-30",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          navButtonClass,
          "size-8 p-0 select-none aria-disabled:opacity-30",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-8 w-full items-center justify-center px-10",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-8 w-full items-center justify-center gap-0.5 text-sm font-semibold",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-md px-1.5 py-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 cursor-pointer bg-white text-black opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none text-sm font-semibold text-black/85 dark:text-white/90",
          captionLayout !== "label" &&
            "flex items-center gap-1 [&>svg]:size-3.5 [&>svg]:text-black/40 dark:[&>svg]:text-white/40",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex w-full", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 select-none pb-1 text-center text-xs font-medium text-black/40 dark:text-white/40",
          defaultClassNames.weekday
        ),
        week: cn("mt-0.5 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-8 select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.7rem] text-black/40 select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full flex-1 basis-0 p-0.5 text-center select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "relative isolate z-0 rounded-l-full bg-brand-purple/10",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "relative isolate z-0 rounded-r-full bg-brand-purple/10",
          defaultClassNames.range_end
        ),
        today: cn(defaultClassNames.today),
        outside: cn(defaultClassNames.outside),
        disabled: cn(defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        CaptionLabel: ({ className, children, ...props }) => {
          if (captionLayout !== "label") {
            return <span className={className} {...props}>{children}</span>
          }

          return (
            <button
              type="button"
              onClick={() => setView("months")}
              className={cn(
                "flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10",
                className
              )}
            >
              {children}
              <ChevronDownIcon className="size-3.5 text-black/40 dark:text-white/40" />
            </button>
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon className={cn("size-4", className)} {...props} />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
      month={month}
      onMonthChange={handleMonthChange}
    />
  )
}

interface MonthYearPickerProps {
  month: Date
  startMonth?: Date
  endMonth?: Date
  localeCode: string
  className?: string
  onSelect: (month: Date) => void
  onClose: () => void
}

function MonthYearPicker({
  month,
  startMonth,
  endMonth,
  localeCode,
  className,
  onSelect,
  onClose,
}: MonthYearPickerProps) {
  const [year, setYear] = React.useState(month.getFullYear())

  // Comparamos meses como "año * 12 + mes" para no lidiar con días ni horas
  const toIndex = (y: number, m: number) => y * 12 + m
  const minIndex = startMonth ? toIndex(startMonth.getFullYear(), startMonth.getMonth()) : -Infinity
  const maxIndex = endMonth ? toIndex(endMonth.getFullYear(), endMonth.getMonth()) : Infinity

  return (
    <div data-slot="calendar" className={cn("flex w-full flex-col gap-3", className)}>
      <div className="flex h-8 items-center justify-between">
        <button
          type="button"
          aria-label="Previous year"
          disabled={toIndex(year, 11) <= minIndex}
          onClick={() => setYear((y) => y - 1)}
          className={cn(navButtonClass, "size-8")}
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-black/85 transition-colors hover:bg-black/5 dark:text-white/90 dark:hover:bg-white/10"
        >
          {year}
          <ChevronUpIcon className="size-3.5 text-black/40 dark:text-white/40" />
        </button>
        <button
          type="button"
          aria-label="Next year"
          disabled={toIndex(year, 0) >= maxIndex}
          onClick={() => setYear((y) => y + 1)}
          className={cn(navButtonClass, "size-8")}
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 12 }, (_, m) => {
          const index = toIndex(year, m)
          const isCurrent = year === month.getFullYear() && m === month.getMonth()

          return (
            <button
              key={m}
              type="button"
              disabled={index < minIndex || index > maxIndex}
              onClick={() => onSelect(new Date(year, m, 1))}
              className={cn(
                "h-14 cursor-pointer rounded-xl text-sm font-medium text-black/80 transition-colors hover:bg-black/5 disabled:pointer-events-none disabled:text-black/20 dark:text-white/85 dark:hover:bg-white/10 dark:disabled:text-white/20",
                isCurrent &&
                  "bg-brand-purple font-semibold text-white shadow-[0_4px_12px_rgba(140,108,255,0.4)] hover:bg-brand-purple dark:text-white dark:hover:bg-brand-purple"
              )}
            >
              {new Date(2000, m, 1).toLocaleString(localeCode, { month: "short" })}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  children,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus({ preventScroll: true })
  }, [modifiers.focused])

  const isSelected =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle

  return (
    <button
      type="button"
      ref={ref}
      data-day={day.date.toISOString().split("T")[0]}
      data-selected-single={isSelected}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative isolate z-10 flex size-full cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full border-0 text-sm font-medium leading-none text-black/80 transition-colors duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 dark:text-white/85",
        !isSelected && "hover:bg-black/5 dark:hover:bg-white/10",
        modifiers.outside && "text-black/25 dark:text-white/25",
        modifiers.today && !isSelected && "font-semibold text-brand-purple dark:text-brand-purple",
        modifiers.disabled && "pointer-events-none text-black/20 dark:text-white/20",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-brand-purple/10",
        "data-[selected-single=true]:bg-brand-purple data-[selected-single=true]:font-semibold data-[selected-single=true]:text-white data-[selected-single=true]:shadow-[0_4px_12px_rgba(140,108,255,0.4)]",
        "data-[range-start=true]:bg-brand-purple data-[range-start=true]:text-white",
        "data-[range-end=true]:bg-brand-purple data-[range-end=true]:text-white",
        defaultClassNames.day,
        className
      )}
      {...props}
    >
      {children}
      {modifiers.hasEvent && (
        <span
          className={cn(
            "pointer-events-none h-1 w-1 rounded-full bg-brand-purple",
            isSelected && "bg-white"
          )}
        />
      )}
      {/* Puntito bajo el día de hoy */}
      {modifiers.today && !modifiers.hasEvent && (
        <span
          className={cn(
            "pointer-events-none absolute bottom-1 h-1 w-1 rounded-full bg-brand-purple",
            isSelected && "bg-white"
          )}
        />
      )}
    </button>
  )
}

export { Calendar, CalendarDayButton }
