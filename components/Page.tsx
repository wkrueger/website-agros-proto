import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import { dispatchContext } from './Main'
import { Titles, TitlesSm } from './Titles'

export type PageProps = {
  title: string
  titleType?: 'h1' | 'h2'
  subtitle: string
  content: JSX.Element
  bgImage: string
  bgImageHeight: number
  bgImageClass?: string
  tag: string
  sectionStyle?: React.CSSProperties
  buttonsRow?: JSX.Element
}

export const Page: React.SFC<PageProps> = i => {
  const dispatch = useContext(dispatchContext)
  const $section = useRef<HTMLElement>(null)
  const [isSmall, setIsSmall] = useState(false)

  // scroll observer
  useEffect(() => {
    if (!i.tag) return
    const observer = new IntersectionObserver(
      ([target]) => {
        const area = target.intersectionRect.height * target.intersectionRect.width
        dispatch.itemVisible({ tag: i.tag!, ratio: area })
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )
    observer.observe($section.current!)
    return () => {
      console.log('disconnect')
      observer.disconnect()
    }
  }, [])

  // send title page
  useEffect(() => {
    setIsSmall(window.innerWidth < 1024)
    const top = absoluteTop($section.current!) + 110
    const bottom = $section.current?.offsetTop! + $section.current?.offsetHeight! + 110
    const page = <Titles {...i} top={top} bottom={bottom} />
    dispatch.registerSlide({ key: i.tag, page, top, bottom })
  }, [])

  const sectionStyle = {
    minHeight: '996px',
    paddingTop: '0px',
    ...(i.sectionStyle || {})
  }

  return (
    <section
      ref={$section}
      id={i.tag}
      className="flex flex-col justify-end lg:pl-2"
      style={sectionStyle}
    >
      {isSmall && <TitlesSm {...i} />}
      {i.content}
      {i.buttonsRow}
    </section>
  )
}

type ContentProps = {
  contentMd: string
  iconsRow?: JSX.Element
}

export function Content({ contentMd, iconsRow, ...rest }: ContentProps & Record<string, any>) {
  return (
    <>
      <div className="_content-text" {...rest}>
        <div className="hidden lg:block _offset">&nbsp;</div>
        <Markdown source={contentMd} />
        {iconsRow || null}
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
    <div className="_iconsRow flex justify-between text-sm uppercase items-end">
      {i.icons.map((item, idx) => (
        <figure className="_icon flex flex-col justify-center items-center lg:w-1/3" key={idx}>
          <img src={item.icon} alt={item.text} />
          <figcaption
            className="py-2 text-center"
            dangerouslySetInnerHTML={{ __html: item.text }}
          ></figcaption>
          <div
            className="_border_contain border-b border-gray-default"
            style={{ width: '112px' }}
          ></div>
        </figure>
      ))}
    </div>
  )
}

type ButtonsRowProps = {
  buttons: {
    type?: string
    text: string
    link: string
  }[]
}

export function ButtonsRow(i: ButtonsRowProps) {
  return (
    <div className="_buttonsRow flex justify-around" style={{ marginTop: '50px' }}>
      {i.buttons.map((line, idx) => (
        <Link href={line.link} key={idx}>
          <button
            type={(line.type as any) || 'button'}
            className="border border-gray-default rounded uppercase"
            style={{ width: '227px', height: '64px' }}
          >
            {line.text}
          </button>
        </Link>
      ))}
    </div>
  )
}

const absoluteTop = element => {
  let offsetTop = 0
  while (element) {
    offsetTop += element.offsetTop
    element = element.offsetParent
  }
  return offsetTop
}
