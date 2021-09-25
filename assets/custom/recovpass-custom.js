document.getElementById('recov-form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('btn-send').disabled = true;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', this.getAttribute('action'));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (this.readyState === xhr.DONE) {
            if (this.status === 200) {
                let res = JSON.parse(xhr.response);
                if (res.status === 1) {
                    $('#forget-pass-modal').modal('hide');
                    document.getElementById('btn-send').disabled = false;
                    swal({
                        closeOnClickOutside: false,
                        text: res.message,
                        icon: "success",
                    })
                    .then(_ => {
                        location.href = '/auth'
                    });
                }
            }

            if (this.status === 400) {
                let res = JSON.parse(xhr.response);
                if (res.status === 3) {
                    document.getElementById('btn-send').disabled = false;
                    document.getElementById('err-alert').style.display = 'block';
                    document.getElementById('error-msg').textContent = res.message;
                }
            }

            if (this.status === 500) {
                let res = JSON.parse(xhr.response);
                if (res.status === 12) {
                    document.getElementById('btn-send').disabled = false;
                    document.getElementById('err-alert').style.display = 'block';
                    document.getElementById('error-msg').textContent = res.message;
                }
            }
        }
    }
    xhr.send(JSON.stringify({ email: document.getElementById('email').value }));
})