$(() => {
    $('.summernote').summernote()
        // $('#list-posts').DataTable();

    let listado = () => {
        $.ajax({
            url: 'http://localhost:8080/posts',
            method: 'get',
            dataType: 'json',
            success: (data) => {
                //console.log(data);
                data.map((item) => {
                    $("#list-posts tbody").append(`
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>${item.user.name}</td>
                            <td><input class="view-details btn btn-info btn-sm" value="Detalles" data-id="${item.id}"><button class="mail-form btn btn-sm btn-success" data-id="${item.id}">Enviar correo</button></td>
                        </tr>
                    `)
                })
            }
        })
    }

    listado();

    $(document).on("click", ".view-details", function() {
        let id = $(this).data('id');
        //$("#detail-title, #card-detail-title").html('');
        $.ajax({
            url: `http://localhost:8080/details?id=${id}`,
            method: 'get',
            dataType: 'json',
            success: function(data) {
                //console.log(data)
                $("#detail-title, #card-detail-title").html(data.title);
                $("#card-detail-user").html(data.user.name);
                $("#card-detail-content").html(data.body)
                $("#modal-details").modal('show');
            }
        })
    })

    $(document).on("click", ".mail-form", function() {
        let id = $(this).data('id');
        //$("#detail-title, #card-detail-title").html('');
        $.ajax({
            url: `http://localhost:8080/mail?id=${id}`,
            method: 'get',
            dataType: 'json',
            success: function(data) {
                $("#contenido").html(`${data.title}\n\n${data.user.name}\n\n${data.body}`)
                $("#mail").modal('show');
            }
        })
    })

    $('#enviarCorreo').click(function() {
        $.ajax({
            url: `http://localhost:8080/send-mail`,
            method: 'get',
            // dataType: 'json',
            data: {
                correo: $('#correo').val(),
                asunto: $('#asunto').val(),
                contenido: $('#contenido').val(),
            },
            success: function(data) {
                console.log(data)
                    // $("#detail-title, #card-detail-title").html(data.title);
                    // $("#card-detail-user").html(data.user.name);
                $("#mensaje-resultado").html(data)
                    // $("#mail").modal('show');
            }
        })
    })
})