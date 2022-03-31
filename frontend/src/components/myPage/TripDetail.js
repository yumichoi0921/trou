import styles from './MyPage.module.css';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import { Fragment } from 'react';
import Collapse from '@mui/material/Collapse';
import Place from './Place';
import Schedule from "./Schedule";
import Review from "./Review";


const TripDetail = () => {
    const plan = {
        id: 1,
        text: '서울',
        startDate: '2021-03-28',
        endDate: '2021-04-01'
    };
    const orders = [
        {
          id: 1,
          routeId: 1,
          planId: '부산여행',
          place: '부산역',
          order: 1,
          review: 5
        },
        {
          id: 2,
          routeId: 1,
          planId: '부산여행',
          place: '수변공원',
          order: 2,
          review: 4
        },
        {
          id: 3,
          routeId: 1,
          planId: '부산여행',
          place: '자갈치시장',
          order: 3,
          review: 3
        },
        {
          id: 4,
          routeId: 1,
          planId: '부산여행',
          place: '해운대',
          order: 4,
          review: 2
        },
        {
          id: 5,
          routeId: 1,
          planId: '부산여행',
          place: '숙소',
          order: 5,
          review: 1
        },
        {
          id: 6,
          routeId: 2,
          planId: '부산여행',
          place: '남천동',
          order: 1,
          review: 3,
        },
        {
          id: 7,
          routeId: 2,
          planId: '부산여행',
          place: '남천동',
          order: 2,
          review: 2,
        },
        {
          id: 8,
          routeId: 2,
          planId: '부산여행',
          place: '남천동',
          order: 3,
          review: 5,
        },
        {
          id: 9,
          routeId: 2,
          planId: '부산여행',
          place: '남천동',
          order: 4,
          review: 4,
        },
        {
          id: 10,
          routeId: 2,
          planId: '부산여행',
          place: '남천동',
          order: 5,
          review: 3,
        },
    ];
    const routes = [
        {
            id: 1,
            planId: 1
        },
        {
            id: 2,
            planId: 1
        }
    ];

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
                        </div>
                        
                    </ListItem>
                </Grid>
                
                <Schedule></Schedule>
                {orders.map((order)=>(
                  <div>
                    <Place key={order.id} order={order} />
                    <Review key={order.id} score={order.review}></Review>
                  </div>
                ))}
            </Grid>                       
        </Fragment>
    )
}
export default TripDetail