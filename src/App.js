import styles from "./App.module.css";
import AutoComplete from "./components/autoComplete";
function App() {
  return (
    <div className={styles.App}>
      <img className={styles.logo} src="/img/osossLogo.svg"></img>
      <h1 className={styles.header}>
        Frontend Developer Vacancy technical challenge
      </h1>

      <AutoComplete></AutoComplete>
      <div style={{ marginTop: "90vh", position: "absolute" }}>
        <p style={{ opacity: "0.2" }}>developed by mohammad alzain</p>
      </div>
    </div>
  );
}

export default App;
