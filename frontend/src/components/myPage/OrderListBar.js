import {Box, Stepper, StepLabel, Step } from '@mui/material';
import Item from '../plan/child/Item';

const OrderListBar = ({route}) => {
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