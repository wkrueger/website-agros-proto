import React from 'react'
import { motion } from 'framer-motion'
import throttle from 'lodash/throttle'

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
    currentPage: ''
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkPage)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkPage)
  }

  registerSlide(i: TitleSlide) {
    this.pages.push(i)
    this.pages.sort((a, b) => {
      return b.top - a.top
    })
    if (this.pages.length >= this.props.size) {
      this._checkPage()
      this.setState({ ready: true })
    }
  }

  _checkPage = () => {
    const y = window.scrollY + window.innerHeight
    const found = this.pages.find(page => page.top < y) || this.pages[0]
    if (found.key !== this.state.currentPage) {
      this.setState({ currentPage: found.key })
    }
  }

  checkPage = throttle(this._checkPage, 200)

  render() {
    if (!this.state.ready) return null
    return this.pages.map(page => {
      if (!(page.key === this.state.currentPage)) return null
      return (
        <motion.div
          className="absolute h-full"
          key={page.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {page.page}
        </motion.div>
      )
    })
  }
}
