module.exports = (sequelize, DataTypes) => {
    return sequelize.define('kitInfo', {
        kitCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey : true,
        },
        kitName: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        kitVideoUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        timestamps: false,
        paranoid: false,
    });
};