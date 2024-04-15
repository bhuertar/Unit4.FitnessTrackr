const client = require('./client.js');

const createRoutine = async(is_Public, routineName, routineGoal) => {
  try{
    const { rows: [routine] } = await client.query(`
      INSERT INTO routines(is_public, name, goal)
      VALUES ('${is_Public}', '${routineName}', '${routineGoal}')
      RETURNING *;
    `)
    console.log(routine);
    return routine;
  } catch(error) {
    console.log(error);
  }
}

const deleteRoutine = async(id) => {
  try{
    const { rows: [deletedId] } = await client.query(`
      DELETE FROM routines WHERE id = ${id}
      RETURNING *;
    `)
    console.log('Deleted ID:', deletedId);
    return deletedId;
  } catch(error) {
    console.log('Error Occurred At deleteRoutine', error);
  }
}

const getRoutines = async() => {
  try{
    const { rows } = await client.query(`
    SELECT * FROM routines;
    `);
    return rows;
  } catch(error) {
    console.log(error);
  }
}

const getRoutine = async(id) => {
  try {
    const { rows: [routineId] } = await client.query(`
      SELECT * FROM routines WHERE ${id} = id;
    `);
    return routineId;
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  createRoutine,
  deleteRoutine,
  getRoutines,
  getRoutine
}