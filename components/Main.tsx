import "../css/style.css"
import { Nav } from "./Nav"
import Head from "next/head"
import { LandingPage } from "./Pages/Landing/LandingPage"
import { DiagnosticoPage } from "./Pages/Diagnostico/DiagnosticoPage"
import { MonitoramentoPage } from "./Pages/Monitoramento/MonitoramentoPage"
import { SimfazPage } from "./Pages/Simfaz/SimfazPage"
import { EmpresaPage } from "./Pages/Empresa/EmpresaPage"
import { ContatoPage } from "./Pages/Contato/ContatoPage"
import React, { createContext } from "react"
import mitt, { Emitter } from "mitt"

export const mainContext = createContext((null as any) as { emitter: Emitter })

export class Main extends React.Component {
  ctxValue = { emitter: mitt() }

  render() {
    return (
      <mainContext.Provider value={this.ctxValue}>
        <div className="text-gray-default">
          <Head>
            <title>SIMFAZ - Sistema de Monitoramento de Fazendas</title>
          </Head>
          <Nav></Nav>
          <LandingPage />
          <DiagnosticoPage />
          <MonitoramentoPage />
          <SimfazPage />
          <EmpresaPage />
          <ContatoPage />
        </div>
      </mainContext.Provider>
    )
  }
}
