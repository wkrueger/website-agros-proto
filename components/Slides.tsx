import React from 'react'
import { motion } from 'framer-motion'
import { stateContext } from './Main'

export interface TitleSlide {
  key: string
  page: JSX.Element
  top: number
  bottom: number
}

export class Slides extends React.Component<{ size: number }> {
  pages = [] as TitleSlide[]

  state = {
    ready: false,
    enabled: true
    // currentPage: ''
  }

  componentDidMount() {
    if (window.innerWidth < 1024) {
      this.setState({ enabled: false })
    }
  }

  registerSlide(i: TitleSlide) {
    this.pages.push(i)
    this.pages.sort((a, b) => {
      return b.top - a.top
    })
    if (this.pages.length >= this.props.size) {
      // this._checkPage()
      this.setState({ ready: true })
    }
  }

  // _checkPage = () => {
  //   const y = window.scrollY + window.innerHeight
  //   const found = this.pages.find(page => page.top < y) || this.pages[0]
  //   if (found.key !== this.state.currentPage) {
  //     this.setState({ currentPage: found.key })
  //   }
  // }

  // checkPage = throttle(this._checkPage, 200)

  render() {
    if (!this.state.ready) return null
    if (!this.state.enabled) return null

    return this.pages.map(page => {
      //if (!(page.key === ctx.visibleItem)) return null
      return (
        <motion.div
          className="absolute h-full w-full"
          key={page.key}
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
        >
          {page.page}
        </motion.div>
      )
    })
  }
}
