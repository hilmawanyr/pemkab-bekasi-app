// remove project from user
document.querySelectorAll('.rm-pic').forEach(btn => {
    btn.addEventListener('click', function() {
        let user = this.getAttribute('data-id');
        let project = document.getElementById('pId').value;
        let payload = { user, project }

        swal({
            title: "Hapus perngguna dari project?",
            text: "Data projek akan dihapus dari akun pengguna",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                let xhr = new XMLHttpRequest();
                xhr.open('PUT', '/project/discharge_user');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function () {
                    if (this.readyState === xhr.DONE) {
                        let res = JSON.parse(xhr.response);
                        if (res.status === 1) {
                            swal("Pengguna berhasil dihapus dari projek!", {
                                icon: "success",
                            })
                            .then(_ => {
                                location.href = '/project/' + project + '/pic';
                            });
                        }
                        if (res.status === 12) {
                            toastr.error(res.message);
                        }
                    }
                }
                xhr.send(JSON.stringify(payload));
            }
        });
    })
});