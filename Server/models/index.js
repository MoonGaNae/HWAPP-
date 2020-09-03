const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.KitInfo = require('./kitInfo')(sequelize, Sequelize);
db.QuizInfo = require('./quizInfo')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.UserQuizAnswer = require('./userQuizAnswer')(sequelize, Sequelize);
db.UserKitInfo = require('./userKitInfo')(sequelize, Sequelize);

// User : KitInfo = N:M 관계의 Association Table : UserKitInfo
db.User.belongsToMany(db.KitInfo, {through: {model: db.UserKitInfo, unique: false },
                                    foreignKey: 'userId'});
db.KitInfo.belongsToMany(db.User, {through: {model: db.UserKitInfo, unique: false}, 
                                    foreignKey: 'kitCode'});
db.UserKitInfo.belongsTo(db.KitInfo, {foreignKey: 'userId'});
db.UserKitInfo.belongsTo(db.User, {foreignKey: 'kitCode'});

// KitInfo : QuizInfo = 1 : N
db.KitInfo.hasMany(db.QuizInfo, {foreignKey: 'kitCode', sourceKey: 'kitCode'});
db.QuizInfo.belongsTo(db.KitInfo, {foreignKey: 'kitCode', targetKey: 'kitCode'});

// User : QuizInfo = N : M 관계의 Association Table : UserQuizAnswer
db.User.belongsToMany(db.QuizInfo, {through: { model:db.UserQuizAnswer, unique: false}, 
                                    foreignKey: 'userId'});
db.QuizInfo.belongsToMany(db.User, {through: { model: db.UserQuizAnswer, unique: false},
                                    foreignKey: 'quizIdx'});
db.UserQuizAnswer.belongsTo(db.QuizInfo, {foreignKey: 'userId'});
db.UserQuizAnswer.belongsTo(db.User, {foreignKey: 'quizIdx'});

module.exports = db;

/*
  해커톤 Query

<users>
Insert into users(userId, userName) value('faker', '이상혁');
Insert into users(userId, userName) value('bang', '배준식');

<kitInfos>
insert into kitInfos (kitName, kitCode, kitVideoUrl) value('한글시계', 'ABC-A', 'gQHD0vSYW9g');
insert into kitInfos (kitName, kitCode, kitVideoUrl) value('스마트금고', 'ABC-B', 'gQHD0vSYW9g');


<userKitInfos>
insert into userKitInfos (userKitIdx, userId, kitCode) value(0,'faker','ABC-A');
insert into userKitInfos (userId, kitCode) value('faker','ABC-B');
insert into userKitInfos (userId, kitCode) value('bang','ABC-A');

<quizInfos>
insert into quizinfos (kitCode, question) value('ABC-A', '한글시계는 왜 만들었을까요?');

*/