module.exports = (sequelize, DataType) => {
  const Reviews = sequelize.define("Reviews", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    description: {
      type: DataType.TEXT,
      allowNull: true,
    },

    rate: {
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: 0,
      // 0 = no rating (older reviews), 1-5 = stars
      validate: {
        min: 0,
        max: 5,
      },
    },

    recipe_id: {
      type: DataType.INTEGER,
      references: {
        model: "recipes",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    user_id: {
      type: DataType.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  // {
  //   classMethods: {
  //     associate: (models) => {
  //       Reviews.belongsTo(models.Recipes, {
  //         foreignKey: "recipe_id",
  //       });
  //       Reviews.belongsTo(models.Users, {
  //         foreignKey: "user_id",
  //         as: "user", // <--- This alias must match the one used in your query
  //       });
  //     },
  //   },
  // }

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Users, { foreignKey: "user_id", as: "user" });
    Reviews.belongsTo(models.Recipes, { foreignKey: "recipe_id" });
  };

  return Reviews;
};
