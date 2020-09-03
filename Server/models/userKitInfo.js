module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userKitInfo', {
        userKitIdx: {
            type : DataTypes.INTEGER,
            allowNull: true,
            primaryKey : true,
            autoIncrement: true
        },
        kitCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        chapterStep: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        codeStep: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        customValues: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    },{
        timestamps: false,
        paranoid: false,
    });
};