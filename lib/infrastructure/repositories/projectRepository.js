'use strict';

const { Project, sequelize, QueryTypes, Op } = require('../orm/models/projectModel');

module.exports = {

    async show() {
        try {
            let projects = await Project.findAll({
                attributes: [
                    'id',
                    'name',
                    'code',
                    'description',
                    [sequelize.fn('date_format', sequelize.col('updated_at'), '%Y-%m-%d'), 'updated_at']
                ],
                where: {
                    deleted_at: {
                        [Op.eq]: null
                    }
                }
            });
            return projects;
        } catch (err) {
            throw `Can not show projects. Reason: ${err}`;
        }
    },

    async create({ name, code, description, createdBy }) {
        try {
            let persist = await Project.create({
                name,
                code,
                description,
                created_by: createdBy
            });
            return persist;
        } catch (err) {
            throw `Can not create new project. Reason: ${err}`;
        }
    },

    async detail(code) {
        try {
            let project = await sequelize.query(`SELECT
                p.id AS project_id,
                p.name AS project_name,
                p.code AS project_code,
                p.description,
                p.created_at AS project_created,
                CONCAT('[', GROUP_CONCAT(CONCAT('{ "id": "', u.id, '", "username": "', u.username, '", "email": "', u.email, '"}') SEPARATOR ','), ']') AS user_project
            FROM projects p
            LEFT JOIN users u ON FIND_IN_SET(p.id, u.user_project) > 0
            WHERE p.code = :code`, 
            {
                replacements: {
                    code
                },
                plain: true,
                type: QueryTypes.SELECT
            });
            return project;
        } catch (err) {
            throw `Can not open project. Reason: ${err}`;
        }
    },

    async updateName(name, id, updater) {
        try {
            let update = await Project.update({ name, updated_by: updater },{
                where: {
                    code: id
                }
            });
            return update;
        } catch (err) {
            throw `Can not update project. Reason: ${err}`;
        }
    },

    async updateDescription(description, id, updater) {
        try {
            let update = await Project.update({ description, updated_by: updater },{
                where: {
                    code: id
                }
            });
            return update;
        } catch (err) {
            throw `Can not update project. Reason: ${err}`;
        }
    },

    async deleteProject(id, time, actor) {
        try {
            let remove = await Project.update({ deleted_at: time, deleted_by: actor }, {
                where: {
                    code: id
                }
            });
            return remove;
        } catch (err) {
            throw `Can not remove project. Reason: ${err}`;
        }
    },

    async assignUser(user, project) {
        try {
            let assign = await sequelize.query(`UPDATE users SET user_project = CONCAT(COALESCE(user_project,''), :project, ',') WHERE NOT FIND_IN_SET(:project, COALESCE(user_project,'')) AND id IN (:user)`, {
                replacements: {
                    user,
                    project
                },
                type: QueryTypes.UPDATE
            });
            return assign;
        } catch (err) {
            throw `Can not assign user. Reason: ${err}`;
        }
    },

    async dischargesUser(user, project, updatedby, time) {
        try {
            let discharge = await sequelize.query(`UPDATE users SET user_project = REPLACE(REPLACE(user_project, :project, ''), ',,', ','), updated_at = :time, updated_by = :updatedby WHERE id = :user`, {
                replacements: {
                    user,
                    project,
                    updatedby, 
                    time
                },
                type: QueryTypes.UPDATE
            });
            return discharge;
        } catch (err) {
            throw `Can not discharge user from project. Reason: ${err}`;
        }
    },

    async totalProjects() {
        try {
            let count = Project.count({
                where: {
                    deleted_at: {
                        [Op.eq]: null
                    }
                }
            });
            return count;
        } catch (err) {
            throw `Can not count users. Message: ${err}`
        }
    }

}