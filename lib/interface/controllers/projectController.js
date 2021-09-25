'use strict';

const moment = require('moment');
const showProject = require('../../app/use_cases/project/showProjects');
const createProject = require('../../app/use_cases/project/createProject');
const showDetailProject = require('../../app/use_cases/project/findProject');
const updateProject = require('../../app/use_cases/project/updateProject');
const removeProject = require('../../app/use_cases/project/removeProject');
const assignUserProject = require('../../app/use_cases/project/assignUserProject');
const dischargesUserProject = require('../../app/use_cases/project/dischargeUserProject');
const Project = require('../../domain/project');
const { show, create, detail, updateName, updateDescription, deleteProject, assignUser, dischargesUser } = require('../../infrastructure/repositories/projectRepository');
const getUsers = require('../../app/use_cases/user/showAllUser');
const { showAll } = require('../../infrastructure/repositories/userRepository');
const getIssueById = require('../../app/use_cases/issue/showIssues');
const { showIssues } = require("../../infrastructure/repositories/issueRepository");
const { randString } = require('../../app/use_cases/project/genRandomString');

module.exports = {

    async showAll(req, res) {
        try {
            const projects = await showProject(show);
            const data = {
                template: {
                    pageTitle: 'Projek',
                    pageName: 'Kelola Projek',
                    page: 'project'
                },
                projects: projects
            }
            return res.render('partials/template', data);
        } catch (err) {
            throw err;
        }
    },

    async create(req, res) {
        try {
            let { name, description } = req.body;
            let code = randString(20);
            let initProject = new Project(name, code, description, req.session._authData.userid);
            let save = await createProject(initProject, create);
            return res.redirect('/project');
        } catch (err) {
            throw err;
        }
    },

    async showDetail(req, res) {
        try {
            let projectCode = req.params.code;
            let projectData = await showDetailProject(projectCode, detail);
            let getIssues = await getIssueById(projectData.project_id, showIssues);
            let users = await getUsers(showAll);
            let data = {
                template: {
                    pageTitle: 'Project Detail',
                    pageName: `Projek: ${projectData.project_name}`,
                    page: 'projectDetail'
                },
                data: {
                    code: req.params.code,
                    serial: projectData,
                    createDate: moment(projectData.project_created).format("DD MMMM YYYY"),
                    users: users,
                    issues: getIssues
                }
            }
            return res.render('partials/template', data);
        } catch (err) {
            throw err;
        }
    },

    async updateProjectName(req, res) {
        try {
            let { name, id } = req.body;
            let { userid } = req.session._authData;
            let update = await updateProject(name, id, userid, updateName);
            return res.status(200).json({
                status: 1,
                description: 'success',
                message: 'project name updated successfully',
                data: update
            });
        } catch (err) {
            return res.status(500).json({
                status: 12,
                description: 'error process',
                message: `Update fail. ${err.message}`
            });
        }
    },

    async updateProjectDescription(req, res) {
        try {
            let { description, id } = req.body;
            let { userid } = req.session._authData;
            let update = await updateProject(description, id, userid, updateDescription);
            return res.status(200).json({
                status: 1,
                description: 'success',
                message: 'project description updated successfully',
                data: update
            });
        } catch (err) {
            return res.status(500).json({
                status: 12,
                description: 'error  process',
                message: `Update fail. ${err.message}`
            });
        }
    },

    async deleteProject(req, res) {
        try {
            let { id } = req.body;
            let { userid } = req.session._authData;
            let now = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
            let remove = await removeProject(id, now, userid, deleteProject);
            return res.status(200).json({
                status: 1,
                description: 'success',
                message: 'project successfully deleted',
                data: remove
            });
        } catch (err) {
            return res.status(500).json({
                status: 12,
                description: 'error  process',
                message: `Delete fail. ${err.message}`
            });
        }
    },

    async assignUser(req, res) {
        try {
            let { users, pId, code } = req.body;
            let assign = await assignUserProject(users, pId, assignUser);
            return res.redirect('/project/' + code + '/pic');
        } catch (err) {
            throw err;
        }
    },

    async dischargesUserFromProject(req, res) {
        try {
            let { user, project } = req.body;
            let { userid } = req.session._authData;
            let now = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
            let discharges = await dischargesUserProject(user, project, userid, now, dischargesUser);
            return res.status(200).json({
                status: 1,
                description: 'success',
                message: 'user successfully deleted from project',
                data: discharges
            });
        } catch (err) {
            return res.status(500).json({
                status: 12,
                description: 'error  process',
                message: `Discharge fail. ${err.message}`
            });
        }
    },

    async pic(req, res) {
        try {
            let { projectid } = req.params;
            let projectData = await showDetailProject(projectid, detail);
            let data = {
                template: {
                    pageTitle: 'Projects members',
                    pageName: 'Kelola Anggota Projek',
                    page: 'pic'
                },
                data: {
                    projectCode: projectData.project_code,
                    projectId: projectData.project_id,
                    projectName: projectData.project_name,
                    members: (projectData?.user_project ? JSON.parse(projectData.user_project) : []),
                    users: await getUsers(showAll)
                }
            }
            return res.render('partials/template', data);
        } catch (err) {
            throw err;
        }
    }

}