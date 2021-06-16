exports.up = function(knex) {
    return knex.schema
      .createTable('users', tbl => {
        tbl.increments();
        tbl.string('username', 128)
            .notNullable()
            .unique()
            .index();
        tbl.string('password', 256)
            .notNullable();
      })
      
      .createTable('cans', tbl => {
        tbl.increments();
        tbl.integer('can_id')
        tbl.string('can_name', 128)
            .notNullable();
        tbl.string('can_test')
      })

      .createTable('user_cans', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('users.id');
        tbl.integer('can_id')
            .unsigned()
            .notNullable()
            .references('cans.id');
      })
  };
  
  exports.down = function(knex) {
      return knex.schema
        .dropTableIfExists('user_cans')
        .dropTableIfExists('cans')
        .dropTableIfExists('users');
     
    
  };