// put bookshelf schemas here
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8'
    }
});

const db = require('bookshelf')(knex);
db.plugin('pagination');

db.knex.schema.hasTable('user').then((exists) => {
    if (!exists) {
        db.knex.schema.createTable('user', (user) => {
            user.increments('id').primary();

            /**
             * Users will log in with either Google or Facebook, not both. Record the provider
             * and the provider id
             */
            user.string('oauth_provider', 20).notNullable();
            user.string('provider_id', 50).notNullable();
            
            user.string('display_name', 100).notNullable();
            user.string('img_url', 250);
            user.string('contact_number', 15);
            user.string('email', 100);
            user.string('bio', 280);
            user.integer('age');
            /**
             * Using user.timestamps, we shouldn't need to specify created_at and updated_at separately
             */
            user.timestamps();
            // user.date('created_at');
            // user.date('updated_at');
        }).then( table => {
            console.log('Created new "user" table', table);
        });
    }
});

db.knex.schema.hasTable('event').then( exists => {
    if (!exists) {
        db.knex.schema.createTable('event', event => {
            event.increments('id').primary();
            event.string('title').notNullable();
            event.string('description').notNullable();
            event.date('date_time', 100).notNullable();
            event.boolean('full');
            event.integer('needs');
            event.string('category').references('category.id');
            event.string('img_url', 250);
            event.string('location');
            event.integer('skill_level');
            event.string('habitat', 60);
            event.timestamps();
        }).then( table => {
            console.log('Created new "event" table', table);
        })
        .catch(err => console.log('Error creating event table.', err));
    }
});

db.knex.schema.hasTable('attendee').then( exists => {
    if (!exists) {
        db.knex.schema.createTable('attendee', attendee => {
            attendee.increments('id').primary();
            attendee.integer('event_id').references('event.id');
            attendee.integer('user_id').references('user.id');
            attendee.string('flag', 60).notNullable();
            attendee.timestamps();
        }).then( tables => {
            console.log('Created new "attendee" table', table);
        })
    }
});

db.knex.schema.hasTable('user_rating').then( exists => {
    if (!exists) {
        db.knex.schema.createTable('user_rating', userRating => {
            userRating.increments('id').primary();
            userRating.integer('rater_id').references('user.id');
            userRating.integer('ratee_id').references('user.id');
            userRating.integer('rating');
            userRating.timestamps();
        }).then( table => {
            console.log('Created new "user_rating" table', table);
        });
    }
});

db.knex.schema.hasTable('skill_rating').then( exists => {
    if (!exists) {
        db.knex.schema.createTable('skill_rating', skillRating => {
            skillRating.increments('id').primary();
            skillRating.integer('user_id').references('user.id');
            skillRating.integer('tag_id').references('tag.id');
            skillRating.integer('rating');
            skillRating.timestamps();
        }).then( table => {
            console.log('Created new "skill_rating" table', table);
        });
    }
});

db.knex.schema.hasTable('tag').then( exists => {
    if (!exists) {
        db.knex.schema.createTable('tag', tag => {
            tag.increments('id').primary();
            tag.string('tag', 60).notNullable();
            tag.timestamps();
        }).then( table => {
            console.log('Created new "tag" table', table);
        });
    }
});

db.knex.schema.hasTable('event_tag').then( exists => {
    if (!exists) {
        db.knex.schema.createTable('event_tag', eventTag => {
            eventTag.increments('id').primary();
            eventTag.integer('event_id').references('event.id');
            eventTag.integer('tag_id').references('tag.id');
            eventTag.timestamps();
        }).then( table => {
            console.log('Created new "event_tag" table', table);
        });
    }
});

db.knex.schema.hasTable('category').then( exists => {
    if (!exists) {
        db.knex.schema.createTable('category', category => {
            category.increments('id').primary();
            category.string('category');
            category.timestamps();
        }).then( table => {
            console.log('Created new "category" table', table);
        });
    }
});

module.exports = db; 
