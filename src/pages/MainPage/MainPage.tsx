import MainProductGrid from '../../components/MainProductsGrid/MainProductsGrid';
import MainSlider from '../../components/MainSlider/MainSlider';
import styles from './MainPage.module.css'
import billboard1 from '../../assets/cat1.webp';
import billboard2 from '../../assets/cat2.webp';
const MainPage = () => {
  return (
    <main className={styles.mainContainer}>

      <div className={styles.mainBannerContainer}>
        <img src={billboard1} alt='billboardImage' className={styles.billboardImage} />      
        <MainSlider />
        <img src={billboard2} alt='billboardImage' className={styles.billboardImage} />
      </div>
      <MainProductGrid />
    </main>
  )
}

export default MainPage;