import styles from './MyPage.module.css';
import background from './background.png';

const Place = ({order}) => {
    return(
        <div className={styles.placeContainer}>
            <img src={order.place.image} alt="Logo" className={styles.placeImage}></img>
            <div className={styles.placeName}>{order.place.placeName}</div>
            <div>점수: {order.place.averageScore}</div>
        </div>
    )
}
export default Place