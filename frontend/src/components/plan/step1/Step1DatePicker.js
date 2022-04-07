import * as React from "react";
import krLocale from "date-fns/locale/ko";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function LocalizedDatePicker(props) {
  const [date, setDate] = React.useState(new Date(props.date));
  React.useEffect(() => {
    props.setDate(date);
    console.log(date);
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={krLocale}>
      <div>
        <DatePicker
          value={date}
          onChange={setDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}
