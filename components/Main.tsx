import "../css/style.css"
import { Nav, InlineNav, FixedNav } from "./Nav"
import Head from "next/head"
import { LandingPage } from "./Pages/Landing/LandingPage"
import { DiagnosticoPage } from "./Pages/Diagnostico/DiagnosticoPage"
import { MonitoramentoPage } from "./Pages/Monitoramento/MonitoramentoPage"
import { SimfazPage } from "./Pages/Simfaz/SimfazPage"
import { EmpresaPage } from "./Pages/Empresa/EmpresaPage"
import { ContatoPage } from "./Pages/Contato/ContatoPage"
import React, { useReducer, useState, createContext } from "react"

export const dispatchContext = createContext<Main>(null as any)
export const stateContext = createContext<Main["state"]>(null as any)

export class Main extends React.Component {
  visibleItems = {} as Record<string, number>
  state = {
    visibleItem: "sistema",
    navVisible: true
  }

  itemVisible = (i: { tag: string; ratio: number }) => {
    this.visibleItems[i.tag] = i.ratio
    const sorted = Object.entries(this.visibleItems).sort((a, b) => {
      return b[1] - a[1]
    })
    console.log("sorted", sorted)
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

  render() {
    //contexts dão re-render em todos os consumidores quando seu "value" é alterado
    //por isso essa gambi de separar em 2... react né...
    return (
      <dispatchContext.Provider value={this}>
        <stateContext.Provider value={this.state}>
          <div className="text-gray-default font-sans">
            <Head>
              <title>SIMFAZ - Sistema de Monitoramento de Fazendas</title>
            </Head>
            {/* nav */}
            <FixedNav />
            <InlineNav />
            {/* pages */}
            <LandingPage />
            <DiagnosticoPage />
            <MonitoramentoPage />
            <SimfazPage />
            <EmpresaPage />
            <ContatoPage />
          </div>
        </stateContext.Provider>
      </dispatchContext.Provider>
    )
  }
}

export const HEADER_ITEMS = [
  { label: "O Sistema", tag: "sistema" },
  { label: "Diagnóstico", tag: "diagnostico" },
  { label: "Monitoramento", tag: "monitoramento" },
  { label: "Socioambiental", tag: "socioambiental" },
  { label: "A Empresa", tag: "empresa", className: "hidden xl:block" },
  { label: "Contato", tag: "contato", className: "hidden xl:block" }
]
