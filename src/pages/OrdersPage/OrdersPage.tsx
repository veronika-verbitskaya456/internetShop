import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, clearOrders } from '../../store/slices/productSlice';
import styles from './OrdersPage.module.css';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';
import ConfirmModal from '../../components/Modals/ConfirmModal/ConfirmModal';
import { getSafeImageUrl } from '../../utils/imageUtils';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectOrders);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  const handleClearOrders = () => {
    if (orders.length === 0) return;
    setIsClearConfirmOpen(true);
  };

  const handleConfirmClearOrders = () => {
    dispatch(clearOrders());
    setIsClearConfirmOpen(false);
  };

  if (orders.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2 className={styles.emptyTitle}>У вас пока нет заказов</h2>
        <p className={styles.emptyText}>Сделайте свой первый заказ прямо сейчас!</p>
        <button 
          className={styles.shoppingButton}
          onClick={() => navigate(Routes.MAIN)}
        >
          Перейти к покупкам
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Мои заказы</h1>
          <span className={styles.count}>{orders.length} заказов</span>
        </div>
        <button 
          className={styles.clearButton}
          onClick={handleClearOrders}
        >
          Очистить историю
        </button>
      </div>

      <div className={styles.ordersList}>
        {orders.map((order, index) => (
          <div key={index} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div className={styles.orderInfo}>
                <span className={styles.orderNumber}>Заказ #{orders.length - index}</span>
                <span className={styles.orderDate}>{order.date}</span>
              </div>
              <div className={styles.orderTotal}>
                <span className={styles.totalLabel}>Итого:</span>
                <span className={styles.totalPrice}>${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.orderProducts}>
              {order.products.map((product) => (
                <div key={product.id} className={styles.orderProduct}>
                  <div className={styles.productImageWrapper}>
                    <img 
                      src={getSafeImageUrl(product.images?.[0])} 
                      alt={product.title} 
                      className={styles.productImage}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <h4 className={styles.productTitle}>{product.title}</h4>
                    <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={isClearConfirmOpen}
        message="Вы уверены, что хотите очистить историю заказов?"
        onConfirm={handleConfirmClearOrders}
        onCancel={() => setIsClearConfirmOpen(false)}
      />
    </div>
  );
};

export default OrdersPage;