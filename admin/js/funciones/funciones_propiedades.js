$(document).ready(function() {
	$(".select").select2();/*select2 normal*/

	$('#formulario').validate({
	    rules: {
	            propiedad:
	            {
	            	required: true,
	            },
							descripcion:
	            {
	            	required: false,
	            },
	        },
	        messages:
	        {
				propiedad: "Por favor ingrese el nombre de la propiedad",
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
    var propiedad=$('#propiedad').val();
		var descripcion=$('#descripcion').val();
		var id_tipo_dato=$('#id_tipo_dato').val();
    //Get the value from form if edit or insert
	var process=$('#process').val();
	if(process=='insert')
	{
		var id_usuario=0;
		var urlprocess='agregar_propiedades.php';
		var dataString='process='+process+'&propiedad='+propiedad+'&descripcion='+descripcion+'&id_tipo_dato='+id_tipo_dato;
	}
	if(process=='edited')
	{
		var id_propiedad=$('#id_propiedad').val();
		var propiedad=$('#propiedad').val();
		var descripcion=$('#descripcion').val();

		var urlprocess='editar_propiedades.php';
		var dataString='process='+process+'&propiedad='+propiedad+'&descripcion='+descripcion+'&id_propiedad='+id_propiedad+'&id_tipo_dato='+id_tipo_dato;
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
   location.href = 'admin_propiedades.php';
}
function deleted()
{
	var id_propiedad=$('#id_propiedad').val();
	var dataString = 'process=deleted' + '&id_propiedad=' + id_propiedad;
	$.ajax({
		type : "POST",
		url : "borrar_propiedades.php",
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
			url :"admin_propiedades_dt.php", // json datasource
			//url :"admin_factura_rangos_dt.php", // json datasource
			//type: "post",  // method  , by default get
			error: function(){  // error handling
				$(".editable2-error").html("");
				$("#editable2").append('<tbody class="editable_grid-error"><tr><th colspan="3">No se encontró información segun busqueda </th></tr></tbody>');
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