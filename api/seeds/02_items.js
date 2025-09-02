/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {id: 1, user_id: '1', description: 'item1', quantity: '100'},
    {id: 2, user_id: '2', description: 'item2', quantity: '100'},
    {id: 3, user_id: '3', description: 'item3', quantity: '100'}
  ]);
};
