var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Quiz'});
});
/* GET author page. */
router.get('/author', function (req, res) {
    res.render('author', {title: 'Autores',autor: 'Homero Simpson',video: "https://www.youtube.com/embed/eW9gt6g8ZAU"});
});

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

module.exports = router;
