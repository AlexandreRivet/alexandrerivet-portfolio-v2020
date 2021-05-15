import Experiment from "./Experiment";

const Main = ({ children }) => (
  <main>
    <Experiment />
    <section>{ children }</section>
    <style jsx>{`
      main {
        width: 100%;
        height: 100%;
      }

      section {
        z-index: -1;
      }
    `}</style>
  </main>
)

export default Main;