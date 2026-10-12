import {
  createElement,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ForwardedRef,
} from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native'

export const ReduceMotion = {
  System: 'system',
  Always: 'always',
  Never: 'never',
}

type EasingFunction = (value: number) => number

// Layout animations (`entering`, `exiting`) as Reanimated 3 plays them on the
// web (layoutReanimation/web/animation/*.web.ts): CSS keyframes, 300 ms and
// linear unless the builder says otherwise.
const LAYOUT_KEYFRAMES: Record<string, Keyframe[]> = {
  FadeIn: [{ opacity: 0 }, { opacity: 1 }],
  FadeInUp: [
    { opacity: 0, transform: 'translateY(-25px)' },
    { opacity: 1, transform: 'translateY(0px)' },
  ],
  FadeOut: [{ opacity: 1 }, { opacity: 0 }],
  FadeOutUp: [
    { opacity: 1, transform: 'translateY(0px)' },
    { opacity: 0, transform: 'translateY(-25px)' },
  ],
  SlideInUp: [{ transform: 'translateY(-100vh)' }, { transform: 'translateY(0%)' }],
  SlideInDown: [{ transform: 'translateY(100vh)' }, { transform: 'translateY(0%)' }],
}

type LayoutConfig = {
  duration?: number
  delay?: number
  easing?: EasingFunction
  reduceMotion?: string
}

type LayoutAnimation = {
  __coinLayout: string
  config: LayoutConfig
}

function layoutAnimation(name: string, config: LayoutConfig = {}): LayoutAnimation {
  const target: LayoutAnimation = { __coinLayout: name, config }
  const next = (patch: LayoutConfig) => layoutAnimation(name, { ...config, ...patch })
  return new Proxy(target, {
    get: (object, key) => {
      if (typeof key === 'symbol' || key === 'then') return undefined
      if (key in object) return object[key as keyof LayoutAnimation]
      switch (key) {
        case 'duration':
          return (duration: number) => next({ duration })
        case 'delay':
          return (delay: number) => next({ delay })
        case 'easing':
          return (easing: EasingFunction | { factory: () => EasingFunction }) =>
            next({ easing: typeof easing === 'function' ? easing : easing.factory() })
        case 'reduceMotion':
          return (reduceMotion: string) => next({ reduceMotion })
        default:
          // Builder methods the web doesn't play (springify, withCallback, …).
          return () => next({})
      }
    },
  })
}

export const FadeIn = layoutAnimation('FadeIn')
export const FadeInUp = layoutAnimation('FadeInUp')
export const FadeOut = layoutAnimation('FadeOut')
export const FadeOutUp = layoutAnimation('FadeOutUp')
export const SlideInDown = layoutAnimation('SlideInDown')
export const SlideInUp = layoutAnimation('SlideInUp')

function isLayoutAnimation(value: unknown): value is LayoutAnimation {
  return typeof value === 'object' && value !== null && '__coinLayout' in value
}

// A JS easing as a CSS linear() curve, sampled finely enough to match it.
function cssEasing(easing?: EasingFunction) {
  if (!easing) return 'linear'
  const points = Array.from({ length: 41 }, (_, step) => easing(step / 40).toFixed(4))
  return `linear(${points.join(', ')})`
}

function playLayoutAnimation(
  element: HTMLElement,
  animation: LayoutAnimation,
  fill: FillMode,
) {
  const frames = LAYOUT_KEYFRAMES[animation.__coinLayout]
  const { config } = animation
  const reduceMotion = config.reduceMotion ?? ReduceMotion.System
  const reduced =
    reduceMotion === ReduceMotion.Always ||
    (reduceMotion === ReduceMotion.System &&
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches)
  if (!frames || reduced || typeof element.animate !== 'function') return null
  return element.animate(frames, {
    duration: config.duration ?? 300,
    delay: config.delay ?? 0,
    easing: cssEasing(config.easing),
    fill,
  })
}

