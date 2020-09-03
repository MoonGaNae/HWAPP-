module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        userId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            primaryKey : true,
        },
        userName: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },{
        timestamps: false,
        paranoid: false,
    });
};