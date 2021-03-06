$(document).ready(function() {
	$('#cod_fuente').on('keydown', function(event) {
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
	            cod_fuente:
	            {
	            	required: true,
								maxlength: 5,
	            },
							nom_fuente:
	            {
	            	required: true,
	            },
	        },
	        messages:
	        {
						cod_fuente: {
							required:"Por favor ingrese el codigo de la fuente",
							maxlength:"Longitud exede el limite"
												},
						nom_fuente:"Ingrese el nombre de la fuente",
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
    var cod_fuente=$('#cod_fuente').val();
		var nom_fuente=$('#nom_fuente').val();
    //Get the value from form if edit or insert
	var process=$('#process').val();
	if(process=='insert')
	{
		var id_usuario=0;
		var urlprocess='agregar_fuentes.php';
		var dataString='process='+process+'&cod_fuente='+cod_fuente+'&nom_fuente='+nom_fuente;
	}
	if(process=='edited')
	{
		var id_fuente=$('#id_fuente').val();
		var cod_fuente=$('#cod_fuente').val();
		var nom_fuente=$('#nom_fuente').val();

		var urlprocess='editar_fuentes.php';
		var dataString='process='+process+'&cod_fuente='+cod_fuente+'&nom_fuente='+nom_fuente+'&id_fuente='+id_fuente;
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
   location.href = 'admin_fuentes.php';
}
function deleted()
{
	var id_fuente=$('#id_fuente').val();
	var dataString = 'process=deleted' + '&id_fuente=' + id_fuente;
	$.ajax({
		type : "POST",
		url : "borrar_fuentes.php",
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
				url :"admin_fuentes_dt.php", // json datasource
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