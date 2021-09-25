'use strict';

const { Issue, sequelize, QueryTypes, Op } = require('../orm/models/issueModel');

module.exports = {

    async showIssues(project) {
        try {
            let issues = await sequelize.query(`SELECT i.*, u.username FROM issues i JOIN users u ON i.created_by = u.id WHERE i.deleted_at IS NULL AND i.project_id = :project`, {
                replacements: {
                    project
                },
                type: QueryTypes.SELECT
            });
            return issues;
        } catch (err) {
            throw `Can not show issues. Reason: ${err}`;
        }
    },

    async showDetail(issue) {
        try {
            let detail = sequelize.query(`SELECT i.*, u.username, p.name AS project_name FROM issues i JOIN projects p ON i.project_id = p.id JOIN users u ON i.created_by = u.id WHERE i.id = :id`, {
                replacements: {
                    id: issue
                },
                plain: true,
                type: QueryTypes.SELECT
            });
            return detail;
        } catch (err) {
            throw `Can not show detail issue. Reason: ${err}`;
        }
    },

    async showAttachment(issue) {
        try {
            let detail = sequelize.query(`SELECT * FROM issue_attachment WHERE issue_id = :id`, {
                replacements: {
                    id: issue
                },
                type: QueryTypes.SELECT
            });
            return detail;
        } catch (err) {
            throw `Can not show detail issue. Reason: ${err}`;
        }
    }

}