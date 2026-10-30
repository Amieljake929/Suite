import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import Lenis from 'lenis'

const SmoothScrollContext = createContext(null)

// Momentum ("heavy but smooth") scrolling. Lower lerp = heavier / longer glide.
export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.07, wheelMultiplier: 0.85, touchMultiplier: 1.2 })
    lenisRef.current = lenis
    let id
    const raf = (time) => {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const api = useMemo(
    () => ({
      scrollTo: (el) => {
        const lenis = lenisRef.current
        if (lenis) lenis.scrollTo(el, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) })
        else el?.scrollIntoView({ behavior: 'smooth' })
      },
      stop: () => {
        if (lenisRef.current) lenisRef.current.stop()
        else document.documentElement.style.overflow = 'hidden'
      },
      start: () => {
        if (lenisRef.current) lenisRef.current.start()
        else document.documentElement.style.overflow = ''
      },
    }),
    [],
  )

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSmoothScroll = () => useContext(SmoothScrollContext)
