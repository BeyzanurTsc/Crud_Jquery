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
            var deleteBtn = '<a class="btn btn-outline-danger" onclick="Delete()">Sil</a>';
            var updateBtn = '<a class="btn btn-outline-success" id="updateBtn">Güncelle</a>';
            $.each(result, function (index, item) {
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
        productName: $('#P_Name').val(),
        categoryId: $('#C_Id').val(),
        brandId: $('#B_Id').val(),
        description: $('#description').val()
    }
    $.ajax({
        url: '/Home/AddProduct',
        type: 'Post',
        data: JSON.stringify(objData),
        contentType: 'application/json;charset=utf-8',
        dataType: 'Json',
        success: function () {
            alert('Ekleme işlemi başarılı :)');
            ShowData();
        },
        error: function () {
            alert('Ekleme işlemi başarısız :(');
        }
    });
}