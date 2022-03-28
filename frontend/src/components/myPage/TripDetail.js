import styles from './MyPage.module.css';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import { Fragment } from 'react';


const TripDetail = (plan, routes, orders) => {
    
    return(
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ListItem>
                        <div className={styles.image}>
                        </div>
                    </ListItem>
                </Grid>
                <Grid item xs={8}>
                    <ListItem>
                        <div className={styles.planInfo} >
                            <div>{plan.text}</div>
                            <div>{plan.startDate}~{plan.endDate}</div>
                            <div>{routes}</div>
                            <div>{orders}</div>
                        </div>
                    </ListItem>
                </Grid>
            </Grid>                       
        </Fragment>
    )
}
export default TripDetail