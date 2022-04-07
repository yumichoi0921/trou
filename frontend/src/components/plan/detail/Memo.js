import { Stack, Button, TextField } from "@mui/material";

const Memo = ({ memo, setMemoState }) => {
    return (
        <Stack direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1} >
            <p>메모장</p>
            <TextField
                id="outlined-multiline-static"
                //   label="메모장"
                multiline
                rows={4}
                defaultValue={memo}
                disabled = {true}
            /> <br />
            {/* <pre>{memo}</pre> */}
            <Button variant="outlined" onClick={event => {
                event.preventDefault();
                setMemoState(false);
            }}>수정</Button>
        </Stack>
    );
};

export default Memo;