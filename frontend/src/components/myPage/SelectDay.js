import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';

const SelectDay = ({day, handleChange, lis}) => {
    return(
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">일정</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={day}
                    label="Day"
                    onChange={handleChange}
                >
                    {lis}
            </Select>
        </FormControl>
    )
}
export default SelectDay