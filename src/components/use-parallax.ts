'use client'

import * as React from 'react'
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from 'framer-motion'

/**
 * Returns a smoothed scroll progress MotionValue for the whole page.
 * Useful for parallax effects tied to page scroll.
 */
export function usePageScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  })
  return smooth
}

/**
 * Parallax hook: given a section ref, returns a Y motion value that moves
 * the element as the section scrolls through the viewport.
 * @param offset How far to move in px (positive = moves down slower than scroll)
 */
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  offset: number = 80
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  return useSpring(y, { stiffness: 100, damping: 30 })
}

/**
 * Mouse-tracking hook that returns MotionValues (not plain numbers).
 * Returns normalized (-0.5..0.5) mouse position relative to the element.
 * Use with useTransform to derive tilt/glow effects.
 */
export function useMouseMotionValues(
  ref: React.RefObject<HTMLElement | null>
): { x: MotionValue<number>; y: MotionValue<number> } {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
      })
    }
    const onLeave = () => {
      x.set(0)
      y.set(0)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, x, y])

  return { x, y }
}

/**
 * Legacy hook kept for backwards compatibility — returns plain numbers.
 * Prefer useMouseMotionValues for framer-motion integrations.
 */
export function useMousePosition(ref: React.RefObject<HTMLElement | null>) {
  const { x, y } = useMouseMotionValues(ref)
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  React.useEffect(() => {
    const update = () => setPos({ x: x.get(), y: y.get() })
    const ux = x.on('change', update)
    const uy = y.on('change', update)
    return () => {
      ux()
      uy()
    }
  }, [x, y])
  return pos
}
