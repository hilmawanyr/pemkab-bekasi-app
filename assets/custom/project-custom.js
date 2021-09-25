document.getElementById('edit-project-name').addEventListener('click', e => {
    if (!document.getElementById('span-name')) {
        let nameArea = document.getElementById('name-area'); 
        nameArea.style.display = 'none';
        // show edit form element 
        let editForm = createNameForm(nameArea.textContent);
        nameArea.parentNode.insertBefore(editForm, nameArea.nextSibling);
    }
});

document.getElementById('edit-project-desc').addEventListener('click', e => {
    if (!document.getElementById('span-desc')) {
        let descArea = document.getElementById('desc-area'); 
        descArea.style.display = 'none';
        // show edit form element 
        let editForm = createDescriptionForm(descArea.textContent.trim());
        descArea.parentNode.insertBefore(editForm, descArea.nextSibling);
    }
});

function createNameForm(val) {
    let el = `<input type="text" class="form-control form-control-border" id="project-name" placeholder=".form-control-border" value="${val}">`;
    el += `<button class="btn btn-xs btn-success" style="margin-right: 5px" onclick="saveName()">Save</button>`;
    el += `<button class="btn btn-xs btn-default" onclick="cancelEdit('span-name', 'name-area')">Cancel</button>`;
    let template = document.createElement('span');
    template.setAttribute('id', 'span-name')
    template.innerHTML = el;
    return template;
}

function createDescriptionForm(val) {
    let el = `<textarea name="" class="form-control" id="project-desc" rows="5">${val}</textarea>`;
    el += `<button class="btn btn-xs btn-success" style="margin-right: 5px" onclick="saveDesc()">Save</button>`;
    el += `<button class="btn btn-xs btn-default" onclick="cancelEdit('span-desc', 'desc-area')">Cancel</button>`;
    let template = document.createElement('span');
    template.setAttribute('id', 'span-desc')
    template.innerHTML = el;
    return template;
}

function cancelEdit(el, showEl) {
    document.getElementById(el).remove();
    document.getElementById(showEl).style.display = 'block';
}

function saveName() {
    let name = document.getElementById('project-name').value;
    let id = document.getElementById('pId').value;

    let form = {
        name: name,
        id: id
    }

    // remove form
    document.getElementById('span-name').remove();

    // set loading spinner
    let nameArea = document.getElementById('name-area');
    nameArea.parentNode.insertBefore(circleLoading('name'), nameArea.nextSibling);

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', '/project/name');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (this.readyState === xhr.DONE) {
            let res = JSON.parse(xhr.response);

            if (this.status === 200) {
                if (res.status === 1) {
                    document.getElementById('spiner-name').remove();
                    toastr.success(res.message);
                    let fieldName = document.getElementById('name-area');
                    fieldName.style.display = 'block';
                    fieldName.textContent = name;
                }
            }

            if (this.status === 500) {
                if (res.status === 12) {
                    document.getElementById('spiner-name').remove();
                    toastr.error(res.message);
                    let fieldName = document.getElementById('name-area');
                    fieldName.style.display = 'block';
                    fieldName.textContent = nameArea.textContent;
                }
            }

        }
    }
    xhr.send(JSON.stringify(form));
}

function saveDesc() {
    let desc = document.getElementById('project-desc').value;
    let id = document.getElementById('pId').value;

    let form = {
        description: desc,
        id: id
    }

    // remove form
    document.getElementById('span-desc').remove();

    // set loading spinner
    let descriptionArea = document.getElementById('desc-area');
    descriptionArea.parentNode.insertBefore(circleLoading('desc'), descriptionArea.nextSibling);

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', '/project/description');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (this.readyState === xhr.DONE) {
            let res = JSON.parse(xhr.response);

            if (this.status === 200) {
                if (res.status === 1) {
                    document.getElementById('spiner-desc').remove();
                    toastr.success(res.message);
                    let fieldDesc = document.getElementById('desc-area');
                    fieldDesc.style.display = 'block';
                    fieldDesc.textContent = desc;
                }
            }

            if (this.status === 500) {
                if (res.status === 12) {
                    document.getElementById('spiner-desc').remove();
                    toastr.error(res.message);
                    let fieldDesc = document.getElementById('desc-area');
                    fieldDesc.style.display = 'block';
                    fieldDesc.textContent = descriptionArea.textContent;
                }
            }

        }
    }
    xhr.send(JSON.stringify(form));
}

