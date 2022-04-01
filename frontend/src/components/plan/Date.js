import * as React from "react";
import krLocale from "date-fns/locale/ko";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function LocalizedDatePicker() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={krLocale}>
      <div>
        <DatePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}