// Reanimated keeps an exiting view on screen by moving it into a copy placed
// where it was, inside its offset parent, and animating the copy away.
function playExit(element: HTMLElement, animation: LayoutAnimation) {
  const parent = element.offsetParent
  if (!(parent instanceof HTMLElement) || !element.isConnected) return
  const copy = element.cloneNode(true) as HTMLElement
  copy.removeAttribute('role')
  copy.setAttribute('aria-hidden', 'true')
  Object.assign(copy.style, {
    position: 'absolute',
    top: `${element.offsetTop}px`,
    left: `${element.offsetLeft}px`,
    width: `${element.offsetWidth}px`,
    height: `${element.offsetHeight}px`,
    margin: '0',
    pointerEvents: 'none',
  })
  parent.appendChild(copy)
  const playing = playLayoutAnimation(copy, animation, 'forwards')
  if (!playing) {
    copy.remove()
    return
  }
  playing.onfinish = () => copy.remove()
  playing.oncancel = () => copy.remove()
}

const AnimatedView = forwardRef(function AnimatedView(
  { entering, exiting, layout: _layout, ...props }: Record<string, unknown>,
  forwardedRef: ForwardedRef<unknown>,
) {
  const node = useRef<HTMLElement | null>(null)
  const exit = useRef(exiting)
  exit.current = exiting
  const setRef = useCallback(
    (value: HTMLElement | null) => {
      node.current = value
      if (typeof forwardedRef === 'function') forwardedRef(value)
      else if (forwardedRef) forwardedRef.current = value
    },
    [forwardedRef],
  )

  useLayoutEffect(() => {
    const element = node.current
    if (element && isLayoutAnimation(entering)) {
      playLayoutAnimation(element, entering, 'backwards')
    }
    return () => {
      if (element && isLayoutAnimation(exit.current)) playExit(element, exit.current)
    }
    // Entering plays once, on mount; exiting once, on unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return createElement(View as never, { ...props, ref: setRef })
})

// Reanimated's cubic Bézier easing: find the curve's t for x, then return y(t).
function bezierFn(x1: number, y1: number, x2: number, y2: number): EasingFunction {
  const at = (t: number, p1: number, p2: number) =>
    3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t
  return (value: number) => {
    if (value <= 0 || value >= 1) return value
    let low = 0
    let high = 1
    for (let step = 0; step < 24; step++) {
      const t = (low + high) / 2
      if (at(t, x1, x2) < value) low = t
      else high = t
    }
    return at((low + high) / 2, y1, y2)
  }
}

export const Easing = {
  linear: (value: number) => value,
  ease: bezierFn(0.42, 0, 1, 1),
  quad: (value: number) => value * value,
  cubic: (value: number) => value * value * value,
  bezier: (x1: number, y1: number, x2: number, y2: number) => ({
    factory: () => bezierFn(x1, y1, x2, y2),
  }),
  bezierFn,
  in: (easing: EasingFunction) => easing,
  out: (easing: EasingFunction) => (value: number) => 1 - easing(1 - value),
  inOut: (easing: EasingFunction) => (value: number) =>
    value < 0.5 ? easing(value * 2) / 2 : 1 - easing((1 - value) * 2) / 2,
}

// Reanimated 3's withSpring defaults.
const SPRING_DEFAULTS = {
  damping: 10,
  mass: 1,
  stiffness: 100,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
  velocity: 0,
}

type SpringConfig = typeof SPRING_DEFAULTS

type AnimationDescriptor<T> = {
  to: T
  callback?: (finished: boolean) => void
  // withRepeat: run `count` times (0 or less: for ever), reversing each time
  // when `reverse`, otherwise starting again from the first value.
  repeat?: { count: number; reverse: boolean }
} & (
  | { __coinAnimation: 'timing'; duration: number; easing: EasingFunction }
  | { __coinAnimation: 'spring'; config: SpringConfig }
)

interface WebSharedValue<T> {
  value: T
  __cancel?: () => void
  __subscribe?: (listener: () => void) => () => void
}

// The shared values an animated style reads while it is computed, so the
// component using the style can follow them (Reanimated tracks the same).
let reading: Set<WebSharedValue<unknown>> | null = null

function isAnimationDescriptor<T>(
  value: T | AnimationDescriptor<T>,
): value is AnimationDescriptor<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    '__coinAnimation' in value
  )
}

