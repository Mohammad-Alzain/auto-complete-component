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
      <div
        style={{
          marginTop: "90vh",
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <p style={{ opacity: "0.2", marginRight: "6px" }}> developed by</p>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/mohammad-alzain/"
          style={{ opacity: "0.2", color: "brown" }}
        >
          mohammad alzain
        </a>
      </div>
    </div>
  );
}

export default App;
