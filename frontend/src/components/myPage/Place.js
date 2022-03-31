import styles from './MyPage.module.css';
import background from './background.png';

const Place = ({order}) => {
    return(
        <div className={styles.placeContainer}>
            <img src={background} alt="Logo" className={styles.placeImage}></img>
            <div className={styles.placeName}>{order.place}</div>
        </div>
    )
}
export default Place