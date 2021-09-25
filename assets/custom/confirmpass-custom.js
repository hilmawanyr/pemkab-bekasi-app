document.getElementById('confirm-pass').addEventListener('keyup', function(e) {
    let password = document.getElementById('password').value;
    if (e.target.value !== password) {
        document.getElementById('btn-submit').setAttribute('disabled', 'disabled');
        this.classList.add('is-invalid');
    } else {
        document.getElementById('btn-submit').removeAttribute('disabled');
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
    }
});

document.getElementById('update-pass-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('btn-submit').setAttribute('disabled', 'disabled');
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', '/auth/update_password');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (this.readyState === xhr.DONE) {
            let res = JSON.parse(xhr.response);
            if (this.status === 200 && res.status === 1) {
                swal({
                    closeOnClickOutside: false,
                    text: res.message,
                    icon: "success",
                })
                .then(_ => {
                    location.href = '/auth'
                });
            }
            
            if (this.status >= 400) {
                document.getElementById('btn-submit').removeAttribute('disabled');
                document.getElementById('err-alert').style.display = 'block';
                document.getElementById('err-msg').textContent = res.message;
            }
        }
    }
    xhr.send(JSON.stringify({ 
        key: document.getElementById('passkey').value,
        password: document.getElementById('password').value,
        confirm: document.getElementById('confirm-pass').value
    }))
})