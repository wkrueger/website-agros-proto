import classNames from 'classnames'
import { PageProps } from './Page'
import { useViewportScroll, useTransform, motion } from 'framer-motion'
import { useState, cloneElement, FunctionComponent } from 'react'

export function Titles(i: PageProps & { top: number; bottom: number }) {
  const { scrollY } = useViewportScroll()
  const vh = window.innerHeight
  const sliceEnd = i.tag === 'sistema' ? 0 : 200
  const firstSlice = i.tag === 'sistema' ? 1 : 0
  const [opacitySlices] = useState(makeSlices(Math.max(i.top - vh), i.bottom - vh, 6))
  const textOpacity = useTransform(scrollY, opacitySlices, [firstSlice, 1, 1, 1, 1, 1, 0])
  const textY = useTransform(scrollY, [Math.max(i.top - vh, 0), i.bottom - vh], [0, -150])

  const textJustify = i.tag === 'sistema' ? 'justify-center' : 'justify-end mb-20'

  return (
    <>
      <div className="_imageGroup absolute h-full w-full flex flex-col justify-center">
        <BlurGroup
          page={i.tag}
          className="_blurGroup relative"
          style={{ zIndex: -1, height: i.bgImageHeight + 'px' }}
          pixels={10}
          start={i.top - vh}
          end={i.bottom - vh + 100}
          transition={100}
        >
          <motion.img
            src={i.bgImage}
            className={classNames('absolute max-w-none top-0 right-0', i.bgImageClass)}
            style={{ zIndex: -1 }}
          />
        </BlurGroup>
      </div>
      <div className="_textGroup absolute h-full w-full flex flex-col justify-center">
        <motion.div
          className={classNames('flex flex-col', textJustify)}
          style={{ height: 950 + 'px', opacity: textOpacity, y: textY }}
        >
          {i.titleType === 'h1' ? <h1>{i.title}</h1> : <h2>{i.title}</h2>}
          <h4>{i.subtitle}</h4>
        </motion.div>
      </div>
    </>
  )
}

function makeSlices(from: number, to: number, nrSlices: number) {
  const out = [] as number[]
  const slSize = (to - from) / nrSlices
  for (let x = 0; x <= nrSlices; x++) {
    out.push(from + slSize * x)
  }
  return out
}

const BlurGroup: FunctionComponent<{
  children: JSX.Element
  pixels: number
  start: number
  end: number
  transition: number
  page: string
  [k: string]: any
}> = ({ children, pixels, start, end, transition, page, ...rest }) => {
  const { scrollY } = useViewportScroll()
  if (page === 'sistema') start = start - transition * 4
  const opacityA = useTransform(scrollY, blurOpacityFn1(start, end, transition))
  const opacityB = useTransform(scrollY, blurOpacityFn2(start, end, transition))
  const opacityC = useTransform(scrollY, blurOpacityFn3(start, end, transition))
  const transforms = [opacityC, opacityB, opacityA]

  const scale = makeSlices(0, pixels, 2)
  const clones = scale.map((step, idx) => {
    const props = { ...children.props }
    const style = { ...(props.style || {}), filter: `blur(${step}px)`, opacity: transforms[idx] }
    return cloneElement(children, { ...props, style, key: String(step) })
  })
  return <div {...rest}>{clones}</div>
}

function transitionPoints(start: number, end: number, transition: number) {
  return [
    start,
    start + transition,
    start + transition * 2,
    start + transition * 3,
    end - 3 * transition,
    end - 2 * transition,
    end - transition,
    end
  ]
}

function blurOpacityFn1(start, end, transition) {
  const points = transitionPoints(start, end, transition)
  const linear1 = linear(points[0], points[1], 0, 1)
  const linear2 = linear(points[1], points[2], 1, 0)
  const linear3 = linear(points[5], points[6], 0, 1)
  const linear4 = linear(points[6], points[7], 1, 0)
  return x => {
    if (x < 0) return 0
    if (x <= points[1]) return linear1(x)
    if (x <= points[2]) return linear2(x)
    if (x >= points[6]) return linear4(x)
    if (x >= points[5]) return linear3(x)
    if (x > points[7]) return 0
    return 0
  }
}

function blurOpacityFn2(start, end, transition) {
  const points = transitionPoints(start, end, transition)
  const down = linear(points[2], points[3], 1, 0)
  const up = linear(points[4], points[5], 0, 1)
  return x => {
    if (x <= points[1]) return 0
    if (x <= points[2]) return 1
    if (x <= points[3]) return down(x)
    if (x <= points[4]) return 0
    if (x <= points[5]) return up(x)
    if (x <= points[6]) return 1
    if (x > points[6]) return 0
  }
}

function blurOpacityFn3(start, end, transition) {
  const points = transitionPoints(start, end, transition)
  return x => {
    if (x <= points[1]) return 0
    if (x >= points[6]) return 0
    return 1
  }
}

function linear(x0, x1, y0, y1) {
  const slope = (y1 - y0) / (x1 - x0)
  return x => y0 + (x - x0) * slope
}
