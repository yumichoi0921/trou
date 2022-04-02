import {Stack, Button} from "@mui/material";

const ModifyMemo = ({memo, setMemoState, setMemo}) => {
    const handleChange = (event) => {
        setMemo(event.target.value);
    };

    return (
        <form>
            <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1} >
                <p>메모장</p>
                <textarea value={memo} onChange={(e) => handleChange(e)}></textarea>
                {/* <TextareaAutosize
                    aria-label="minimum height"
                    minRows={10}
                    style={{ width: '90%' }}
                /> */}
                <Button variant="contained" onClick={event => {
                    event.preventDefault();
                    setMemoState(true);
                }}>완료</Button>
            </Stack>
        </form>
    );
};

export default ModifyMemo;
