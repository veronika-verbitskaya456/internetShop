import styles from "./MainPageButton.module.css";
import MainPageButtonIcon from "../../assets/icons/MainPageButtonIcon";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes";

const MainPageButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(Routes.MAIN);
  };

  return (
    <button className={styles.mainPageButton} onClick={handleClick}>
      <MainPageButtonIcon />
      <p className={styles.mainPageTitle}>На главную</p>
    </button>
  );
};

export default MainPageButton;
