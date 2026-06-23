import { Link } from "react-router-dom";
import styles from './Page404.module.css'

const Page404 = () => {
  return (
    <div className={styles.page}>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/" className={styles.link}>Вернуться на главную</Link>
    </div>
  );
};

export default Page404;