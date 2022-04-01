import Plan from './Plan';
import Button from "@mui/material/Button";
import styles from './MyPage.module.css';
import axios from "axios";

const MyPage = async () => {
    const userId = '1';
    const objects = await axios.get("/plan/" + userId);
    const plans = objects.data;
    console.log(plans);

    return(
        <div>
            <Button className={styles.button} variant="text">삭제</Button>
            {plans.map((plan)=>(
                <Plan key={plan.planId} plan={plan} />
            ))}
        </div>
    )
}
export default MyPage