// One frame of Reanimated 3's spring (animation/spring.ts and springUtils.ts):
// position and velocity `seconds` after `current`, moving at `velocity`.
function springStep(
  config: SpringConfig,
  to: number,
  current: number,
  velocity: number,
  seconds: number,
) {
  const zeta = config.damping / (2 * Math.sqrt(config.stiffness * config.mass))
  const omega0 = Math.sqrt(config.stiffness / config.mass)
  const v0 = -velocity
  const x0 = to - current

  if (zeta < 1) {
    const omega1 = omega0 * Math.sqrt(1 - zeta ** 2)
    const sin1 = Math.sin(omega1 * seconds)
    const cos1 = Math.cos(omega1 * seconds)
    const envelope = Math.exp(-zeta * omega0 * seconds)
    const frag =
      envelope * (sin1 * ((v0 + zeta * omega0 * x0) / omega1) + x0 * cos1)
    return {
      position: to - frag,
      velocity:
        zeta * omega0 * frag -
        envelope * (cos1 * (v0 + zeta * omega0 * x0) - omega1 * x0 * sin1),
    }
  }

  const envelope = Math.exp(-omega0 * seconds)
  return {
    position: to - envelope * (x0 + (v0 + omega0 * x0) * seconds),
    velocity:
      envelope * (v0 * (seconds * omega0 - 1) + seconds * x0 * omega0 * omega0),
  }
}

export const useSharedValue = <T,>(initialValue: T): WebSharedValue<T> => {
  const currentValue = useRef(initialValue)
  const currentVelocity = useRef(0)
  const frame = useRef<number | null>(null)
  const [, render] = useState(0)
  const sharedValue = useRef<WebSharedValue<T> | null>(null)
  const listeners = useRef(new Set<() => void>())
  // Re-render the owner and every component whose animated style reads it.
  const changed = () => {
    render((version) => version + 1)
    listeners.current.forEach((listener) => listener())
  }

  const cancel = () => {
    if (frame.current !== null && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(frame.current)
    }
    frame.current = null
  }

  if (sharedValue.current === null) {
    const value = {} as WebSharedValue<T>

    Object.defineProperty(value, 'value', {
      enumerable: true,
      get: () => {
        reading?.add(value as WebSharedValue<unknown>)
        return currentValue.current
      },
      set: (nextValue: T | AnimationDescriptor<T>) => {
        // A spring that takes over a running spring keeps its velocity.
        const startVelocity = frame.current === null ? 0 : currentVelocity.current
        cancel()
        currentVelocity.current = 0

        if (
          !isAnimationDescriptor(nextValue) ||
          typeof currentValue.current !== 'number' ||
          typeof nextValue.to !== 'number' ||
          typeof requestAnimationFrame !== 'function'
        ) {
          currentValue.current = (
            isAnimationDescriptor(nextValue) ? nextValue.to : nextValue
          ) as T
          changed()
          if (isAnimationDescriptor(nextValue)) {
            nextValue.callback?.(true)
          }
          return
        }

        const animation = nextValue
        let from = currentValue.current as number
        let to = animation.to as number
        let startedAt =
          typeof performance === 'undefined' ? Date.now() : performance.now()
        let lastFrameAt = startedAt
        let runs = 1
        if (animation.__coinAnimation === 'spring') {
          currentVelocity.current = startVelocity || animation.config.velocity
        }

        const tick = (now: number) => {
          let finished: boolean

          if (animation.__coinAnimation === 'timing') {
            const progress =
              animation.duration > 0
                ? Math.min(1, Math.max(0, now - startedAt) / animation.duration)
                : 1
            currentValue.current = (from +
              (to - from) * animation.easing(progress)) as T
            finished = progress >= 1
          } else {
            const { config } = animation
            const seconds = Math.min(Math.max(0, now - lastFrameAt), 64) / 1000
            lastFrameAt = now
            const next = springStep(
              config,
              to,
              currentValue.current as number,
              currentVelocity.current,
              seconds,
            )
            currentValue.current = next.position as T
            currentVelocity.current = next.velocity
            const overshooting =
              config.overshootClamping &&
              ((next.position > to && from < to) ||
                (next.position < to && from > to))
            finished =
              overshooting ||
              (Math.abs(next.velocity) < config.restSpeedThreshold &&
                Math.abs(to - next.position) < config.restDisplacementThreshold)
          }

          const { repeat } = animation
          if (finished && repeat && (repeat.count <= 0 || runs < repeat.count)) {
            // withRepeat: go back the other way, or start again from the
            // first value, and keep running.
            runs += 1
            if (repeat.reverse) [from, to] = [to, from]
            currentValue.current = from as T
            currentVelocity.current = 0
            startedAt = now
            lastFrameAt = now
            changed()
            frame.current = requestAnimationFrame(tick)
            return
          }

          if (finished) {
            currentValue.current = to as T
            currentVelocity.current = 0
            frame.current = null
            changed()
            animation.callback?.(true)
            return
          }

          changed()
          frame.current = requestAnimationFrame(tick)
        }

        frame.current = requestAnimationFrame(tick)
      },
    })

    value.__cancel = cancel
    value.__subscribe = (listener) => {
      listeners.current.add(listener)
      return () => {
        listeners.current.delete(listener)
      }
    }
    sharedValue.current = value
  }

  useEffect(() => cancel, [])

  return sharedValue.current
}

