const client = require('./client.js');

const createRoutines_Activities = async(routine_id, activity_id) => {
  try {
    await client.query(`
      INSERT INTO routines_activities(routines_id, activities_id)
      VALUES ('${routine_id}', '${activity_id}')
    `)
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createRoutines_Activities
}