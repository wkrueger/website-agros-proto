import { Page, Content, ButtonsRow, IconsRow } from "../../Page"
import contentTextMd from "./DiagnosticoPageContent.md"

export function DiagnosticoPage() {
  const content = (
    <Content
      contentMd={contentTextMd}
      iconsRow={
        <IconsRow
          icons={[
            { text: "Aspectos Regionais", icon: "/public/icon/icone-socioambiental.svg" },
            {
              text: "Características Físicas do Imóvel",
              icon: "/public/icon/icone-caracteristicas-imovel.svg"
            },
            { text: "Informações do Mercado", icon: "/public/icon/icone-informacoes-mercado.svg" }
          ]}
        />
      }
      buttonsRow={<ButtonsRow buttons={[{ text: "Mais informações", link: "#" }]} />}
    />
  )

  return (
    <Page
      bgImage="/public/bg/bg-diagnostico.png"
      title="Diagnóstico"
      subtitle="Conheça melhor o potencial do seu cliente. Minimize os riscos ao tomar imóveis em garantia. Crie mais oportunidades de baixo risco!"
      content={content}
    />
  )
}
