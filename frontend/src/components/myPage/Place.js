import styles from './MyPage.module.css';
import { Fragment } from 'react';
import { Rating } from '@mui/material';
import { Typography } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Box } from '@mui/material';


const Place = ({route}) => {
    console.log("place")
    console.log(route)
    let index = Math.floor(Math.random() * (5 - 1) + 1)

    function handleChange(){
        console.log("clicked")
    }

    return(
        <div>
            {route.order.map((o) => (
                <Fragment>
                    {
                        o.place.image==null?
                        <Box className={styles.tripContent}>
                            <img src={`/imgs/img${index}.jpg`} alt="Logo" className={styles.placeImage}></img>
                            <div className={styles.placeName}>{o.place.placeName}</div>
                            <Typography component="legend"></Typography>
                            <Rating name="read-only" value={o.place.averageScore/2} precision={0.5}/>
                        </Box>:
                        <Box className={styles.tripContent}>
                            <img src={o.place.image} alt="Logo" className={styles.placeImage}></img>
                            <div className={styles.placeName}>{o.place.placeName}</div>
                            <Typography component="legend"></Typography>
                            <Rating name="read-only" value={o.place.averageScore/2} precision={0.5}/>
                        </Box>
                    }
                </Fragment>
            ))}
        </div>
    );
}
export default Place