function circleLoading(id) {
    let circle = document.createElement('i');
    circle.setAttribute('id', 'spiner-' + id)
    circle.setAttribute('class', 'fas fa-circle-notch fa-spin');
    return circle;
}

document.getElementById('rm-project-btn').addEventListener('click', () => {
    let id = document.getElementById('pId').value;
    let payload = { id: id }
    swal({
        title: "Hapus projek?",
        text: "Data projek akan dihapus secara permanen",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', '/project');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (this.readyState === xhr.DONE) {
                    let res = JSON.parse(xhr.response);
                    if (res.status === 1) {
                        swal("Projek berhasil dihapus!", {
                            icon: "success",
                        })
                        .then(_ => {
                            location.href = '/project';
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
});

// load issues
// document.addEventListener('DOMContentLoaded', function () {
//     let project = document.getElementById('pId').value;
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', '/issue/' + project);
//     xhr.onload = async function () {
//         if (this.readyState === xhr.DONE) {
//             let res = JSON.parse(xhr.response);
//             if (res.status === 1) {
//                 if (res.data.length === 0) {
//                     document.getElementById('content-issue').innerHTML = '<h5><i>No data found</i></h5>';
//                 } else {
//                     await setIssuePanel(res.data);
//                 }
//             }
//         }
//     }
//     xhr.send();
// });

async function setIssuePanel(data) {
    let contentIssue = document.getElementById('content-issue');
    contentIssue.innerHTML = '';
    let row = document.createElement('div');
    row.setAttribute('class', 'row');
    contentIssue.appendChild(row);
    let issueCards = await issueCard(data);
    row.appendChild(issueCards);
}

async function issueCard(data) {
    let card = '';
    data.forEach(issue => {
        card += `<div class="col-sm-6 col-xs-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><b>${issue.title}</b></h5>
                            <p class="card-text">
                                ${(issue.description.length > 95 ? issue.description.substring(0, 95) + '...' : issue.description)} 
                                <a href="#modal-issue-detail" class="btn-detail" data-id="${issue.id}" data-toggle="modal" class="card-link">[Open detail]</a>
                            </p>
                            <ul class="list-group list-group-unbordered mb-3" style="list-style-type: none;">
                                <li>Reporter <b class="float-right">${issue.username}</b></li>
                                <li>Lat <b class="float-right">${issue.latitude}</b></li>
                                <li>Long <b class="float-right">${issue.longitude}</b></li>
                            </ul>
                        </div>
                    </div>
                </div>`;
    });
    let template = document.createElement('template');
    template.innerHTML = card.trim();
    return template.content;
}

document.addEventListener('click', function (e) {
    if (e.target.getAttribute('class') === 'btn-detail') {
        let issue = e.target.getAttribute('data-id');
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/issue/' + issue + '/detail');
        xhr.onload = function () {
            if (this.readyState === xhr.DONE) {
                let res = JSON.parse(xhr.response);
                if (res.status === 1) {
                    if (res.data !== null) {
                        document.getElementById('issue-modal-title').textContent = res.data.title;
                        document.getElementById('detail-img').src = '/upload/' + res.data.original_source;
                        document.getElementById('detail-img').alt = 'photo: ' + res.data.title;
                        document.getElementById('detail-desc').textContent = res.data.description;
                        document.getElementById('detail-pic').textContent = res.data.username;
                        document.getElementById('detail-lat').textContent = res.data.latitude;
                        document.getElementById('detail-long').textContent = res.data.longitude;
                    } else {

                    }
                }
            }
        }
        xhr.send();
    }
});