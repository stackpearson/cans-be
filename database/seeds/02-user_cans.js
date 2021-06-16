
exports.seed = function(knex) {
      return knex('user_vehicles').insert([
        {user_id: 1, can_id: 1},
        {user_id: 1, can_id: 2},
        {user_id: 2, can_id: 3}
      ]);
};