// Computes the style on every render and re-renders whenever a shared value it
// read changes, including one owned by another component (Skeleton reads its
// group's clock), as Reanimated updates the view on every frame.
const useTrackedFactory = (factory: () => object) => {
  const [, render] = useState(0)
  const previous = reading
  const read = new Set<WebSharedValue<unknown>>()
  reading = read
  let result: object
  try {
    result = factory()
  } finally {
    reading = previous
  }

  useEffect(() => {
    const update = () => render((version) => version + 1)
    const stops = [...read].map((value) => value.__subscribe?.(update))
    return () => stops.forEach((stop) => stop?.())
  })

  return result
}

export const useAnimatedStyle = (factory: () => object) => useTrackedFactory(factory)
export const useAnimatedProps = (factory: () => object) => useTrackedFactory(factory)
export const useAnimatedScrollHandler = () => () => undefined
export const useAnimatedKeyboard = () => ({
  height: { value: 0 },
  state: { value: 0 },
})
export const withTiming = <T,>(
  value: T,
  config?: {
    duration?: number
    easing?: EasingFunction | { factory: () => EasingFunction }
  },
  callback?: (finished: boolean) => void,
) =>
  ({
    __coinAnimation: 'timing',
    to: value,
    duration: config?.duration ?? 300,
    easing:
      config?.easing === undefined
        ? Easing.inOut(Easing.quad)
        : typeof config.easing === 'function'
          ? config.easing
          : config.easing.factory(),
    callback,
  }) as T
export const withSpring = <T,>(
  value: T,
  config?: Partial<SpringConfig>,
  callback?: (finished: boolean) => void,
) =>
  ({
    __coinAnimation: 'spring',
    to: value,
    config: { ...SPRING_DEFAULTS, ...config },
    callback,
  }) as T
// Reanimated's withRepeat: 2 runs by default; 0 or less repeats for ever.
export const withRepeat = <T,>(
  animation: T,
  numberOfReps = 2,
  reverse = false,
  callback?: (finished: boolean) => void,
) =>
  (isAnimationDescriptor(animation)
    ? {
        ...animation,
        repeat: { count: numberOfReps, reverse },
        callback: callback ?? animation.callback,
      }
    : animation) as T
export const cancelAnimation = <T,>(value: WebSharedValue<T>) =>
  value.__cancel?.()
export const runOnJS = <T extends (...args: never[]) => unknown>(fn: T) => fn

export const Extrapolation = {
  IDENTITY: 'identity',
  CLAMP: 'clamp',
  EXTEND: 'extend',
} as const

type ExtrapolationType = (typeof Extrapolation)[keyof typeof Extrapolation]

// Reanimated's interpolate: piecewise linear, extending past the input range
// unless told to clamp or return the input.
export const interpolate = (
  value: number,
  input: readonly number[],
  output: readonly number[],
  extrapolation?:
    | ExtrapolationType
    | { extrapolateLeft?: ExtrapolationType; extrapolateRight?: ExtrapolationType },
) => {
  const last = input.length - 1
  const outside = value < input[0] ? 'left' : value > input[last] ? 'right' : null
  const type =
    typeof extrapolation === 'object'
      ? outside === 'left'
        ? extrapolation.extrapolateLeft
        : extrapolation.extrapolateRight
      : extrapolation
  if (outside && type === 'clamp') return outside === 'left' ? output[0] : output[last]
  if (outside && type === 'identity') return value

  let segment = 1
  while (segment < last && value > input[segment]) segment++
  const [x0, x1] = [input[segment - 1], input[segment]]
  const [y0, y1] = [output[segment - 1], output[segment]]
  return x1 === x0 ? y0 : y0 + ((value - x0) * (y1 - y0)) / (x1 - x0)
}

export const Animated = {
  View: AnimatedView,
  Text,
  Image,
  ScrollView,
  TextInput,
  createAnimatedComponent: <T,>(component: T) => component,
}

export default Animated
