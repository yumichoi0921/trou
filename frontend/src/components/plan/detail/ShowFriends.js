import { Avatar, Grid } from "@mui/material";
import { React } from "react";
import { deepOrange, deepPurple } from '@mui/material/colors';

const ShowFriends = ({friend}) => {

    function stringToColor(string) {
        let hash = 0;
        let i;
    
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
    
        let color = '#';
    
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
    
        return color;
    }
    
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name[0]}`,
        };
    }

    return(
        <Grid item xs={6}>
            <span>
            <Avatar {...stringAvatar(friend)} /> 
            {friend}
            </span>
        </Grid> 
    );
};

export default ShowFriends;