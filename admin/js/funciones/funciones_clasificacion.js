$(document).ready(function() {
    $(".select").select2();/*select2 normal*/

$('#cod_clasificacion').on('keydown', function(event) {
    if (event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39) {
            // ignorando tecla espacio y las de desplazamiento
    } else {

        if (event.keyCode < 48 || event.keyCode > 57) {
            if(event.keyCode < 96 || event.keyCode > 105)
            {
                event.preventDefault();

            }
            else
            {
            }
        }
        else {
        }
    }
});

$('#formulario').validate({
    rules: {
            cod_clasificacion:
            {
                required: true,
                            maxlength: 8,
            },
                        nom_clasificacion:
            {
                required: true,
                            maxlength: 60,
            },
        },
        messages:
        {
                    cod_clasificacion: {
                        required:"Por favor ingrese el codigo de la clasificacion",
                        maxlength:"Longitud exede el limite"
                                            },
                    nom_clasificacion:{
                        required:"Ingrese el nombre de la clasificacion del activo",
                        maxlength: "Longitud exede el limite"
                                            },
                },
    submitHandler: function (form)
    {
        senddata();
    }
    });
});

$(function ()
{
//binding event click for button in modal form
$(document).on("click", "#btnDelete", function(event) {
    deleted();
});
// Clean the modal form
$(document).on('hidden.bs.modal', function(e) {
    var target = $(e.target);
    target.removeData('bs.modal').find(".modal-content").html('');
});

});

function autosave(val){
var name=$('#name').val();
if (name==''|| name.length == 0){
    var	typeinfo="Info";
    var msg="The field name is required";
    display_notify(typeinfo,msg);
    $('#name').focus();
}
else{
    senddata();
}
}

function senddata()
{
var cod_clasificacion=$('#cod_clasificacion').val();
    var nom_clasificacion=$('#nom_clasificacion').val();
    var id_tipo_clasificacion=$('#id_tipo_clasificacion').val();
//Get the value from form if edit or insert
var process=$('#process').val();
if(process=='insert')
{
    var id_usuario=0;
    var urlprocess='agregar_clasificacion.php';
    var dataString='process='+process+'&cod_clasificacion='+cod_clasificacion+'&nom_clasificacion='+nom_clasificacion+'&id_tipo_clasificacion='+id_tipo_clasificacion;
}
if(process=='edited')
{
    var id_clasificacion=$('#id_clasificacion').val();

    var urlprocess='editar_clasificacion.php';
    var dataString='process='+process+'&cod_clasificacion='+cod_clasificacion+'&nom_clasificacion='+nom_clasificacion+'&id_clasificacion='+id_clasificacion+'&id_tipo_clasificacion='+id_tipo_clasificacion;
}
$.ajax({
    type:'POST',
    url:urlprocess,
    data: dataString,
    dataType: 'json',
    success: function(datax)
    {
        process=datax.process;
        display_notify(datax.typeinfo,datax.msg);
        if(datax.typeinfo == "Success")
        {
            setInterval("reload1();", 1500);
        }
    }
});
}
function reload1()
{
location.href = 'admin_clasificacion.php';
}
function deleted()
{
var id_clasificacion=$('#id_clasificacion').val();
var dataString = 'process=deleted' + '&id_clasificacion=' + id_clasificacion;
$.ajax({
    type : "POST",
    url : "borrar_clasificacion.php",
    data : dataString,
    dataType : 'json',
    success : function(datax) {
        display_notify(datax.typeinfo, datax.msg);
        if(datax.typeinfo == "Success")
        {
            setInterval("reload1();", 1500);
            $('#deleteModal').hide();
        }
    }
});
}


function generar2(){

	dataTable = $('#editable2').DataTable().destroy()
	dataTable = $('#editable2').DataTable( {
		"pageLength": 50,
		"order":[ 0, 'desc' ],
        "processing": true,      
		"autoWidth": false,
		"serverSide": true,
		"ajax":{
				url :"admin_clasificacion_dt.php", // json datasource
				//url :"admin_factura_rangos_dt.php", // json datasource
				//type: "post",  // method  , by default get
				error: function(){  // error handling
					$(".editable2-error").html("");
					$("#editable2").append('<tbody class="editable_grid-error"><tr><th colspan="3">No se encontr?? informaci??n segun busqueda </th></tr></tbody>');
					$("#editable2_processing").css("display","none");
					$( ".editable2-error" ).remove();
					}
				}
			} );

		dataTable.ajax.reload()
	//}
}

$(document).ready(function(){
    generar2();
});	