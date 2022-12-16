import bcrypt from 'bcryptjs';

export default function(sequelize, DataTypes) {
  const user = sequelize.define(
    'user',
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  // eslint-disable-next-line no-shadow
  user.beforeSave(async user => {
    try {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        // eslint-disable-next-line no-param-reassign
        user.password = hash;
      }
    } catch (err) {
      throw new Error(err);
    }
  });

  // eslint-disable-next-line func-names
  user.prototype.isValidPassword = async function(pw) {
    try {
      return await bcrypt.compare(pw, this.password);
    } catch (err) {
      throw new Error(err);
    }
  };

  return user;
}
