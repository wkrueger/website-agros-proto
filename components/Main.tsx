import Head from 'next/head'
import React, { createContext, createRef } from 'react'
import '../css/style.css'
import { FixedNav, InlineNav } from './Nav'
import { ContatoPage } from './Pages/Contato/ContatoPage'
import { DiagnosticoPage } from './Pages/Diagnostico/DiagnosticoPage'
import { EmpresaPage } from './Pages/Empresa/EmpresaPage'
import { LandingPage } from './Pages/Landing/LandingPage'
import { MonitoramentoPage } from './Pages/Monitoramento/MonitoramentoPage'
import { SimfazPage } from './Pages/Simfaz/SimfazPage'
import { Slides, TitleSlide } from './Slides'

export const dispatchContext = createContext<Main>(null as any)
export const stateContext = createContext<Main['state']>(null as any)

export class Main extends React.Component {
  visibleItems = {} as Record<string, number>
  state = {
    visibleItem: 'sistema',
    navVisible: true
  }

  slidesRef = createRef<Slides>()

  itemVisible = (i: { tag: string; ratio: number }) => {
    this.visibleItems[i.tag] = i.ratio
    const sorted = Object.entries(this.visibleItems).sort((a, b) => {
      return b[1] - a[1]
    })
    const found = sorted[0]
    if (found) {
      this.setState({
        visibleItem: found[0]
      })
    }
  }

  navVisible = ({ navVisible }: { navVisible: boolean }) => {
    this.setState({ navVisible })
  }

  registerSlide = (i: TitleSlide) => {
    this.slidesRef.current?.registerSlide(i)
  }

  render() {
    //contexts dão re-render em todos os consumidores quando seu "value" é alterado
    return (
      <dispatchContext.Provider value={this}>
        <stateContext.Provider value={this.state}>
          <div className="text-gray-default font-sans">
            <Head>
              <title>SIMFAZ - Sistema de Monitoramento de Fazendas</title>
            </Head>
            {/* nav */}
            <YRuler />
            <FixedNav />
            <InlineNav />
            {/* pages */}
            <main className="container mx-auto flex">
              <div className="_leadingcol w-8/12">
                <div className="sticky top-0 h-screen" style={{ border: 'solid 1px red' }}>
                  <Slides size={6} ref={this.slidesRef} />
                </div>
              </div>
              <div className="_contentcol w-4/12">
                <LandingPage />
                <DiagnosticoPage />
                <MonitoramentoPage />
                <SimfazPage />
                <EmpresaPage />
                <ContatoPage />
              </div>
            </main>
          </div>
        </stateContext.Provider>
      </dispatchContext.Provider>
    )
  }
}

function YRuler() {
  const out = [] as JSX.Element[]
  for (let x = 0; x < 50; x++) {
    out.push(
      <div style={{ height: '100px', border: 'solid 1px black' }} key={x}>
        {x * 100}
      </div>
    )
  }

  return <div style={{ position: 'absolute' }}>{out}</div>
}

export const HEADER_ITEMS = [
  { label: 'O Sistema', tag: 'sistema' },
  { label: 'Diagnóstico', tag: 'diagnostico' },
  { label: 'Monitoramento', tag: 'monitoramento' },
  { label: 'Socioambiental', tag: 'socioambiental' },
  { label: 'A Empresa', tag: 'empresa', className: 'hidden xl:block' },
  { label: 'Contato', tag: 'contato', className: 'hidden xl:block' }
]
