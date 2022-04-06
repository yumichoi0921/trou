import * as React from "react";
import krLocale from "date-fns/locale/ko";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function LocalizedDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={krLocale}>
      <div>
        <DatePicker
          value={props.date}
          onChange={(newValue) => props.setDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}
