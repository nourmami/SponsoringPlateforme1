import { cva, VariantProps } from 'class-variance-authority'

export function Input({ className, label, suffix, ...rest }: Props) {
  const id = label.toLowerCase().replace(' ', '-')
  return (
    <div className="py-2 flex flex-col space-y-2">
      <label htmlFor={id} className="text-xs font-semibold">
        {label}
      </label>
      <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-[3px] focus-within:ring-primary-800/50 duration-300">
        <input
          className={inputStyles({ hasSuffix: !!suffix }) + ' ' + className}
          {...rest}
          id={id}
        />
        <div className="relative -z-10">{suffix}</div>
      </div>
    </div>
  )
}

const inputStyles = cva('focus:outline-none', {
  variants: {
    hasSuffix: {
      true: 'flex-1',
      false: 'w-full',
    },
  },
  defaultVariants: {
    hasSuffix: false,
  },
})

interface Props
  extends VariantProps<typeof inputStyles>,
    React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  suffix?: React.ReactNode
}
