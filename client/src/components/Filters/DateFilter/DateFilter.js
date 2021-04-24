import 'date-fns';
import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './DateFilter.css';

export const DateFilter = (props) => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(new Date());

  const handleDateChangeDateFrom = (date) => {
    setDateFrom(date);
  };

  const handleDateChangeDateTo = (date) => {
    setDateTo(date);
  };

  return (
    <div className='date-filter'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container direction="column">
                <Typography>Release Dates</Typography>
                <KeyboardDatePicker
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-dialog1"
                label="from"
                value={dateFrom}
                onChange={handleDateChangeDateFrom}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
                <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="to"
                format="MM/dd/yyyy"
                value={dateTo}
                onChange={handleDateChangeDateTo}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    </div>
  );
}
