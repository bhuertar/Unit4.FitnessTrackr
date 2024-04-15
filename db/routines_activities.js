const client = require('./client.js');

const createRoutinesActivities = async(routine_id, activity_id) => {
  try {
    const { rows: [result] } = await client.query(`
      INSERT INTO routines_activities(routines_id, activities_id)
      VALUES ('${routine_id}', '${activity_id}')
      RETURNING *;
    `)
    return result;
  } catch (error) {
    console.log(error);
  }
}

const getRoutinesAndActivities = async() => {
  try{
    const { rows } = await client.query(`
    SELECT * FROM routines_activities;
    `);
    return rows;
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  createRoutinesActivities,
  getRoutinesAndActivities
}