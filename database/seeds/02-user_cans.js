
exports.seed = function(knex) {
      return knex('user_cans').insert([
        {user_id: 1, can_id: 1},
        {user_id: 1, can_id: 2},
        {user_id: 2, can_id: 3}
      ]);
};
