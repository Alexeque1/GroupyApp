"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"))

interface TimePickerProps {
  /** Hora en formato "HH:mm" (24 h), o "" si no hay ninguna */
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}

function TimePicker({ value, onChange, className, placeholder = "Pick a time" }: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const doneRef = React.useRef<HTMLButtonElement>(null)
  const [hour = "", minute = ""] = value ? value.split(":") : []

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          className,
          "flex cursor-pointer items-center justify-between text-left font-normal",
          !value && "text-black/40 dark:text-white/40"
        )}
      >
        {value || <span>{placeholder}</span>}
        <Clock size={16} className="text-black/40 dark:text-white/40" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        // Si el foco va al primer botón ("00"), la lista se desplaza hasta arriba
        initialFocus={doneRef}
        className="w-[220px] gap-3 rounded-2xl bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-black/5 dark:bg-brand-dark dark:ring-white/10"
      >
        <div className="grid grid-cols-2 gap-2">
          <TimeColumn
            label="Hour"
            options={HOURS}
            selected={hour}
            onSelect={(h) => onChange(`${h}:${minute || "00"}`)}
          />
          <TimeColumn
            label="Min"
            options={MINUTES}
            selected={minute}
            onSelect={(m) => onChange(`${hour || "12"}:${m}`)}
          />
        </div>
        <button
          ref={doneRef}
          type="button"
          onClick={() => setOpen(false)}
          className="h-9 cursor-pointer rounded-xl bg-brand-purple text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Done
        </button>
      </PopoverContent>
    </Popover>
  )
}

interface TimeColumnProps {
  label: string
  options: string[]
  selected: string
  onSelect: (value: string) => void
}

function TimeColumn({ label, options, selected, onSelect }: TimeColumnProps) {
  const listRef = React.useRef<HTMLDivElement>(null)

  // Al abrir, centramos la opción elegida en la lista
  React.useEffect(() => {
    const list = listRef.current
    const item = list?.querySelector<HTMLElement>('[data-selected="true"]')
    if (list && item) {
      list.scrollTop = item.offsetTop - list.clientHeight / 2 + item.clientHeight / 2
    }
  }, [])

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-center text-xs font-medium text-black/40 dark:text-white/40">{label}</span>
      <div
        ref={listRef}
        className="relative flex h-48 flex-col gap-0.5 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {options.map((option) => {
          const isSelected = option === selected

          return (
            <button
              key={option}
              type="button"
              data-selected={isSelected}
              onClick={() => onSelect(option)}
              className={cn(
                "h-9 shrink-0 cursor-pointer rounded-lg text-sm font-medium text-black/80 outline-none transition-colors hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-brand-purple/40 dark:text-white/85 dark:hover:bg-white/10",
                isSelected &&
                  "bg-brand-purple font-semibold text-white hover:bg-brand-purple dark:text-white dark:hover:bg-brand-purple"
              )}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { TimePicker }
