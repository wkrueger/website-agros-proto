import Markdown from "react-markdown"
import Link from "next/link"
import { useEffect, useContext, useRef } from "react"
import { dispatchContext } from "./Main"

type PageProps = {
  title: string
  titleType?: "h1" | "h2"
  subtitle: string
  content: JSX.Element
  bgImage: string
  tag?: string
}

export const Page: React.SFC<PageProps> = i => {
  const dispatch = useContext(dispatchContext)
  const $section = useRef<HTMLElement>(null)
  const $state = useRef({ visible: false, observer: (null as any) as IntersectionObserver })
  useEffect(() => {
    if (!i.tag) return
    const observer = new IntersectionObserver(([target]) => {
      const prevState = $state.current.visible
      const currentState = target.isIntersecting
      if (prevState !== currentState) {
        dispatch.itemVisible({ tag: i.tag!, visible: currentState })
      }
      $state.current.visible = currentState
    })
    observer.observe($section.current!)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={$section}>
      <div className="_leading">
        <div
          className="_bg-image"
          style={{
            backgroundImage: `url('${i.bgImage}')`,
            height: "300px",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        {i.titleType === "h1" ? <h1>{i.title}</h1> : <h2>{i.title}</h2>}
      </div>
      <div className="_content">{i.content}</div>
      {i.children}
    </section>
  )
}

type ContentProps = {
  contentMd: string
  iconsRow?: JSX.Element
  buttonsRow?: JSX.Element
}

export function Content(i: ContentProps) {
  return (
    <>
      <div className="_content-text">
        <Markdown source={i.contentMd} />
        {i.iconsRow || null}
        {i.buttonsRow || null}
      </div>
    </>
  )
}

type IconsRowProps = {
  icons: {
    icon: string
    text: string
  }[]
}

export function IconsRow(i: IconsRowProps) {
  return (
    <div className="_iconsRow">
      {i.icons.map((item, idx) => (
        <figure className="_icon" key={idx}>
          <img src={item.icon} alt={item.text} />
          <figcaption>{item.text}</figcaption>
        </figure>
      ))}
    </div>
  )
}

type ButtonsRowProps = {
  buttons: {
    text: string
    link: string
  }[]
}

export function ButtonsRow(i: ButtonsRowProps) {
  return (
    <div className="_buttonsRow">
      {i.buttons.map((line, idx) => (
        <Link href={line.link} key={idx}>
          <button type="button">{line.text}</button>
        </Link>
      ))}
    </div>
  )
}
