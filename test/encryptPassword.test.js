const bcrypt = require('bcryptjs');

test('encrpyt password with salt', done => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("admin1234", salt, function(err, hash) {
            console.log(hash);
            done();
        });
    });
})
