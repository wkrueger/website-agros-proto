import '../css/style.css'
import { useRef, useState, useEffect, FunctionComponent, cloneElement } from 'react'
import { motion, useTransform, useViewportScroll } from 'framer-motion'

export default function Main() {
  const $contentBlock = useRef<HTMLDivElement>(null)
  const $stickyBlock = useRef<HTMLDivElement>(null)
  const [opacitySlices, setOpacitySlices] = useState(makeSlices(0, 900, 6))
  const [positions, setPositions] = useState({ contentTop: 0, contentBottom: 900, stickyTop: 0 })
  useEffect(() => {
    const contentTop = $contentBlock.current?.offsetTop!
    const contentBottom = contentTop + $contentBlock.current?.offsetHeight!
    const stickyTop = $stickyBlock.current?.offsetTop!
    setPositions({ contentTop, contentBottom, stickyTop })
    setOpacitySlices(
      makeSlices(contentTop - window.innerHeight, contentBottom - window.innerHeight, 6)
    )
  }, [])

  const { scrollY } = useViewportScroll()
  const opacityY = useTransform(scrollY, opacitySlices, [0, 1, 1, 1, 1, 1, 0])
  const moveTY = useTransform(scrollY, [positions.stickyTop, positions.contentBottom], [0, -100])

  return (
    <section style={{ height: '2000px' }} className="container mx-auto flex flex-row items-center">
      <div className="w-8/12 h-full bg-green-300">
        <div
          className="_inner h-screen sticky top-0 flex flex-col justify-end"
          style={{ border: 'solid 1px red' }}
          ref={$stickyBlock}
        >
          <BlurGroup
            className="absolute top-0 w-full h-full"
            style={{ zIndex: -1 }}
            pixels={10}
            start={positions.contentTop}
            end={positions.contentBottom}
            transition={100}
          >
            <motion.img src="/public/bg/bg-landing.png" className="absolute" />
          </BlurGroup>
          <motion.h1 className="mb-10" style={{ opacity: opacityY, y: moveTY }}>
            HELLO STICKY
          </motion.h1>
        </div>
      </div>
      <div className="w-4/12 bg-red-300" style={{ height: '900px' }} ref={$contentBlock}>
        {SLIPSUM}
      </div>
    </section>
  )
}

const SLIPSUM = `
Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.

Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.

Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
`

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
  [k: string]: any
}> = ({ children, pixels, start, end, transition, ...rest }) => {
  const { scrollY } = useViewportScroll()
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
