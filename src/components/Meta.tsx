import Head from 'next/head'

const Meta = () => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width, viewport-fit=cover" />
      <meta name="description" content="Portfolio d'Alexandre Rivet - Creative Developer @PlayPlay" />
      <meta name="og:site_name" content="alexandrerivet.dev" />
      <meta name="og:type" content="website" />
      <meta name="og:title" content="Alexandre Rivet" />
      <meta name="og:description" content="Alexandre Rivet Portfolio - Creative Developer @PlayPlay" />
      <meta name="og:website" content="alexandrerivet.dev" />
      <meta name="og:url" content="https://alexandrerivet.dev" />
      <meta name="og:image" content="TODO" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@TODO" />
      <meta name="twitter:description" content="Alexandre Rivet Portfolio - Creative Developer @PlayPlay" />
      <meta name="twitter:title" content="Alexandre Rivet" />
      <meta name="twitter:image" content="TODO" />
      <meta name="application-name" content="Alexandre Rivet" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Alexandre Rivet" />
      <meta name="description" content="Alexandre Rivet Portfolio" />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      {/* <meta name='msapplication-config' content='/static/icons/browserconfig.xml' /> */}
      <meta name='msapplication-TileColor' content='#FFFFFF' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#000000' />

      <link rel="manifest" href="/manifest.json" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "email": "alexandre.rivet94@gmail.com",
            "jobTitle": "Creative Developer",
            "name": "Alexandre Rivet",
            "alumniOf": "ESGI",
            "birthDate": "1994-02-03",
            "gender": "male",
            "nationality": "French",
            "url": "https://alexandrerivet.dev",
            "sameAs": [
              "https://www.linkedin.com/in/alexandre-rivet/",
              "https://github.com/AlexandreRivet"
            ]
          })
        }}
      />
    </Head>
  </>
)

export default Meta;