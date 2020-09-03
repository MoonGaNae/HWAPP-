module.exports = (sequelize, DataTypes) => {
    return sequelize.define('quizInfo', {
        quizIdx: {
            type : DataTypes.INTEGER,
            allowNull: true,
            primaryKey : true,
            autoIncrement: true
        },
        kitCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        question: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    },{
        timestamps: false,
        paranoid: false,
    });
};