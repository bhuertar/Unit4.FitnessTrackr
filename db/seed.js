const client = require('./client.js');
const { createActivity } = require('./activities.js');
const { createRoutines } = require('./routines.js');
const { createRoutines_Activities } = require('./routines_activities.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS routines_activities;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
    `)
  } catch (error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query (`
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );

      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        is_public BOOLEAN NOT NULL  ,
        name VARCHAR(20) NOT NULL,
        goal INTEGER NOT NULL
      );

      CREATE TABLE routines_activities (
        id SERIAL PRIMARY KEY,
        routines_id INT REFERENCES routines(id),
        activities_id INT REFERENCES activities(id)
      )
    `)
  } catch (error) {
    console.log(error);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log('CONNECTED');

  await dropTables();
  console.log(`TABLES DELETED`);
  
  await createTables();
  console.log('TABLES CREATED');

  await createActivity('Chest Workouts', 'workouts for chest'); //1
  await createActivity('Arm Workouts', 'workouts for arms'); //2
  await createActivity('Leg Workouts', 'workouts for legs'); //3
  await createActivity('Abs Workouts', 'workouts for abs'); //4
  console.log('ACTIVITIES CREATED');

  await createRoutines(true, 'push ups', 10); //1
  await createRoutines(false, 'bench press', 12); //2
  await createRoutines(false, 'dumbells', 15); //3
  await createRoutines(true, 'squats', 12); //4
  await createRoutines(false, 'leg press', 15); //5
  await createRoutines(true, 'sit ups', 10); //6
  console.log('ROUTINES CREATED');

  await createRoutines_Activities(1, 1);
  await createRoutines_Activities(2, 1);
  await createRoutines_Activities(3, 2);
  await createRoutines_Activities(4, 3);
  await createRoutines_Activities(5, 3);
  await createRoutines_Activities(6, 4);
  console.log('ROUTINES_ACTIVITIES CREATED');

  await client.end();
  console.log('DISCONNECTED');
}

syncAndSeed();