import {Box, Stepper, StepLabel, Step } from '@mui/material';
import Item from '../child/Item';

const OrderListBar = ({orderList}) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={-1} alternativeLabel>
                {orderList.map((label) => (
                    <Step key={label} active={true}>
                        <Item>
                        <StepLabel>
                            <p><b>{label.place.placeName}</b></p> <br/>
                            시작 시간 : {label.startTime} <br/>
                            종료 시간 : {label.endTime} 
                        </StepLabel>
                        </Item>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default OrderListBar;