import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import { Fragment } from 'react';
import styles from './MyPage.module.css';
import Plan from './Plan';

const TripPlan = ({plan, getTripDetail}) => {
    return(
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <ListItem>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Check me"/>
                    </ListItem>
                </Grid>
                <Grid item xs={3}>
                    <ListItem>
                        <div className={styles.image}>
                        </div>
                    </ListItem>
                </Grid>
                <Grid item xs={8}>
                    <ListItem>
                        <div className={styles.planInfo}
                            onClick={() => 
                                //getTripDetail(plan.id);
                                console.log("clicked")
                            }
                        >
                            <div>{plan.text}</div>
                            <div>{plan.startDate}~{plan.endDate}</div>
                        </div>
                    </ListItem>
                </Grid>
            </Grid>                       
        </Fragment>
    )
}
export default TripPlan