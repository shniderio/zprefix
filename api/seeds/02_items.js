/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {id: 1, user_id: '1', item_name:'item 1', description: 'item1 description', quantity: '100'},
    {id: 2, user_id: '2', item_name:'item 2', description: 'item2 description', quantity: '100'},
    {id: 3, user_id: '3', item_name:'item 3', description: 'item3 description', quantity: '100'}
  ]);
  await knex.raw(`SELECT setval('items_id_seq', (SELECT MAX(id) FROM items) + 1);`)
};
