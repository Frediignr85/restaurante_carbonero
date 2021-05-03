$(document).ready(function() {

	$("#unidades").typeahead({
	 source: function(query, process) {
			 $.ajax({
					 url: 'unidades_autocomplete.php',
					 type: 'POST',
					 data: 'query=' + query ,
					 dataType: 'JSON',
					 async: true,
					 success: function(data) {
							 process(data);

					 }
			 });
	 },
		updater: function(selection){
		var prod0=selection;
		var prod= prod0.split("|");
		var id_prod = prod[0];
		var unidad = prod[1];
		var codigo = prod[2];

		$("#mostrar_unidad").html(codigo+" "+unidad);
		$("#id_unidad").val(id_prod);
	}

	});

	$("#activo").typeahead({
	 source: function(query, process) {
			 $.ajax({
					 url: 'activo_autocomplete.php',
					 type: 'POST',
					 data: 'query=' + query ,
					 dataType: 'JSON',
					 async: true,
					 success: function(data) {
							 process(data);

					 }
			 });
	 },
		updater: function(selection){
		var prod0=selection;
		var prod= prod0.split("|");
		var id_prod = prod[0];
		var activo = prod[1];
		var codigo = prod[2];
		var unidad_anterior = prod[3];

		$("#mostrar_activo").html(codigo+" "+activo);
		$("#id_activo").val(id_prod);
		$("#id_unidad_anterior").val(unidad_anterior);
	}

	});

	$('#formulario').validate({
		ignore: "",
	    rules: {
							id_unidad:
							{
								required:true,
							},
							id_activo:
							{
								required:true,
							},
							acuerdo:
							{
								required:true,
							},
							justificacion:
							{
								required:true,
							},
	        },
	        messages:
	        {
							id_unidad: {
								required:"Por favor selecione una unidad",
							},
							id_activo: {
								required:"Por favor selecione un activo",
							},
							acuerdo: {
								required:"Por favor ingresar el acuerdo",
							},
							justificacion: {
								required:"Por favor ingresar la justificacion",
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
    var id_activo=$('#id_activo').val();
		var id_unidad_anterior=$('#id_unidad_anterior').val();
		var id_unidad_nueva=$('#id_unidad').val();
		var acuerdo=$('#acuerdo').val();
		var justificacion=$('#justificacion').val();
    //Get the value from form if edit or insert
	var process=$('#process').val();
	if(process=='insert')
	{
		var id_usuario=0;
		var urlprocess='agregar_traslado.php';
		var dataString='process='+process+'&id_activo='+id_activo+'&id_unidad_anterior='+id_unidad_anterior+'&id_unidad_nueva='+id_unidad_nueva+'&acuerdo='+acuerdo+'&justificacion='+justificacion;
	}
	/*if(process=='edited')
	{
		var id_unidad=$('#id_unidad').val();

		var urlprocess='editar_unidad.php';
		var dataString='process='+process+'&cod_unidad='+cod_unidad+'&nom_unidad='+nom_unidad+'&id_unidad='+id_unidad+'&jefe='+jefe+'&encargado='+encargado;
	}*/
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
   location.href = 'admin_traslado.php';
}
function deleted()
{
	var id_unidad=$('#id_unidad').val();
	var dataString = 'process=deleted' + '&id_unidad=' + id_unidad;
	$.ajax({
		type : "POST",
		url : "borrar_traslado.php",
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
			url :"admin_traslado_dt.php", // json datasource
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