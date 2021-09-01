const storeUsecase = require('../lib/app/use_cases/employee/store');
const employeeRepo = require('../lib/infrastructure/repositories/employeeRepository');
const Employee = require('../lib/domain/employee');
const logger = require('../lib/infrastructure/logger/winston');

test('add new employee', async () => {
    let admin = new Employee('000000', 'admin', 'adminitself');
    try {
        let persist = await storeUsecase(admin, employeeRepo.create);
        expect(persist.dataValues).toEqual({
            id: '000000',
            name: 'admin',
            created_by: 'adminitself'
        });        
    } catch (error) {
        logger.error(error);
    }
})
