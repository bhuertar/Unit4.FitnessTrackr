const express = require('express');
const app = express();
const PORT = 3000;
const { getActivities, getActivity, createActivity, deleteActivity } = require('./db/activities.js');
const { getRoutines, getRoutine, createRoutine, deleteRoutine } = require('./db/routines.js');
const { getRoutinesAndActivities, createRoutinesActivities } = require('./db/routines_activities.js');

const client = require('./db/client.js');
client.connect();

// urlencoded request
app.use(express.urlencoded({extended: true}));
// json(raw) request
app.use(express.json());

// TESTING SERVER
app.get('/', (req, res) => {
  res.send('HELLO');
});

// Acvitivities
app.get('/api/v1/activities', async(req, res, next) => {
  try {
    const activities = await getActivities();
    res.send(activities);
  } catch(error) {
    next({
      name: 'Unfound Activities',
      message: 'We lost all of the activities'
    });
  }
});

app.get('/api/v1/activities/:activityId', async(req, res) => {
  try{
    const { activityId } = req.params;
    // console.log('Activity ID:', activityId);
    const activity = await getActivity(activityId);
    res.send(activity);
  } catch(error) {
    console.log(error);
  }
});

app.post('/api/v1/activities', async(req, res) => {
  const { name, description } = req.body;
  // console.log('REQ.BODY:', req.body); // logs in server terminal when inputed through postman
  const createdActivity = await createActivity(name, description);
  res.status(201).send(createdActivity); // returns info in postman terminal
});

app.delete('/api/v1/activities/:activityId', async(req, res) => {
  try {
    const { activityId } = req.params;
    const deletedActivity = await deleteActivity(activityId);
    res.send(deletedActivity);
  } catch(error) {
    console.log(error);
  }
});

// Routines
app.get('/api/v1/routines', async(req, res) => {
  try {
    const routines = await getRoutines();
    res.send(routines);
  } catch(error) {
    console.log(error);
  }  
});

app.get('/api/v1/routines/:routineId', async(req, res) => {
  try {
    const { routineId } = req.params;
    const routine = await getRoutine(routineId);
    res.send(routine);
  } catch(error) {
    console.log(error);
  }
});

app.post('/api/v1/routines', async(req, res) => { 
  try {
    const { is_public, name, goal } = req.body;
    const createdRoutine = await createRoutine(is_public, name, goal);
    res.send(createdRoutine);
  } catch(error) {
    console.log(error);
  }
});

app.delete('/api/v1/routines/:routineId', async(req, res) => {
  try {
    const { routineId } = req.params;
    const deletedRoutine = await deleteRoutine(routineId);
    res.send(deletedRoutine);
  } catch(error) {
    console.log('Error Occurred At app.delete', error);
  }
});

// Routines_Activities
app.get('/api/v1/routines_activities', async(req, res) => {
  try {
    const routinesAndActivities = await getRoutinesAndActivities();
    res.send(routinesAndActivities);
  } catch(error) {
    console.log(error);
  }  
});

app.post('/api/v1/routines_activities', async(req, res) => {
  try {
    // console.log('Req Body:', req.body);
    const { routine_id, activity_id } = req.body;
    const createdRoutineActivities = await createRoutinesActivities(routine_id, activity_id);
    res.send(createdRoutineActivities);
  } catch(error) {
    console.log(error);
  }
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));