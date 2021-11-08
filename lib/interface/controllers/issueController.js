'use strict';

const getIssueById = require('../../app/use_cases/issue/showIssues');
const issueDetail = require('../../app/use_cases/issue/issueDetail');
const getAttachment = require('../../app/use_cases/issue/showAttachments');
const { showIssues, showDetail, showAttachment } = require("../../infrastructure/repositories/issueRepository");

module.exports = {

    async showAll(req, res) {
        try {
            let { id } = req.params;
            let getIssues = await getIssueById(id, showIssues);
            return res.status(200).json({
                'status': 1,
                'description': 'success',
                'message': 'issues load succesfully',
                'data': getIssues
            });
        } catch (err) {
            return res.status(500).json({
                status: 12,
                description: 'error  process',
                message: `Can not get issues of this project. ${err.message}`
            });
        }
    },

    async getDetail(req, res) {
        try {
            let { MAPBOXTOKEN } = require('../../infrastructure/config/constants');
            let { id } = req.params;
            let getDetail = await issueDetail(id, showDetail);
            let showAttach = await getAttachment(id, showAttachment);
            let data = {
                template: {
                    pageTitle: 'Issue Detail',
                    pageName: `Detil Permasalahan`,
                    page: 'issueDetail'
                },
                mapToken: MAPBOXTOKEN,
                projectCode: getDetail.project_code,
                issues: getDetail,
                attachments: (showAttach.length === 0 ? [] : showAttach)
            }
            return res.render('partials/template', data);
        } catch (err) {
            return res.status(500).json({
                status: 12,
                description: 'error  process',
                message: `Can not get issue detail. ${err.message}`
            });
        }
    }

}