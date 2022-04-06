import {Box, Stepper, StepLabel, Step } from '@mui/material';
import Item from '../plan/child/Item';

const OrderListBar = ({route}) => {
    console.log('루트')
    console.log(route)
    console.log(route.order);
    //console.log(route.order[1]);
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={-1} alternativeLabel>
                {route.order.map((label) => (
                    <Step key={label} active={true}>
                        <Item>
                        <StepLabel>
                            <p><b>{label.place.placeName}</b></p> <br/>
                        </StepLabel>
                        </Item>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default OrderListBar;