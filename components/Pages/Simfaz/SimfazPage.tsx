import { Page, Content, ButtonsRow } from "../../Page"
import contentMd from "./SimfazPageContent.md"

export function SimfazPage() {
  const content = (
    <Content
      contentMd={contentMd}
      buttonsRow={<ButtonsRow buttons={[{ text: "Mais informações", link: "#" }]} />}
    />
  )

  return (
    <Page
      title="Socioambiental"
      subtitle="Minimize os riscos reputacionais e financeiros
    avaliando conformidade socioambiental de proprietários e de imóveis rurais."
      bgImage="/public/bg/bg-simfaz.png"
      content={content}
      tag="socioambiental"
    />
  )
}