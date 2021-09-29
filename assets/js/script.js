$(() => {
    let listado = () =>{
        $.ajax({
            url:'http://localhost:8080/posts',
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
                            <td><input class="view-details btn btn-info btn-sm" value="Detalles" data-id="${item.id}"></td>
                        </tr>
                    `)
                })
            }
        })
    }

    listado();

    $(document).on("click",".view-details", function() {
        let id = $(this).data('id');
        //$("#detail-title, #card-detail-title").html('');
        $.ajax({
            url:`http://localhost:8080/details?id=${id}`,
            method: 'get',
            dataType: 'json',
            success: function(data){
                //console.log(data)
                $("#detail-title, #card-detail-title").html(data.title);
                $("#card-detail-user").html(data.user.name);
                $("#card-detail-content").html(data.body)
                $("#modal-details").modal('show');
            }
        })
    })
})