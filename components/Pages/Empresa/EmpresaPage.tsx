import { Page, Content } from "../../Page"
import contentMd from "./EmpresaPageContent.md"

export function EmpresaPage() {
  const content = <Content contentMd={contentMd} />

  return (
    <Page
      title="Sobre a Agrosatélite"
      subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      bgImage="/public/bg/bg-empresa.png"
      content={content}
      tag="empresa"
    />
  )
}
