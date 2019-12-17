// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  render() {
    return (
      <Html id="simfaz_site" lang="pt">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Raleway|Roboto+Slab&display=swap"
            rel="stylesheet"
          />

          <meta
            name="description"
            content="Inovação tecnológica a serviço do monitoramento remoto de imóveis e glebas rurais."
          />

          <meta property="og:title" content="SIMFAZ - Sistema de Monitoramento de Fazendas" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://simfaz.com.br" />
          <meta
            property="og:image"
            content="https://simfaz.com.br/public/simfaz-logo-pequeno.svg"
          />
          <meta
            property="og:description"
            content="Inovação tecnológica a serviço do monitoramento remoto de imóveis e glebas rurais."
          />

          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:site" content="@AGROSATELITE"></meta>
          <meta name="twitter:title" content="SIMFAZ - Sistema de Monitoramento de Fazendas"></meta>
          <meta
            name="twitter:description"
            content="Inovação tecnológica a serviço do monitoramento remoto de imóveis e glebas rurais."
          ></meta>

          {/* icons */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
