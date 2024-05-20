import { AppBar, Box, Button, IconButton, Stack, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react';
import "./form.css";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Homescreen = () => {
  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));  
  return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar> 
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
        
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Event Application
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
            <div className='FORM'>
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Event Name" variant="outlined" />
    </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
      
        <DateTimePicker
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          
      
        />
        <DemoItem label="DateRangePicke" component="DateRangePicker">
          <DateRangePicker defaultValue={[today, tomorrow]} minDate={tomorrow} />
        </DemoItem>
        <DemoItem label="DateTimeRangePicker" component="DateTimeRangePicker">
          <DateTimeRangePicker defaultValue={[today, tomorrow]} minDate={tomorrow} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="success">
        SUBMIT
      </Button>
    </Stack>
            </div>
        </div>
    )
}
export default Homescreen;