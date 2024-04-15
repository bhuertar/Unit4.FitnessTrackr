const express = require('express');
const app = express();
const PORT = 3000;
const { getActivities, getActivity, createActivity, deleteActivity } = require('./db/activities.js');

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

app.get('/api/v1/activities', async(req, res, next) => {
  try {
    const activities = await getActivities();
    res.send(activities);
  } catch(error) {
    next({
      name: 'Unfound Owners',
      message: 'We lost all of the owners'
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

// Couldn't get delete to work
// app.delete('/api/v1/activities/:activityId', (req, res) => {
//   try {
//     const { activityId } = req.params;
//     const deletedActivity = deleteActivity(activityId);
//     res.send(deletedActivity);
//   } catch(error) {
//     console.log(error);
//   }
// });

app.listen(PORT, () => console.log(`listening on port ${PORT}`));