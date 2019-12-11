import Markdown from "react-markdown"
import Link from "next/link"

type PageProps = {
  title: string
  titleType?: "h1" | "h2"
  subtitle: string
  content: JSX.Element
  bgImage: string
}

export function Page(i: PageProps) {
  return (
    <section>
      <div className="_leading">
        <div className="_bg-image" style={{ backgroundImage: i.bgImage }}></div>
        {i.titleType === "h1" ? <h1>{i.title}</h1> : <h2>{i.title}</h2>}
      </div>
      <div className="_content">{i.content}</div>
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
      {i.icons.map(item => (
        <figure className="_icon">
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
      {i.buttons.map(line => (
        <Link href={line.link}>
          <button type="button">{line.text}</button>
        </Link>
      ))}
    </div>
  )
}
