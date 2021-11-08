if (document.querySelector('.image-gallery')) {
    document.querySelectorAll('.image-gallery').forEach(image => {
        image.addEventListener('click', function() {
            console.log(this.getAttribute('data-path'))
            document.getElementById('detail-img').src = this.getAttribute('data-path');
        })
    })
}

let [lat, long] = [document.getElementById('latitude').textContent, document.getElementById('longitude').textContent];
let map = L.map('map').setView([lat, long], 13);
let mapToken = document.getElementById('map').getAttribute('data-token');
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapToken
}).addTo(map);
L.marker([lat, long]).addTo(map);