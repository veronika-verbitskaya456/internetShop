import { useNavigate } from "react-router-dom";
import { Routes } from "../../../routes";
import styles from "./ThanksForPurchaiseModal.module.css";

interface ThanksForPurchaiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThanksForPurchaiseModal = ({
  isOpen,
  onClose,
}: ThanksForPurchaiseModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleGoToOrders = () => {
    onClose();
    navigate(Routes.ORDERS);
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Заказ оформлен!</h2>
        <p className={styles.text}>Спасибо за покупку!</p>
        <div className={styles.actions}>
          <button className={styles.ordersButton} onClick={handleGoToOrders}>
            Перейти к заказам
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThanksForPurchaiseModal;
