const client = require("./client.js");

const createActivity = async(activityName, activityDescription) => {
  try{
    const { rows: [activity] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES ('${activityName}', '${activityDescription}')
      RETURNING *;
    `); // RETURNING is returning whats being inserting = rows
    // console.log('ROWS:', rows); // logged in the seed terminal
    // return rows; // before deconstructing the object in the array
    // console.log('ACTIVITY:', activity);
    return activity; // returns activty without [] and only the object
  } catch (error) {
    console.log(error);
  }
}

const deleteActivity = async(id) => {
  try{
    const { rows: [deletedId] } = await client.query(`
      DELETE FROM activities WHERE id = ${id}
      RETURNING *;
    `)
    // console.log('Deleted ID:', deletedId);
    return deletedId;
  } catch(error) {
    console.log(error);
  }
}

const getActivities = async() => {
  try{
    const { rows } = await client.query(`
    SELECT * FROM activities;
    `);
    // console.log('Activities ROWS:', rows); // logged in the server terminal after refreshing browser
    return rows;
  } catch(error) {
    console.log(error);
  }
}

const getActivity = async(id) => {
  try {
    const { rows: [activityId] } = await client.query(`
    SELECT * FROM activities WHERE ${id} = id;
    `);
    // console.log('Acitivity ID:', activityId);
    return activityId;
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  createActivity,
  deleteActivity,
  getActivities,
  getActivity
}