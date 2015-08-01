/**
 * Created by garab_000 on 19/07/2015.
 *
 * Definición del modelo de Quiz
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Quiz',
        {
            pregunta: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "->Falta pregunta"}}
            },
            respuesta: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "->Falta respuesta"}}
            },
            tema: {
                type: DataTypes.STRING,
                validate: {
                    isIn: {
                        args: [['otro', 'humanidades', 'ocio', 'ciencia', 'tecnologia']],
                        msg: "->Elija un tema"
                    }
                }
            }
        }
    );
};
