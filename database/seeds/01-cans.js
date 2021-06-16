
exports.seed = function(knex) {

      return knex('user_services').insert([
        {can_id: 1, can_name: 'test greeting', can_text: 'hello, this is the text of your greeting can'},
        {can_id: 2, can_name: 'hold', can_text: 'just a moment please'},
        {can_id: 3, can_name: 'closing', can_text: 'looks like you have stepped away, please hop back on a chat if you have more questions.'}
      ]);
};
