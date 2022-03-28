import Plan from './Plan';
import Button from "@mui/material/Button";
import styles from './MyPage.module.css';

const MyPage = ({plans}) => {
    console.log("hello");
    return(
        <div>
            <Button className={styles.button} variant="text">삭제</Button>
            {plans.map((plan)=>(
                <Plan key={plan.id} plan={plan} />
            ))}
        </div>
    )
}
export default MyPage