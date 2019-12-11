import { Nav } from "./Nav"
import Head from "next/head"
import { LandingPage } from "./Pages/Landing/LandingPage"
import { DiagnosticoPage } from "./Pages/Diagnostico/DiagnosticoPage"
import { MonitoramentoPage } from "./Pages/Monitoramento/MonitoramentoPage"
import { SimfazPage } from "./Pages/Simfaz/SimfazPage"
import { EmpresaPage } from "./Pages/Empresa/EmpresaPage"
import { ContatoPage } from "./Pages/Contato/ContatoPage"

export function Main() {
  return (
    <div>
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
  )
}
