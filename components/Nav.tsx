import React, { useState, useEffect, useContext, MutableRefObject, useRef } from 'react'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import Link from 'next/link'
import classNames from 'classnames'
import { HEADER_ITEMS, dispatchContext, stateContext } from './Main'
import { motion } from 'framer-motion'

export function Nav(i: { innerRef?: MutableRefObject<any> }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <nav
      className="container mx-auto flex items-center justify-between flex-wrap py-4 px-4 lg:px-0"
      ref={i.innerRef}
    >
      <div className="flex items-center flex-shrink-0 text-white pb-5">
        <img className="_logo" src="/public/simfaz-svg-cortado.svg" />
      </div>
      {/* grow 1 - desktop */}
      <div className="hidden lg:block flex-grow-2"></div>
      {/* botão */}
      <div className="block lg:hidden">
        <button
          className={
            'flex items-center px-3 py-2 border rounded border-gray text-gray hover:border-black'
          }
          onClick={() => setExpanded(!expanded)}
        >
          <MenuIcon />
        </button>
      </div>
      {/* menu < 1024px */}
      <SlideDown className="flex flex-wrap lg:hidden w-full flex-grow bg-white">
        {expanded && <HeaderItems className="block mr-6 mb-4" stacked />}
      </SlideDown>
      {/* menu desktop */}
      <div className="_desktop_menu hidden lg:flex">
        <HeaderItems className="px-6" stacked={false} />
      </div>
      {/* grow - dektop */}
      <div className="hidden lg:block flex-grow"></div>
      {/* ícone usuário */}
      <div className="hidden lg:block">
        <img src="/public/login.svg" alt="Login" />
      </div>
    </nav>
  )
}

export function InlineNav() {
  const $rootRef = useRef<any>(null)
  const dispatcher = useContext(dispatchContext)
  useEffect(() => {
    const observer = new IntersectionObserver(([element]) => {
      const onScreen = element.isIntersecting
      dispatcher.navVisible({ navVisible: onScreen })
    })
    observer.observe($rootRef.current)
    return () => {
      observer.disconnect()
    }
  }, [])
  return <Nav innerRef={$rootRef} />
}

export function FixedNav() {
  return (
    <div className="_fixed-nav fixed w-full z-50">
      <Nav />
    </div>
  )
}

export function FixedNavBg() {
  return (
    <div
      className="fixed w-full"
      style={{
        height: '110px',
        background: 'linear-gradient(white 0%, white 85%, transparent 100%)'
      }}
    ></div>
  )
}

const HeaderItems = (i: { className: string; stacked: boolean }) => {
  const ctx = useContext(stateContext)

  return (
    <>
      {HEADER_ITEMS.map(item => (
        <Link key={item.tag} href={'#' + item.tag}>
          <a
            className={classNames(
              i.className,
              'text-sm text-shadow-hover uppercase',
              ctx.visibleItem === item.tag && 'text-cyan-selected',
              !i.stacked && item.className
            )}
          >
            {item.label}
          </a>
        </Link>
      ))}
    </>
  )
}

const MenuIcon = React.memo(function MenuIcon() {
  return (
    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <title>Menu</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  )
})
