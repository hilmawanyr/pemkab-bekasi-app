const User = require('../lib/domain/user');
const addUser = require('../lib/app/use_cases/user/addUser');
const { create } = require('../lib/infrastructure/repositories/userRepository');
const hash = require('../lib/app/use_cases/auth/hashPassword');

test('add user', async () => {
    const pass = await hash('hayeer22');
    const user = new User('hilman', pass, 'ADMINISTRATOR', 'hilman@hilman.id', 0, 'admin');
    const persist = await addUser(user, create);
    delete persist.dataValues.id;
    expect(persist.dataValues).toEqual({
        username: 'hilman',
        password: pass,
        role: 'ADMINISTRATOR',
        email: 'hilman@hilman.id',
        is_ban: 0,
        created_by: 'admin'
    });
})
