import React, { useState, useEffect, useContext, MutableRefObject, useRef } from "react"
import { SlideDown } from "react-slidedown"
import "react-slidedown/lib/slidedown.css"
import Link from "next/link"
import classNames from "classnames"
import { HEADER_ITEMS, dispatchContext, stateContext } from "./Main"
import { motion } from "framer-motion"

export function Nav(i: { innerRef?: MutableRefObject<any> }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <nav
      className="container mx-auto flex items-center justify-between flex-wrap py-4"
      ref={i.innerRef}
    >
      <div className="flex items-center flex-shrink-0 text-white pb-5">
        <img style={{ width: "154px" }} src="/public/simfaz-svg-cortado.svg" />
      </div>
      {/* botão */}
      <div className="block sm:hidden">
        <button
          className={
            "flex items-center px-3 py-2 border rounded border-gray text-gray hover:border-black"
          }
          onClick={() => setExpanded(!expanded)}
        >
          <MenuIcon />
        </button>
      </div>
      {/* menu < 1024px */}
      <SlideDown className="block lg:hidden w-full flex-grow">
        {expanded && <HeaderItems className="" stacked />}
      </SlideDown>
      {/* menu desktop */}
      <div className="_desktop_menu hidden lg:flex">
        <HeaderItems className="p-3" stacked={false} />
      </div>
      {/* ícone usuário */}
      <div className="">
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

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export function FixedNav() {
  const ctx = useContext(stateContext)

  if (ctx.navVisible) return null

  return (
    <motion.div
      className="_fixed-nav fixed w-full bg-white"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <Nav />
    </motion.div>
  )
}

// const headerItemClass = "block mt-4 lg:inline-block lg:mt-0 mr-4 text-shadow-hover"

const HeaderItems = (i: { className: string; stacked: boolean }) => {
  const ctx = useContext(stateContext)
  console.log("visible", ctx.visibleItem)

  return (
    <>
      {HEADER_ITEMS.map(item => (
        <Link key={item.tag} href={"#" + item.tag}>
          <a
            className={classNames(
              i.className,
              "text-sm text-shadow-hover uppercase",
              ctx.visibleItem === item.tag && "text-cyan-selected",
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
