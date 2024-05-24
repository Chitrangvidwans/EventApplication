import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


function EventForm() {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [Description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    

    console.log({
      eventName,
      startDate,
      endDate,
      Description
    });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Event Name"
              fullWidth
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker disablePast label="Start date " onChange={(date) => setStartDate(date.toDate())} />
      </DemoContainer>
    </LocalizationProvider>
            {/* <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              timeFormat="HH:mm"
              timeIntervals={15}  
              className="form-control"
            /> */}
          </Grid>
          <Grid item xs={12} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker disablePast label="End date " onChange={(date) => setEndDate(date.toDate())} />
      </DemoContainer>
    </LocalizationProvider>
            {/* <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="Pp"
              timeFormat="HH:mm"
              timeIntervals={15}
              className="form-control"
            /> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default EventForm;
