const client = require('./client.js');

const createRoutines = async(is_Public, routineName, routineGoal) => {
  try{
    await client.query(`
      INSERT INTO routines(is_public, name, goal)
      VALUES ('${is_Public}', '${routineName}', '${routineGoal}')
    `)
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  createRoutines
}