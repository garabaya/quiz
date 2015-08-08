/**
 * Created by garab_000 on 05/08/2015.
 *
 * Definición del modelo de Comment
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Comment',
        {
            texto: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "->Falta comentario"}}
            },
            publicado: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    );
};