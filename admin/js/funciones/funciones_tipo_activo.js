function remover(id)
{
	$("#"+id).remove();
}

$(document).ready(function() {

	$(".select").select2();/*select2 normal*/
	$("#vida_util").numeric({negative:false,decimal:false});
	$("#correlativo").numeric({negative:false,decimal:false});



	$("#propiedades").typeahead({
	 source: function(query, process) {
			 $.ajax({
					 url: 'propiedades_autocomplete.php',
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
		var propiedad = prod[1];
		var descripcion = prod[2];

		//usage
		if(exis(id_prod))
		{
				display_notify('Error','Propiedad ya selecionada');
		}
		else
		{

			$("#propiedad").append("<tr id="+id_prod+"><td>"+id_prod+"</td><td>"+propiedad+"</td><td>"+descripcion+"</td><td>"+"<a onclick=\"remover("+id_prod+")\" class=\"btn btn-default\"><em class=\"fa fa-trash\"></em></a>"+"</td></tr>");

		}

}

});

function exis(id)
{
  var ret = false;
  $("#propiedad tr").each(function(){
    if($(this).attr("id") == id)
    {
      ret = true;
    }
  });
  return ret;
}



	$('#codigo').on('keydown', function(event) {
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
	$('#vida_util').on('keydown', function(event) {
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

	jQuery.validator.addMethod(
	  "alfanumOespacio",
	  function(value, element) {
	    var isValidMoney = /^[ a-z0-9áéíóúüñ]*$/i.test(value);
	    return (this).optional(element) || isValidMoney;
	  },
	  'Ingrese sólo letras, números o espacios.'
	);

	$('#formulario').validate({
	    rules: {
	            nombre:
	            {
	            	required: true,
	            },
							codigo:
	            {
								required: true,
								maxlength: 20
							},
							vida_util:
	            {
	            	required: true,
	            },
							correlativo:
	            {
	            	required: true,
	            },

	        },
	        messages:
	        {
				nombre: {
					required:"Por favor ingrese el nombre del tipo de activo",
				},
				correlativo: {
					required:"Por favor ingrese el numero correlativo",
				},
				codigo: {
					required:"Por favor ingrese el codigo del tipo de activo",
					maxlength:"Exede el numero maximo de caracteres",
				},
				vida_util:"Debe ser un valor numerico en años",
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
    var nombre=$('#nombre').val();
		var codigo=$('#codigo').val();
		var vida_util=$('#vida_util').val();
		var id_clasificacion=$('#clasificacion').val();

    //Get the value from form if edit or insert
	var process=$('#process').val();
	var cadena="";

	$("#propiedad tr").each(function(){
    if($(this).attr("id") > 0)
    {
      cadena=cadena+$(this).attr("id")+",";
    }
  });



	if(process=='insert'&&cadena!="")
	{
		var id_usuario=0;
		var urlprocess='agregar_tipo_activo.php';
		var dataString='process='+process+'&nombre='+nombre+'&codigo='+codigo+'&vida_util='+vida_util+'&id_clasificacion='+id_clasificacion+'&cadena='+cadena;
	}
	else
	{
		if(process=='edited'&&cadena!="")
		{
			var id_tipo_activo=$('#id_tipo_activo').val();
			var nombre=$('#nombre').val();
			var codigo=$('#codigo').val();
			var vida_util=$('#vida_util').val();
			var id_clasificacion=$('#clasificacion').val();
			var correlativo=$('#correlativo').val();


			var urlprocess='editar_tipo_activo.php';
			var dataString='process='+process+'&nombre='+nombre+'&id_tipo_activo='+id_tipo_activo+'&codigo='+codigo+'&vida_util='+vida_util+'&id_clasificacion='+id_clasificacion+'&cadena='+cadena+'&correlativo='+correlativo;
		}
		else
		{
			if(cadena=="")
			{
				display_notify('Error','No ha seleccionado ninguna propiedad');
			}
			else
			{
				display_notify('Error','error');
			}
		}
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
   location.href = 'admin_tipo_activo.php';
}
function deleted()
{
	var id_tipo_activo = $('#id_tipo_activo').val();
	var dataString = 'process=deleted' + '&id_tipo_activo=' + id_tipo_activo;
	$.ajax({
		type : "POST",
		url : "borrar_tipo_activo.php",
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
			url :"admin_tipo_activo_dt.php", // json datasource
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