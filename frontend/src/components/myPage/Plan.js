import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import { Fragment } from 'react';
import styles from './MyPage.module.css';


const TripPlan = ({plan, image, region}) => {
    console.log(region)
    let index = Math.floor(Math.random() * (5 - 1) + 1);
    function handleClick(planId){
        window.location.replace("/trip-detail/"+planId.planId);
    }

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
                        {image!=null?
                            <img src={image} className={styles.image}></img>:
                            <img src={`/imgs/img${index}.jpg`} className={styles.image}></img>
                        }
                    </ListItem>
                </Grid>
                <Grid item xs={8}>                                      
                    <ListItem>
                        <div className={styles.planInfo}
                            onClick={() => handleClick({planId: plan.planId})}                            
                        >
                        {region!=null?
                            <div>{region.substring(0, region.indexOf(' '))}</div>:
                            <div>{"지역없음"}</div>
                        }    
                        <div>{plan.startDate}~{plan.endDate}</div>
                        </div>
                    </ListItem>
                </Grid>
            </Grid>                       
        </Fragment>
    )
}
export default TripPlan