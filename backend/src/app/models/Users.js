let Sequelize, { Model } = require('sequelize');
let bcrypt = require('bcryptjs');

module.exports = class User extends Model {
	static init(sequelize) {
		super.init({
			name: Sequelize.STRING,
			age: Sequelize.INTEGER,
			initial_year: Sequelize.INTEGER,
			university: Sequelize.STRING,
			course: Sequelize.STRING,
			gender: Sequelize.STRING,
			shift: Sequelize.ENUM("Matutino", "Noturno"),
			bio: Sequelize.TEXT,
			search_for: Sequelize.STRING,
			email: Sequelize.STRING,
			password: Sequelize.VIRTUAL,
			password_hash: Sequelize.STRING,
			image_url: Sequelize.STRING
		},
			{
				sequelize,
			}
		);

		this.addHook('beforeSave', async (user) => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 8);
			}
		});

		return this;
	}

	static associate(models) {
		this.belongsToMany(models.Group, { foreignKey: 'user_id', through: 'users-groups', as: 'groups' });
		// this.hasMany(models.Swipe, { as: 'user_swiped' });
		// this.hasMany(models.Swipe, {foreignKey: 'user_id2', as: 'user_seen'});  
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}
}
