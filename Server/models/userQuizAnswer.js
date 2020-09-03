module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userQuizAnswer', {
        answerIdx: {
            type : DataTypes.INTEGER,
            allowNull: true,
            primaryKey : true,
            autoIncrement: true
        },
        quizIdx: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        userId: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        answer: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    },{
        timestamps: false,
        paranoid: false,
    });
};