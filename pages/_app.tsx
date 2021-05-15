import Meta from "../src/components/Meta";

const App = ({ Component, pageProps }) => (
  <>
    <Meta />
    <Component {...pageProps} />
  </>
);

export default App;
