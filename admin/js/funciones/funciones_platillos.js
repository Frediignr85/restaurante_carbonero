$(document).ready(function() {
    generar2();
    $(".select").select2();
    $(".decimal").numeric();

    //jquery validate y regexp

    $.validator.addMethod('regexp', function(value, element, param) {
        return this.optional(element) || value.match(param);
    }, 'Mensaje a mostrar si se incumple la condición');

    $('#formulario_habitacion').validate({
        rules: {
            nombre: {
                required: true,
            },
            descripcion: {
                required: true,
            },
            precio: {
                required: true,
            },
            platillo: {
                required: true,
            },
        },
        messages: {
            nombre: {
                required: "Ingrese el nombre del platillo por favor!",
            },
            descripcion: {
                required: "Ingrese la descripcion del platillo!",
            },
            precio: {
                required: "Ingrese el precio del platillo!",
            },
            platillo: {
                required: true,
            },
        },
        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function(element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        },
        submitHandler: function(form) {
            senddata();
        }
    });

    //jquery validate y regexp
});


function generar2() {
    var id_piso = $("#id_piso").val();
    dataTable = $('#editable2').DataTable().destroy()
    dataTable = $('#editable2').DataTable({
        "pageLength": 50,
        "responsive": true,
        "autoWidth": false,
        "order": [0, 'asc'],
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "admin_platillo_dt.php?id_piso=" + id_piso, // json datasource
            //url :"admin_factura_rangos_dt.php", // json datasource
            //type: "post",  // method  , by default get
            error: function() { // error handling
                $(".editable2-error").html("");
                $("#editable2").append('<tbody class="editable_grid-error"><tr><th colspan="3">No se encontró información segun busqueda </th></tr></tbody>');
                $("#editable2_processing").css("display", "none");
                $(".editable2-error").remove();
            }
        }
    });

    dataTable.ajax.reload();
    //}
}

$(function() {
    //binding event click for button in modal form
    $(document).on("click", "#btnDelete", function(event) {
        deleted();
    });
    $(document).on("click", "#btnEstado", function(event) {
        estado();
    });
    $(document).on("click", "#btnEnviarMensaje", function(event) {
        mensaje();
    });
    $(document).on("click", "#btnVolver", function(event) {
        reload1();
    });
    // Clean the modal form
    $(document).on('hidden.bs.modal', function(e) {
        var target = $(e.target);
        target.removeData('bs.modal').find(".modal-content").html('');
    });

});

function mensaje() {
    alert("HOLA");
}

function senddata() {

    /*
    var process = $('#process').val();
    var numero_piso = $('#numero_piso').val();
    var numero_habitacion = $('#numero_habitacion').val();
    var tipo_habitacion = $('#tipo_habitacion').val();
    var descripcion = $('#descripcion').val();
    var estado_habitacion = $('#estado_habitacion').val();
    var precio_por_hora = $('#precio_por_hora').val();
    var urlprocess = "";
    var id_habitacion = 0;
    if (process == 'insert') {
        urlprocess = 'agregar_habitacion.php';
    }
    if (process == 'edited') {
        urlprocess = 'editar_habitacion.php';
        id_habitacion = $("#id_habitacion").val();
    }
    var dataString = 'process=' + process + '&id_habitacion=' + id_habitacion + '&numero_piso=' + numero_piso;
    dataString += '&numero_habitacion=' + numero_habitacion + '&tipo_habitacion=' + tipo_habitacion;
    dataString += '&descripcion=' + descripcion + '&estado_habitacion=' + estado_habitacion + '&precio_por_hora=' + precio_por_hora;
    $.ajax({
        type: 'POST',
        url: urlprocess,
        data: dataString,
        dataType: 'json',
        success: function(datax) {
            display_notify(datax.typeinfo, datax.msg);
            if (datax.typeinfo == "Success") {
                setInterval("reload1();", 1500);
            }
        }
    });*/
    var process = $('#process').val();
    if (process == 'insert') {
        var urlprocess = 'agregar_platillo.php';
    }
    if (process == 'edited') {
        var urlprocess = 'editar_platillo.php';
    }
    var form = $("#formulario_habitacion");
    var formdata = false;
    if (window.FormData) {
        formdata = new FormData(form[0]);
    }
    var formAction = form.attr('action');
    $.ajax({
        type: 'POST',
        url: urlprocess,
        cache: false,
        data: formdata ? formdata : form.serialize(),
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(data) {
            display_notify(data.typeinfo, data.msg, data.process);
            if (data.typeinfo == "Success") {
                setInterval("reload1();", 1500);
            }
        }
    });

}

function reload1() {
    location.href = 'admin_platillo.php';
}

function deleted() {
    var id_habitacion = $('#id_habitacion').val();
    var dataString = 'process=deleted' + '&id_habitacion=' + id_habitacion;
    $.ajax({
        type: "POST",
        url: "borrar_habitacion.php",
        data: dataString,
        dataType: 'json',
        success: function(datax) {
            display_notify(datax.typeinfo, datax.msg);
            if (datax.typeinfo == "Success") {
                setInterval("reload1();", 1500);
                $('#deleteModal').hide();
            }
        }
    });
}

function estado() {
    var id_habitacion = $('#id_habitacion').val();
    var id_estado = $('#estado_habitacion_change').val();
    var dataString = 'process=estado' + '&id_habitacion=' + id_habitacion + "&estado=" + id_estado;
    $.ajax({
        type: "POST",
        url: "estado_habitacion.php",
        data: dataString,
        dataType: 'json',
        success: function(datax) {
            display_notify(datax.typeinfo, datax.msg);
            if (datax.typeinfo == "Success") {
                setInterval("reload1();", 1500);
                $('#deleteModal').hide();
            }
        }
    });
}