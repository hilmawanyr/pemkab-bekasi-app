if (document.querySelector('.image-gallery')) {
    document.querySelectorAll('.image-gallery').forEach(image => {
        image.addEventListener('click', function() {
            console.log(this.getAttribute('data-path'))
            document.getElementById('detail-img').src = this.getAttribute('data-path');
        })
    })
}