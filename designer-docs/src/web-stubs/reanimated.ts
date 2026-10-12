import { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native'

const transition = new Proxy({}, { get: () => () => transition })

export const FadeInUp = transition
export const FadeOutUp = transition
export const FadeOut = transition
export const SlideInDown = transition
export const SlideInUp = transition
export const ReduceMotion = {
  System: 'system',
  Always: 'always',
  Never: 'never',
}

type EasingFunction = (value: number) => number

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
} & (
  | { __coinAnimation: 'timing'; duration: number; easing: EasingFunction }
  | { __coinAnimation: 'spring'; config: SpringConfig }
)

interface WebSharedValue<T> {
  value: T
  __cancel?: () => void
}

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
      get: () => currentValue.current,
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
          render((version) => version + 1)
          if (isAnimationDescriptor(nextValue)) {
            nextValue.callback?.(true)
          }
          return
        }

        const animation = nextValue
        const from = currentValue.current
        const to = animation.to as number
        const startedAt =
          typeof performance === 'undefined' ? Date.now() : performance.now()
        let lastFrameAt = startedAt
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

          if (finished) {
            currentValue.current = to as T
            currentVelocity.current = 0
            frame.current = null
            render((version) => version + 1)
            animation.callback?.(true)
            return
          }

          render((version) => version + 1)
          frame.current = requestAnimationFrame(tick)
        }

        frame.current = requestAnimationFrame(tick)
      },
    })

    value.__cancel = cancel
    sharedValue.current = value
  }

  useEffect(() => cancel, [])

  return sharedValue.current
}

export const useAnimatedStyle = (factory: () => object) => factory()
export const useAnimatedProps = (factory: () => object) => factory()
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
export const withRepeat = <T,>(value: T) => value
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
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  createAnimatedComponent: <T,>(component: T) => component,
}

export default Animated
