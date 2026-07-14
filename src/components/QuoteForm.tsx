import { useId, useState, type FormEvent } from 'react'
import { products } from '../data/products'
import { branches } from '../data/branches'
import { useToast } from './Toast'
import { Icon } from './icons'

const insuranceOptions = [
  { value: 'loan', label: 'Loan enquiry' },
  ...products.map((p) => ({ value: p.id, label: p.name })),
]

const initialState = {
  product: '',
  name: '',
  mobile: '',
  branch: '',
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
      productLabel:
        insuranceOptions.find((o) => o.value === values.product)?.label ??
        values.product,
      branchLabel:
        branches.find((b) => b.id === values.branch)?.city ?? values.branch,
      submittedAt: new Date().toISOString(),
    }
    console.log('[Policy Adda] New enquiry:', payload)
    toast(
      `Thanks ${values.name.split(' ')[0]}! Our ${branches.find((b) => b.id === values.branch)?.city} desk will call you shortly.`,
    )
    setValues(initialState)
  }

  const field =
    'w-full rounded-xl border border-ink/15 bg-paper px-3.5 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-clay'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`rounded-blob bg-sand p-5 shadow-card sm:p-6 ${
        compact ? '' : 'lg:p-7'
      }`}
      aria-label="Get a free quote"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-clay text-paper">
          <Icon name="spark" size={18} />
        </span>
        <p className="font-display text-lg font-semibold">
          Get a free, no-pressure quote
        </p>
      </div>

      <div className="grid gap-4">
        <div>
          <label
            htmlFor={`${baseId}-product`}
            className="mb-1.5 block text-sm font-medium text-ink-soft"
          >
            What do you need?
          </label>
          <select
            id={`${baseId}-product`}
            value={values.product}
            onChange={(e) => update('product', e.target.value)}
            aria-invalid={!!errors.product}
            aria-describedby={errors.product ? `${baseId}-product-err` : undefined}
            className={field}
          >
            <option value="">Select insurance or loan…</option>
            {insuranceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.product && (
            <p id={`${baseId}-product-err`} className="mt-1 text-xs text-clay-dark">
              {errors.product}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${baseId}-name`}
              className="mb-1.5 block text-sm font-medium text-ink-soft"
            >
              Your name
            </label>
            <input
              id={`${baseId}-name`}
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="e.g. Amit Kumar"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${baseId}-name-err` : undefined}
              className={field}
            />
            {errors.name && (
              <p id={`${baseId}-name-err`} className="mt-1 text-xs text-clay-dark">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${baseId}-mobile`}
              className="mb-1.5 block text-sm font-medium text-ink-soft"
            >
              Mobile number
            </label>
            <input
              id={`${baseId}-mobile`}
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={values.mobile}
              onChange={(e) => update('mobile', e.target.value)}
              placeholder="10-digit number"
              aria-invalid={!!errors.mobile}
              aria-describedby={
                errors.mobile ? `${baseId}-mobile-err` : undefined
              }
              className={field}
            />
            {errors.mobile && (
              <p id={`${baseId}-mobile-err`} className="mt-1 text-xs text-clay-dark">
                {errors.mobile}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor={`${baseId}-branch`}
            className="mb-1.5 block text-sm font-medium text-ink-soft"
          >
            Nearest branch
          </label>
          <select
            id={`${baseId}-branch`}
            value={values.branch}
            onChange={(e) => update('branch', e.target.value)}
            aria-invalid={!!errors.branch}
            aria-describedby={errors.branch ? `${baseId}-branch-err` : undefined}
            className={field}
          >
            <option value="">Select a branch…</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.city}
                {b.hq ? ' (HQ)' : ''}
              </option>
            ))}
          </select>
          {errors.branch && (
            <p id={`${baseId}-branch-err`} className="mt-1 text-xs text-clay-dark">
              {errors.branch}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-clay px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-clay-dark"
        >
          Request my quote
          <Icon name="arrow" size={18} />
        </button>
        <p className="text-center text-xs text-ink-soft">
          We call back within one working day. No spam, no auto-dialers.
        </p>
      </div>
    </form>
  )
}
