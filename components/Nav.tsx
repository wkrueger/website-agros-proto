import React, { useState, useEffect, useContext } from "react"
import { SlideDown } from "react-slidedown"
import "react-slidedown/lib/slidedown.css"
import Link from "next/link"
import classNames from "classnames"
import { mainContext } from "./Main"

const classes = {
  headerItem: "block mt-4 lg:inline-block lg:mt-0 mr-4 text-shadow-hover"
}

export function Nav() {
  const [expanded, setExpanded] = useState(false)

  return (
    <nav className="flex items-center justify-between flex-wrap p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img style={{ width: "180px" }} src="/public/simfaz-svg-cortado.svg" />
      </div>
      <div className="block lg:hidden">
        <button
          className={
            "flex items-center px-3 py-2 border rounded border-gray text-gray hover:border-black"
          }
          onClick={() => setExpanded(!expanded)}
        >
          <MenuIcon />
        </button>
      </div>
      <SlideDown className="w-full block flex-grow">{expanded && <HeaderItems />}</SlideDown>
    </nav>
  )
}

const HEADER_ITEMS = [
  { label: "O Sistema", tag: "sistema" },
  { label: "Diagnóstico", tag: "diagnostico" },
  { label: "Monitoramento", tag: "monitoramento" },
  { label: "Socioambiental", tag: "socioambiental" },
  { label: "A Empresa", tag: "empresa" },
  { label: "Contato", tag: "contato" }
]

const HeaderItems = () => {
  const [activeItem, setActiveItem] = useState("")
  const ctx = useContext(mainContext)
  useEffect(() => {
    // subscribe to "im visible" events
    function handler(ev: GlobalEvents["pageVisible"]) {
      setActiveItem(ev.tag)
    }
    ctx.emitter.on("pageVisible", handler)
    return () => {
      ctx.emitter.off("pageVisible", handler)
    }
  }, [])

  return (
    <div className="text-sm lg:flex-grow">
      {HEADER_ITEMS.map(item => (
        <Link key={item.tag} href={"#" + item.tag}>
          <a
            className={classNames(
              classes.headerItem,
              activeItem === item.tag && "text-cyan-selected"
            )}
          >
            {item.label}
          </a>
        </Link>
      ))}
    </div>
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
