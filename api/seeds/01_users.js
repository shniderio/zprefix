
const bcrypt = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  const hashedPassword1 = await bcrypt.hash('password1',12);
  const hashedPassword2 = await bcrypt.hash('password2',12);
  const hashedPassword3 = await bcrypt.hash('password3',12);


  await knex('users').insert([
    {id: 1, first_name: 'john', last_name: 'doe', username: 'user1', password: hashedPassword1},
    {id: 2, first_name: 'josh', last_name: 'does', username: 'user2', password: hashedPassword2},
    {id: 3, first_name: 'jacob', last_name: 'los', username: 'user3', password: hashedPassword3}
  ]);

  
  await knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
};
