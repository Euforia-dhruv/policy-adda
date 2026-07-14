import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Icon } from './icons'

interface ToastItem {
  id: number
  message: string
}

const ToastContext = createContext<(message: string) => void>(() => {})

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const idRef = useRef(0)

  const showToast = useCallback((message: string) => {
    const id = ++idRef.current
    setToasts((prev) => [...prev, { id, message }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl bg-elevated px-4 py-3 text-ivory shadow-lift animate-fade-up"
            role="status"
          >
            <span className="mt-0.5 text-cobalt-light">
              <Icon name="check" size={20} />
            </span>
            <p className="text-sm font-medium leading-snug">{t.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
