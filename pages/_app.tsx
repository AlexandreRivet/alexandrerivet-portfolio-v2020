import Layout from "../src/components/Layout";
import Meta from "../src/components/Meta";

import '../styles/styles.css';

const App = ({ Component, pageProps }) => (
  <>
    <Meta />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);

export default App;
