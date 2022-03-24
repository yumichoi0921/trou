import styles from "./Main.module.css";

export default function Main(){


return(
    <div>
        <div className={styles.searchDiv}>
            <h2>어디로 떠나시나요?</h2>
            <input className={styles.searchBar} type="text" />
        </div>
        <div>
            <h3>이 여행은 어떠신가요??</h3>
            <div>

            </div>
        </div>
    </div>


);

}