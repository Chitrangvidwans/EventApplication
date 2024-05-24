
import './App.css';
import { useSession , useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';





function App() {

    const [eventName, setEventName] = useState('');
    const [start, setStartDate] = useState(new Date());
    const [end, setEndDate] = useState(new Date());
    const [Description, setDescription] = useState('');
  
  
      console.log({
        eventName,
        start,
        end,
        Description
      });




  const session= useSession();
  const supabase= useSupabaseClient();
const { isloading } = useSessionContext();

  if (isloading)
  {

return <></>
  }


  async function googleSignIn(){
    const { error } = await supabase.auth.signInWithOAuth({
      provider:'google'
      ,
      options: {
        scopes:'https://www.googleapis.com/auth/calendar'
      }
    });
    if(error){
      alert("error logging into google provider with supabase");
      console.log(error);
    }
  }
  async function signOut(){
    await supabase.auth.signOut();
  }
  async function createCalendarEvent() {
    console.log("adding event");
    const event = {
      'summary': 'eventName',
      'description': 'EventDescription',
      'start': {
        'dateTime': `2020-10-31T17:00:00.000`,
        'timeZone': 'GMT+05:30'//startDate.toISOString(),
         //Intl.DateTimeFormat().resolvedOptions().timeZone
      }
,
      'end': {
        'dateTime': `2020-10-31T17:00:00.000`,
        'timeZone': 'GMT+05:30'
        // 'dateTime': endDate.toISOString(),
        // 'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }

    }
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Authorization':'Bearer ' + session.provider_token
      },
      body: JSON.stringify(event)
  
  }).then((data) => {
    return data.json();
   }).then((data) => {
    console.log(data);
    alert("check your google calendar for the event!")
   });
  }
  console.log(session);

  return (
    <div className="App">
      <div style={{width:"400px",margin:"30px auto",border:"1px solid green", padding:"5vw", borderRadius:15, backgroundColor:'white'}}>
      {session ? 
      <>
      <h2>Welcome {session.user.email}</h2> 
      

      <Button variant="contained" color='error' onClick={()=> signOut()}>Sign Out</Button>

      <hr />
   
      
      <Container maxWidth="sm">
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

    </Grid>
          <Grid item xs={12} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker disablePast label="End date " onChange={(date) => setEndDate(date.toDate())} />
      </DemoContainer>
    </LocalizationProvider>

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

          <Button type="submit" variant="contained" color="primary" onClick={()=> createCalendarEvent()}>
              Submit
            </Button>

          </Grid>
        </Grid>
    
    </Container>

      
      
      </>
      :
      <>
      
      <Button variant="contained" color='success' onClick={()=> googleSignIn()}>Sign In With google </Button>
     
      </>
}
    </div>
    </div>
  );
}

export default App;
