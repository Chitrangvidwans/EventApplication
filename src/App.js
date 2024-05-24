
import './App.css';
import Homescreen from './pages/Homescreen';
import EventForm from './pages/EventForm';
import { useSession , useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import Formyt from './pages/Formyt';
import { Button} from '@mui/material';



function App() {
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
  async function AddEvent() {
    console.log("adding event");
    const event = {
      'summary': 'eventName',
      'description': 'EventDescription',
      'startDate': {
        'dateTime': startDate.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
,
      'endDate': {
        'dateTime': endDate.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }

    }
    await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events',{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
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
      <EventForm/>
      <Button type="submit" variant="contained" color="primary" onClick={()=> AddEvent()}>
              Submit
            </Button>
      
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
