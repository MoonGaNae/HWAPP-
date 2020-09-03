const express = require('express');
const NodeCache = require( "node-cache" );

const kitCache = new NodeCache();

// DB 모델들
const {User, KitInfo, QuizInfo, UserQuizAnswer, UserKitInfo} = require('../models');
const userKitInfo = require('../models/userKitInfo');

const router = express.Router();



// 키트정보가져오기
router.get('/getKitInfo', async (req, res, next) =>{
    const userId = req.query.userId;
    const key = 'kitInfo' + userId;

    console.log(kitCache.get(key));
    if(kitCache.has(key)){
        console.log("캐쉬" + kitCache.get(key));
        res.send(kitCache.get(key));
    }
    else{
        try{
            const userKitInfo = await KitInfo.findAll({
                include : [{
                    model : User,
                    through: { attributes: []},
                    where: { userId: userId },
                    attributes: []
                }],
                attributes: ['kitName', 'kitCode']
            });
            console.log("query 결과 : " , JSON.stringify(userKitInfo));
            kitCache.set(key, JSON.stringify(userKitInfo),3600)

            res.json(userKitInfo);
        } catch(error) {
            console.error(error);
            return next(error);
        }
    }
});

//chpater Step 가져오기
router.get('/getChapterStep', async (req, res, next) => {
    try{
        const chapterStep = await UserKitInfo.findOne({
            attributes : ['chapterStep'],
            where : {userId:req.query.userId, kitCode:req.query.kitCode}
        });
        res.json(chapterStep);
    } catch(error) {
        console.log(error);
        return next(error);
    }
});

//Code Step  가져오기   
router.get('/getCodeStep', async (req, res, next) => {
    try{
        const codeStep = await UserKitInfo.findOne({
            attributes : ['codeStep'],
            where : {userId:req.query.userId, kitCode:req.query.kitCode}
        });
        res.json(codeStep);
    } catch(error) {
        console.log(error);
        return next(error);
    }
});

//키트동영상 URL 가져오기
router.get('/getKitVideoURL', async (req, res, next) => {
    try{
        const url = await KitInfo.findOne({
            attributes : ['kitVideoURL'],
            where : {kitCode:req.query.kitCode}
        });
        res.json(url);
    } catch(error){
        console.log(error);
        return next(error);
    }
});

// Quiz 정보 가져오기
router.get('/getQuizIdx', async (req, res, next) => {
    try{
        const quizInfo = await QuizInfo.findAll({
            attributes : [ 'quizIdx'],
            where : {
                kitCode : req.query.kitCode
            }
        });
        return res.json(quizInfo);
    } catch (error){
        console.log(error);
        return next(error);
    }
});

// Quiz 질문 가져오기
router.get('/getQuizQuestion', async (req, res, next) => {
    try{
        const question = await QuizInfo.findOne({
            attributes : ['question'],
            where : {
                quizIdx : req.query.quizIdx
            }
        });
        return res.json(question);
    } catch (error){
        console.log(error);
        return next(error);
    }
});

// Custom Value 가져오기
router.get('/getCustomValues', async (req, res, next) => {
    try{
        const customValues = await UserKitInfo.findOne({
            attributes : ['customValues'],
            where : {
                userId : req.query.userId,
                kitCode : req.query.kitCode
            }
        });
        return res.json(customValues);

    } catch (error) {
        console.log(error);
        return next(error);
    }
});

// 사용자키트등록
router.post('/registUserKit', async (req, res, next) => {
    try{
        const key = 'kitInfo' + req.body.userId;
        const userKit = await UserKitInfo.create({
            userId : req.body.userId,
            kitCode : req.body.kitCode
        });

        
        const kitInfo = await KitInfo.findOne({
            where: { kitCode: req.body.kitCode },
            attributes: ['kitName', 'kitCode']
        });
        var after = new Array();
        
        if (kitCache.has(key)) {
            var previous = JSON.parse(kitCache.take(key));
            after = previous;    
        }
        after.push(JSON.parse(JSON.stringify(kitInfo)));
        console.log(after);
        kitCache.set(key, JSON.stringify(after), 3600)

        res.send();

    } catch(error){
        console.log(error);
        return next(error);
    }
});

// Quiz 답변등록
router.post('/registQuizAnswer', async (req, res, next) => {
    try{
        const userKit = await UserQuizAnswer.create({
            userId : req.body.userId,
            quizIdx : req.body.quizIdx,
            answer : req.body.answer
        });
        res.send();
    } catch(error){
        console.log(error);
        return next(error);
    }
});

// chpater Step 증가
router.patch('/updateChapterStep', async (req, res, next) => {
    try{
        console.log(req.body.step);
        const chapterStep = await UserKitInfo.update({
            chapterStep : req.body.step
        },{
            where : {
                userId : req.body.userId,
                kitCode : req.body.kitCode
            }
        });
        res.send();
    } catch (error){
        console.log(error);
        return next(error);
    }
});

// Code Step 증가
router.patch('/updateCodeStep', async (req, res, next) => {
    try{
        const chapterStep = await UserKitInfo.update({
            codeStep : req.body.step
        },{
            where : {
                userId : req.body.userId,
                kitCode : req.body.kitCode
            }
        });
        res.send();
    } catch (error){
        console.log(error);
        return next(error);
    }
});

//Custom Value update
router.patch('/updateCustomValues', async (req, res, next) => {
    try{
        const customValues = await UserKitInfo.update({
            customValues : req.body.customValues
        },{
            where : {
                userId : req.body.userId,
                kitCode : req.body.kitCode
            }
        });
        res.send();
    } catch (error){
        console.log(error);
        return next(error);
    }
});

// userKitInfo 전체지우기
router.delete('/deleteUserKitInfo', async (req, res, next) => {

    try{
        kitCache.flushAll();
        const userKitInfo = await UserKitInfo.destroy({ force: true,truncate: true });
        res.send();
    } catch (error){
        console.log(error);
        return next(error);
    }
});


module.exports = router;
