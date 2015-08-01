/**
 * Created by garab_000 on 14/06/2015.
 */

var models = require('../models/models.js');

// Autoload :id
exports.load = function (req, res, next, quizId) {
    models.Quiz.find(quizId).then(function (quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else {
                next(new Error('No existe quizId=' + quizId))
            }
        }
    ).catch(function (error) {
            next(error)
        });
};

// GET quizes/index

exports.index = function (req, res) {
    var options = {};
    options.order = [['pregunta', 'ASC']];
    if (req.query.search) {
        var busqueda = '%' + req.query.search.replace(' ', '%') + '%';
        options.where = {pregunta: {like: busqueda}};
    }
    models.Quiz.findAll(options).then(function (quizes) {
        res.render('quizes/index', {quizes: quizes, errors: []});
    }).catch(function (error) {
        next(error);
    });
};

// GET quizes/show

exports.show = function (req, res) {
    res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET quizes/answer

exports.answer = function (req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

// GET quizes/new

exports.new = function (req, res) {
    var quiz = models.Quiz.build({pregunta: 'Pregunta', respuesta: 'Respuesta'});//Crear el objeto quiz
    res.render('quizes/new', {quiz: quiz, errors: []});
}

// POST quizes/create

exports.create = function (req, res) {
    var quiz = models.Quiz.build(req.body.quiz); //creamos el objeto Quiz con el objeto quiz recibido en el body del request

    //guardamos el objeto en la BD
    quiz.validate().then(function (err) {
        if (err) {
            res.render('quizes/new', {quiz: quiz, errors: err.errors});
        } else {
            quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function () {
                res.redirect('/quizes');
            });
        }
    })

}

// GET quizes/edit

exports.edit = function (req, res) {
    var quiz = req.quiz;//Autoload de quiz

    res.render('quizes/edit', {quiz: quiz, errors: []});
}

// PUT quizes/id

exports.update = function (req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema;

    //guardamos el objeto en la BD
    req.quiz.validate().then(function (err) {
        if (err) {
            res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
        } else {
            req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function () {
                res.redirect('/quizes');
            });
        }
    })

}

// DELETE quizes/id

exports.destroy = function (req, res) {
    req.quiz.destroy().then(function () {
        res.redirect('/quizes');
    }).catch(function (error) {
        next(error)
    });
};