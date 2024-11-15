import { Page, ButtonsRow } from '../../Page'
import { useFormik } from 'formik'
import { FormHelper } from '../../_common/FormHelper'
import Link from 'next/link'

export function ContatoPage() {
  return (
    <Page
      title="Contato"
      subtitle="Caso tenha ficado com alguma dúvida ou queira se tornar um cliente do SIMFaz, entre em contato conosco, utilizando o formulário ao lado:"
      bgImage="/public/bg/bg-contato.png"
      bgImageHeight={1080}
      content={<ContactForm />}
      tag="contato"
    >
      <div className="_social-media">
        <Link href="https://www.agrosatelite.com.br">
          <img src="/public/social_media/media_web.svg" alt="Website" />
        </Link>
        <Link href="https://facebook.com/agrosatelite">
          <img src="/public/social_media/media_facebook.svg" alt="Facebook" />
        </Link>
        <Link href="https://linkedin.com/agrosatelite">
          <img src="/public/social_media/media_linkedin.svg" alt="Linkedin" />
        </Link>
        <Link href="https://instagram.com/agrosatelite">
          <img src="/public/social_media/media_instagram.svg" alt="Instagram" />
        </Link>
        <img src="/public/social_media/media_gmaps.png" alt="Google Maps" />
      </div>
    </Page>
  )
}

export function ContactForm() {
  const bag = useFormik({
    initialValues: {
      nome: '',
      email: '',
      assunto: '',
      mensagem: ''
    },
    onSubmit: values => {}
  })
  const h = new FormHelper(bag)

  return (
    <div className="_contact-form mb-40">
      <form onSubmit={bag.handleSubmit}>
        <div className="_field">
          <label htmlFor="nome">Nome</label>
          <input type="text" placeholder="Nome" {...h.bindInput('nome')} />
        </div>
        <div className="_field">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" {...h.bindInput('email')} />
        </div>
        <div className="_field">
          <label htmlFor="assunto">Assunto</label>
          <input type="text" placeholder="Assunto" {...h.bindInput('assunto')} />
        </div>
        <div className="_field _ta">
          <label htmlFor="mensagem"></label>
          <textarea
            placeholder="Mensagem"
            style={{ height: '6rem', resize: 'none' }}
            {...h.bindInput('mensagem')}
          ></textarea>
        </div>
        <ButtonsRow buttons={[{ type: 'submit', text: 'Enviar', link: '#contato' }]} />
      </form>
    </div>
  )
}
