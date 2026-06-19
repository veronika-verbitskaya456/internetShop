import Header from "../../components/Header/Header"
import styles from './MainPage.module.css'

const MainPage = () => {
  return (
    <main className={styles.mainContainer}>
      <Header />
      <section>
        <div className={styles.div}>section</div>
      </section>
    </main>
  )
}

export default MainPage;