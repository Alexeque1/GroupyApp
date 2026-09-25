"use client"

import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react"

const navButtonClass =
  "inline-flex items-center justify-center rounded-full text-black/50 transition-colors duration-200 hover:bg-brand-purple/10 hover:text-brand-purple-deep disabled:pointer-events-none disabled:opacity-30"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar w-full p-0 [--cell-radius:9999px] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
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
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          navButtonClass,
          "size-8 p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          navButtonClass,
          "size-8 p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-8 w-full items-center justify-center",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-8 w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-(--cell-radius)",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-white opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-bold text-black/80",
          captionLayout === "label"
            ? "text-sm"
            : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-black/40",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex w-full", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 select-none rounded-(--cell-radius) text-center text-[0.7rem] font-semibold uppercase tracking-wider text-black/35",
          defaultClassNames.weekday
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
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
          "relative isolate z-0 rounded-l-(--cell-radius) bg-brand-purple/10",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "relative isolate z-0 rounded-r-(--cell-radius) bg-brand-purple/10",
          defaultClassNames.range_end
        ),
        today: cn(defaultClassNames.today),
        outside: cn(
          "text-black/25 aria-selected:text-black/25",
          defaultClassNames.outside
        ),
        disabled: cn("text-black/20 opacity-50", defaultClassNames.disabled),
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
    />
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
        "relative isolate z-10 flex size-full flex-col items-center justify-center gap-0.5 rounded-full border-0 text-sm font-medium leading-none text-black/70 transition-all duration-200 select-none active:scale-90 event-data-[focused=true]/day:relative event-data-[focused=true]/day:z-10 event-data-[focused=true]/day:ring-[3px] event-data-[focused=true]/day:ring-brand-purple/40",
        !isSelected && "hover:bg-brand-purple/10 hover:text-brand-purple-deep",
        modifiers.today && !isSelected && "bg-brand-purple/10 font-bold text-brand-purple-deep",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-brand-purple/10 data-[range-middle=true]:text-black/70",
        "data-[selected-single=true]:scale-105 data-[selected-single=true]:bg-gradient-to-br data-[selected-single=true]:from-brand-purple data-[selected-single=true]:to-brand-purple-deep data-[selected-single=true]:text-white data-[selected-single=true]:shadow-[0_4px_14px_rgba(140,108,255,0.45)]",
        "data-[range-start=true]:bg-gradient-to-br data-[range-start=true]:from-brand-purple data-[range-start=true]:to-brand-purple-deep data-[range-start=true]:text-white",
        "data-[range-end=true]:bg-gradient-to-br data-[range-end=true]:from-brand-purple data-[range-end=true]:to-brand-purple-deep data-[range-end=true]:text-white",
        defaultClassNames.day,
        className
      )}
      {...props}
    >
      {children}
      {modifiers.hasEvent && (
        <span
          className={cn(
            "pointer-events-none h-1 w-1 rounded-full bg-brand-purple shadow-[0_0_6px_rgba(140,108,255,0.6)]",
            isSelected && "bg-white shadow-none"
          )}
        />
      )}
    </button>
  )
}

export { Calendar, CalendarDayButton }
