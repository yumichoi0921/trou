import {InputLabel, FormControl, Select} from "@mui/material";

const SelectDay = ({ day , lis , handleChange}) => {
    return (
        <FormControl fullWidth>
            {/* 월 일 리스트 가져와서 출력하기 + 일차 바뀌면 바뀐거 반영되야함 */}
            <InputLabel id="demo-simple-select-label">날짜</InputLabel>
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
    );
};

export default SelectDay;