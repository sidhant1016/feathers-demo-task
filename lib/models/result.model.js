"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const sequelize_1 = require("sequelize");
function default_1(app) {
    const sequelizeClient = app.get('sequelizeClient');
    const result = sequelizeClient.define('result', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        student_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        subject: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        marks: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        hooks: {
            beforeCount(options) {
                options.raw = true;
            }
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    result.associate = function (models) {
        // Define associations here
        // See https://sequelize.org/master/manual/assocs.html
    };
    return result;
}
exports.default = default_1;
