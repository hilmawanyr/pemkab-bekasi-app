$(function () {
    $('#example').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
    });

    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    });
})