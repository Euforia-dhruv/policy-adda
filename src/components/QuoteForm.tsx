import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { products } from '../data/products'
import { branches } from '../data/branches'
import { useToast } from './Toast'
import { Icon } from './icons'
import { Button } from './ui'

const insuranceOptions = [
  { value: 'loan', label: 'Loan enquiry' },
  ...products.map((p) => ({ value: p.id, label: p.name })),
]

const initialState = { product: '', name: '', mobile: '', branch: '' }

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="pointer-events-none absolute left-4 top-4 text-sm text-ink-soft transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-clay-dark peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
    >
      {children}
    </label>
  )
}

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const toast = useToast()
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const baseId = useId()

  const update = (key: keyof typeof initialState, value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!values.product) next.product = 'Please choose what you need.'
    if (!values.name.trim()) next.name = 'Please tell us your name.'
    if (!/^[6-9]\d{9}$/.test(values.mobile.trim()))
      next.mobile = 'Enter a valid 10-digit Indian mobile number.'
    if (!values.branch) next.branch = 'Pick the branch nearest you.'
    return next
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0]
      document.getElementById(`${baseId}-${first}`)?.focus()
      return
    }
    const payload = {
      ...values,
      productLabel: insuranceOptions.find((o) => o.value === values.product)?.label ?? values.product,
      branchLabel: branches.find((b) => b.id === values.branch)?.city ?? values.branch,
      submittedAt: new Date().toISOString(),
    }
    console.log('[Policy Adda] New enquiry:', payload)
    toast(
      `Thanks ${values.name.split(' ')[0]}! Our ${branches.find((b) => b.id === values.branch)?.city} desk will call you shortly.`,
    )
    setValues(initialState)
  }

  const fieldBase =
    'peer inset-input w-full rounded-xl px-4 pb-2 pt-5 text-sm text-ink placeholder-transparent transition-colors'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Get a free quote"
      className={`card-raised ${compact ? 'p-6' : 'p-6 sm:p-7'}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-clay text-paper shadow-soft">
          <Icon name="spark" size={20} />
        </span>
        <div>
          <p className="font-display text-xl font-semibold leading-none">Get a free quote</p>
          <p className="mt-1 text-xs text-ink-soft">No pressure. No spam. One working day.</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <div className="relative">
            <select
              id={`${baseId}-product`}
              value={values.product}
              onChange={(e) => update('product', e.target.value)}
              aria-invalid={!!errors.product}
              aria-describedby={errors.product ? `${baseId}-product-err` : undefined}
              className={`${fieldBase} appearance-none ${errors.product ? 'border-clay-dark' : ''}`}
            >
              <option value="" disabled hidden></option>
              <option value="">Select insurance or loan…</option>
              {insuranceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft">
              <Icon name="arrow" size={16} className="rotate-90" />
            </span>
            <Label htmlFor={`${baseId}-product`}>
              {values.product ? 'Selected' : 'What do you need?'}
            </Label>
          </div>
          {errors.product && (
            <p id={`${baseId}-product-err`} className="mt-1 px-1 text-xs text-clay-dark">
              {errors.product}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="relative">
              <input
                id={`${baseId}-name`}
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder=" "
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${baseId}-name-err` : undefined}
                className={`${fieldBase} ${errors.name ? 'border-clay-dark' : ''}`}
              />
              <Label htmlFor={`${baseId}-name`}>Your name</Label>
            </div>
            {errors.name && (
              <p id={`${baseId}-name-err`} className="mt-1 px-1 text-xs text-clay-dark">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                id={`${baseId}-mobile`}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={values.mobile}
                onChange={(e) => update('mobile', e.target.value)}
                placeholder=" "
                aria-invalid={!!errors.mobile}
                aria-describedby={errors.mobile ? `${baseId}-mobile-err` : undefined}
                className={`${fieldBase} ${errors.mobile ? 'border-clay-dark' : ''}`}
              />
              <Label htmlFor={`${baseId}-mobile`}>Mobile number</Label>
            </div>
            {errors.mobile && (
              <p id={`${baseId}-mobile-err`} className="mt-1 px-1 text-xs text-clay-dark">
                {errors.mobile}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="relative">
            <select
              id={`${baseId}-branch`}
              value={values.branch}
              onChange={(e) => update('branch', e.target.value)}
              aria-invalid={!!errors.branch}
              aria-describedby={errors.branch ? `${baseId}-branch-err` : undefined}
              className={`${fieldBase} appearance-none ${errors.branch ? 'border-clay-dark' : ''}`}
            >
              <option value="" disabled hidden></option>
              <option value="">Select a branch…</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.city}
                  {b.hq ? ' (HQ)' : ''}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft">
              <Icon name="arrow" size={16} className="rotate-90" />
            </span>
            <Label htmlFor={`${baseId}-branch`}>
              {values.branch ? 'Selected' : 'Nearest branch'}
            </Label>
          </div>
          {errors.branch && (
            <p id={`${baseId}-branch-err`} className="mt-1 px-1 text-xs text-clay-dark">
              {errors.branch}
            </p>
          )}
        </div>

        <Button type="submit" icon="arrow" className="mt-1 w-full">
          Request my quote
        </Button>
        <p className="flex items-center justify-center gap-2 text-center text-xs text-ink-soft">
          <Icon name="check" size={14} className="text-pine" />
          We call back within one working day. No auto-dialers.
        </p>
      </div>
    </form>
  )
}
