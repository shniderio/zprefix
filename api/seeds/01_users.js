/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, first_name: 'john', last_name: 'doe', username: 'user1', password: 'password1'},
    {id: 2, first_name: 'josh', last_name: 'does', username: 'user2', password: 'password2'},
    {id: 3, first_name: 'jacob', last_name: 'los', username: 'user3', password: 'password3'}
  ]);
};
