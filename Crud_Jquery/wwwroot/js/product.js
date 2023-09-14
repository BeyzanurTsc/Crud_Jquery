$(document).ready(function () {
    ShowData();
});

function ShowData() {
    $.ajax({
        url: '/Home/ProductList',
        type: 'Get',
        dataType: 'Json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var table_data = '';
           
            $.each(result, function (index, item) {
                var deleteBtn = '<a class="btn btn-outline-danger" onclick="Delete(' + item.productId + ')"><i class="fa-solid fa-trash"></i></a>';
                var updateBtn = '<a class="btn btn-outline-success" id="update_Btn" onclick="GetTextBoxData(' + item.productId + ')"><i class="fa-solid fa-pen-to-square"></i></a>';
                table_data += '<tr>';
                table_data += '<td>' + item.productId + '</td>';
                table_data += '<td>' + item.productName + '</td>';
                table_data += '<td>' + item.categoryId + '</td>';
                table_data += '<td>' + item.brandId + '</td>';
                table_data += '<td>' + item.description + '</td>';
                table_data += '<td>' + deleteBtn + ' ' + updateBtn + '</td>';
                table_data += '</tr>';
            });
            $('#table-body').html(table_data);
        },
        error: function () {
            alert('Veri gösterilemiyor :( ')
        }
    });
};

//------------------------------- Veri Ekleme
$('#addBtn').click(function () {
    $('#AddModal').modal('show');
})

function AddData() {
    debugger
    var objData = {
        productName: $('#add_name').val(),
        categoryId: $('#add_category').val(),
        brandId: $('#add_brand').val(),
        description: $('#add_description').val()
    }
    $.ajax({
        url: '/Home/AddProduct',
        type: 'Post',
        data: JSON.stringify(objData),
        contentType: 'application/json;charset=utf-8',
        dataType: 'Json',
        success: function () {
            ShowData();
            $('#AddModal').modal('hide');

        },
        error: function () {
            alert('Ekleme işlemi başarısız :(');
        }
    });
}


//------------------------------ Silme
function Delete(id) {
    if (confirm("Bu veriyi silmek istediğinize emin misiniz?")) {
        debugger
        $.ajax({
            url: '/Home/DeleteProduct?id=' + id,
            success: function () {
                ShowData();
            },
            error: function () {
                alert('İşlem başarısız');
            }

        })
    }
}


//--------------------------------------------------------->  Güncelle
function GetTextBoxData(id) {
    $.ajax({
        url: '/Home/VeriGetir?id=' + id,
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: 'JSON',
        success: function (response) {
            $('#UpdateMdl').modal('show');
            $('#upd_Id').val(response.productId),
                $('#upd_name').val(response.productName),
                $('#upd_category').val(response.categoryId),
                $('#upd_brand').val(response.brandId),
                $('#upd_description').val(response.description)
        },
        error: function () {
            alert('İşlem Başarısız');
        }
    })
}

function UpdateData() {
    debugger
    var obj = {
        productId: $('#upd_Id').val(),
        productName: $('#upd_name').val(),
        categoryId: $('#upd_category').val(),
        brandId: $('#upd_brand').val(),
        description: $('#upd_description').val()
    }
    $.ajax({
        url: '/Home/UpdateProduct',
        type: 'Post',
        data: JSON.stringify(obj),
        contentType: 'application/json; charset=utf-8',
        dataType: 'JSON',
        success: function () {
            ShowData();
            $('#UpdateMdl').modal('hide');

        },
        error: function () {
            alert('Ekleme işlemi başarısız');
        }
    })
}
