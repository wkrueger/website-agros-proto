import Markdown from 'react-markdown'
import Link from 'next/link'
import { useEffect, useContext, useRef } from 'react'
import { dispatchContext } from './Main'
import classNames from 'classnames'

type PageProps = {
  title: string
  titleType?: 'h1' | 'h2'
  subtitle: string
  content: JSX.Element
  bgImage: string
  tag?: string
  bgImageClass?: string
  sectionStyle?: React.CSSProperties
  buttonsRow?: JSX.Element
}

export const Page: React.SFC<PageProps> = i => {
  const dispatch = useContext(dispatchContext)
  const $section = useRef<HTMLElement>(null)
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

  const sectionStyle = { minHeight: '996px', ...(i.sectionStyle || {}) }

  return (
    <section
      ref={$section}
      id={i.tag}
      className="container mx-auto flex flex-col"
      style={sectionStyle}
    >
      <div className="_row _main w-full flex flex-grow">
        <div
          className={classNames(
            '_leading w-8/12 border relative flex flex-col pr-2',
            i.titleType === 'h1' ? 'justify-center' : 'justify-end'
          )}
        >
          <img
            src={i.bgImage}
            className={classNames('absolute max-w-none right-0 top-0', i.bgImageClass)}
            style={{ zIndex: -1 }}
          />
          {i.titleType === 'h1' ? <h1>{i.title}</h1> : <h2>{i.title}</h2>}
          <h4>{i.subtitle}</h4>
        </div>
        <div className="_content w-4/12 flex flex-col justify-end px-2">{i.content}</div>
      </div>
      {i.buttonsRow && (
        <div className="_row w-full flex">
          <div className="w-8/12" />
          <div className="w-4/12">{i.buttonsRow}</div>
        </div>
      )}
    </section>
  )
}

type ContentProps = {
  contentMd: string
  iconsRow?: JSX.Element
}

export function Content(i: ContentProps) {
  return (
    <>
      <div className="_content-text">
        <Markdown source={i.contentMd} />
        {i.iconsRow || null}
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
        <figure className="_icon flex flex-col justify-center items-center w-1/3" key={idx}>
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
            type="button"
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
