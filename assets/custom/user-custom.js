document.querySelectorAll('.activate-btn').forEach(el => {
    el.addEventListener('click', function (e) {
        swal({
            title: "Aktifkan kembali pengguna?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willActive) => {
            if (willActive) {
                let xhr = new XMLHttpRequest();
                xhr.open('PUT', '/user/' + this.getAttribute('data-id') + '/status/active');
                xhr.onload = function () {
                    if (xhr.readyState === this.DONE && xhr.status === 200) {
                        let res = JSON.parse(xhr.response);
                        if (res.status === 1) {
                            swal("Pengguna berhasil diaktivasi!", {
                                icon: "success",
                            })
                            .then(_ => {
                                location.href = '/user'
                            });
                        }
                    }
                }
                xhr.send();
            }
        });
    });
});

document.querySelectorAll('.delete-btn').forEach(el => {
    el.addEventListener('click', function (e) {
        swal({
            title: "Hapus pengguna?",
            text: "Data pengguna akan dihapus secara permanen",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willActive) => {
            if (willActive) {
                let xhr = new XMLHttpRequest();
                xhr.open('DELETE', '/user/' + this.getAttribute('data-id'));
                xhr.onload = function () {
                    if (xhr.readyState === this.DONE && xhr.status === 200) {
                        let res = JSON.parse(xhr.response);
                        if (res.status === 1) {
                            swal("Pengguna berhasil dihapus!", {
                                icon: "success",
                            })
                            .then(_ => {
                                location.href = '/user'
                            });
                        }
                    }
                }
                xhr.send();
            }
        });
    });
});

document.querySelectorAll('.update-btn').forEach(el => {
    el.addEventListener('click', function (e) {
        document.getElementById('modaltitle').textContent = 'Update user';
        document.getElementById('user-form').setAttribute('action', '/user/update');
        document.getElementById('username').setAttribute('readonly', true);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/user/' + this.getAttribute('data-id'));
        xhr.onload = function () {
            if (xhr.readyState === this.DONE && xhr.status === 200) {
                let res = JSON.parse(xhr.response);
                if (res.status === 1) {
                    if (res.data[0].is_ban === 0) {
                        $('#status').bootstrapSwitch('state', true);
                    } else {
                        $('#status').bootstrapSwitch('state', false);
                    }
                    document.getElementById('username').value = res.data[0].username;
                    document.getElementById('update-username').value = res.data[0].username;
                    document.getElementById('email').value = res.data[0].email;
                    document.querySelector('#role [value="'+res.data[0].role+'"]').selected = true;
                }
            }
        }
        xhr.send();
    });
});

document.getElementById('btn-create').addEventListener('click', e => {
    document.getElementById('modaltitle').textContent = 'Create user';
    document.getElementById('user-form').setAttribute('action', '/user');
    document.getElementById('user-form').reset();
    document.getElementById('username').removeAttribute('readonly');
    $('#status').bootstrapSwitch('state', false);
});