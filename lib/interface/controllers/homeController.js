'use strict';

const countUsers = require('../../app/use_cases/user/totalUsers');
const countProjects = require('../../app/use_cases/project/totalProject');
const countIssues = require('../../app/use_cases/issue/totalIssues');
const { totalUsers } = require('../../infrastructure/repositories/userRepository');
const { totalProjects } = require('../../infrastructure/repositories/projectRepository');
const { totalIssues } = require('../../infrastructure/repositories/issueRepository');

module.exports = {

    async index(req, res) {
        const activeUser = await countUsers(0, totalUsers);
        const inactiveUser = await countUsers(1, totalUsers);
        const projects = await countProjects(totalProjects);
        const issues = await countIssues(totalIssues);
        const data = {
            template: {
                pageTitle: 'Home Page',
                pageName: 'Home',
                page: 'home'
            },
            data: {
                actUsers: activeUser,
                inactUsers: inactiveUser,
                totProjects: projects,
                totIssues: issues
            }
        }
        res.render('partials/template', data);
    }    

}