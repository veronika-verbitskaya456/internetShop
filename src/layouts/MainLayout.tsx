import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import styles from './MainLayout.module.css'


const MainLayout = () => {

  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout;