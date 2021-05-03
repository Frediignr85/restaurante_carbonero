$(document).ready(function() {

	$(".select").select2();/*select2 normal*/


	$('#deprecia').on('ifChecked', function(event)
	{
			$('.i-checks').iCheck('check');
			$('#depreciar').val("1");
			$('#valordes').prop('disabled',false);
			$('#valordes').val("");


	});
	$('#deprecia').on('ifUnchecked', function(event)
	{
			$('.i-checks').iCheck('uncheck');
			$('#depreciar').val("0");
			$('#valordes').prop('disabled',true);
			$('#valordes').val("0");

	});

	/*ajax autocomplete*/

	$("#proveedor").typeahead({
	 source: function(query, process) {
			 $.ajax({
					 url: 'proveedor_autocomplete.php',
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
		var proveedor = prod[1];

		$("#mostrar_proveedor").html(proveedor);
		$("#id_proveedor").val(id_prod);


}

});

$("#tipo_activo").typeahead({
 source: function(query, process) {
		 $.ajax({
				 url: 'tipos_autocomplete.php',
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
	var tipo_activo = prod[1];
	var codigo = prod[2];
	var vida = prod[3];
	var tipo = prod[4];

	$("#mostrar_tipo_activo").html(codigo+" "+tipo_activo);
	$("#id_tipo_activo").val(id_prod);
	$("#codigo").val(codigo);
	$("#vidautil").val(vida);
	var id =  $("#id_tipo_activo").val();
	if(tipo==2)
	{
		$('#id_unidad').prop('required',false);
		$('#id_unidad').val('');
		$('#ubicacion').prop('required',true);
		$("#mostrar_unidad").html('');
		$('#unidad_container').prop('hidden',true);
		$('#proveedor_container').prop('hidden',true);
		$('#contenedor_ubicacion').prop('hidden',false);
		$('#container_sector_tramite').prop('hidden',false);
		$('#id_tramite').val("1");
		$('#id_sector').val("1");
		$(".select").select2();/*select2 normal*/
	}
	else
	{
		$('#id_unidad').prop('required',true);
		$('#id_unidad').val('');
		$('#ubicacion').prop('required',false);
		$("#mostrar_unidad").html('');
		$('#unidad_container').prop('hidden',false);
		$('#proveedor_container').prop('hidden',false);
		$('#contenedor_ubicacion').prop('hidden',true);
		$('#container_sector_tramite').prop('hidden',true);
		$('#id_tramite').val("0");
		$('#id_sector').val("0");
	}


	$.post("tipos_autocomplete_print.php", { id_e: id }, function(data){
		$('#propiedad').empty();
		$('#propiedad').html(data);
		$('.datepicker').datepicker({
			format: 'yyyy-mm-dd',
			language: 'es',

		});


	});
}

});

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

/*validacion numerica*/
$("#vidautil").numeric({negative:false,decimal:false});
$("#valoradq").numeric({negative:false,decimalPlaces: 2});
$("#valordes").numeric({negative:false,decimalPlaces: 2});
$("#cuentaadq").numeric({negative:false});



	/*restricciones de input teclado*/

	$('.numinput').on('keydown', function(event) {
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

	/*metodos personalizados jquery validate*/

	jQuery.validator.addMethod(
	  "alfanumOespacio",
	  function(value, element) {
	    var isValidMoney = /^[ a-z0-9áéíóúüñ]*$/i.test(value);
	    return (this).optional(element) || isValidMoney;
	  },
	  'Ingrese sólo letras, números o espacios.'
	);
	jQuery.validator.addMethod(
	  "alfanumOguion",
	  function(value, element) {
	    var isValidMoney = /^[a-z0-9áéíóúüñ-]*$/i.test(value);
	    return (this).optional(element) || isValidMoney;
	  },
	  'Ingrese sólo letras, números o guiones.'
	);
	jQuery.validator.addMethod(
	  "alfanumOguionOespacio",
	  function(value, element) {
	    var isValidMoney = /^[ a-z0-9áéíóúüñ-]*$/i.test(value);
	    return (this).optional(element) || isValidMoney;
	  },
	  'Ingrese sólo letras, números , espacios o guiones.'
	);
	jQuery.validator.addMethod(
	  "numeric",
	  function(value, element) {
	    var isValidMoney = /^[0-9]*$/.test(value);
	    return (this).optional(element) || isValidMoney;
	  },
	  'Ingrese números.'
	);

	jQuery.validator.addMethod(
	  "decimal",
	  function(value, element) {
	    var isValidMoney = /^\d{1,7}(\.\d{0,2})?$/.test(value);
	    return (this).optional(element) || isValidMoney;
	  },
	  "Debe ser un numero positivo de con dos decimales maximo"
	);

	jQuery.validator.addMethod(
	  "money",
	  function(value, element) {
	    var isValidMoney = /^\d{0,7}(\.\d{0,4})?$/.test(value);
	    return (this).optional(element) || isValidMoney;
	  },
	  "Debe ser un numero de 0 a 9,999,999 con dos decimales maximo"
	);

	jQuery.validator.addMethod(
	  "menor",
	  function(value, element) {

	    var isValidMoney=false;
			var valadq =$('#valoradq').val();
			if(value<=valadq){
				isValidMoney=true;
			}

	    return (this).optional(element) || isValidMoney;
	  },
	  "El valor de desecho debe ser menor o igual al valor de adquisicion"
	);

/*confimar valores del formulario con sweetalert*/
	function confirmar(){
	 swal({
		title: "Confirmar Entradas",
		text: "¿Estas absolutamente seguro de que todo esta correcto?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#1ab394",
		confirmButtonText: "Si",
		cancelButtonText: "Cancelar",
		closeOnConfirm: true
	}, function (isConfirm) {
	if (isConfirm) {
		senddata();
	} else {
						 //additional run on cancel  functions can be done hear

	}
	});
	}

		 /*validacion jquery validate*/

	$('#formulario').validate({
			ignore: "",
	    rules: {
	            desactivo:
	            {
	            	required: true,
	            },
							vidautil:
	            {
	            	required: true,
	            },
							fechaadq:
	            {
	            	required: true,
	            },
							valoradq:
	            {
	            	required: true,
								money: true,
	            },
							valordes:
	            {
	            	required: true,
								money: true,
								menor: true,
	            },
							id_unidad:
							{
							},
							id_tipo_activo:
							{
								required:true,
							},
							ubicacion:
	            {
								maxlength: 200,
	            },
	        },
	        messages:
	        {
				desactivo: {
					required:"Por favor ingrese la descripcion del activo",
				},
				fechaadq: {
					required:"Por favor ingrese la fecha de adquisicion",
				},
				valoradq: {
					required:"Por favor ingrese el valor de adquisicion",
				},
				valordes: {
					required:"Por favor ingrese el valor de desecho",
				},
				id_unidad: {
					required:"Por favor selecione una unidad",
				},
				id_tipo_activo: {
					required:"Por favor selecione un tipo de activo",
				},
				ubicacion: {
					maxlength:"Maximo numero de caracteres 200",
					required:"La ubicacion del inmueble es requerida",
				},
				vidautil:"Debe ser un valor numerico en años",
			},
	    submitHandler: function (form)
	    {
	        confirmar();
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
	var desactivo=$('#desactivo').val();
	var fechaadq=$('#fechaadq').val();
	var vidautil=$('#vidautil').val();
	var valoradq=$('#valoradq').val();
	var valordes=$('#valordes').val();
	var depreciar=$('#depreciar').val();
	var id_origen=$('#id_origen').val();
	var id_fuente=$('#id_fuente').val();
	var id_unidad=$('#id_unidad').val();
	var ubicacion=$('#ubicacion').val();
	var cuentaadq=$('#cuentaadq').val();
	var id_proveedor=$('#id_proveedor').val();
	var id_tipo_activo=$('#id_tipo_activo').val();
	var codigo=$('#codigo').val();

	var id_sector=$('#id_sector').val();

	if (id_sector==0)
	{
		id_sector=0;
	}
	else
	{
		id_sector=$('#sector').val();
	}

	var id_tramite=$('#id_tramite').val();

	if (id_tramite==0)
	{
		id_tramite=0;
	}
	else
	{
		id_tramite=$('#tramite').val();
	}

    //Get the value from form if edit or insert
	var process=$('#process').val();
	var cadena="";

	$("#propiedad tr").each(function(){
    if($(this).attr("id") > 0)
    {
      cadena=cadena+$(this).attr("id")+",";
    }
  });
	var filas = $("#propiedad").find("tr");//devulve las filas del body
	var resultado = "";
	for(i=1; i<filas.length; i++)
		{ //Recorre las filas 1 a 1
			var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
	    descripcion = $($(celdas[1]).children("input")[0]).val();

	    resultado =resultado+descripcion+",";
		}



	if(process=='insert'&&cadena!="")
	{
		var id_usuario=0;
		var urlprocess='agregar_activo.php';
		var dataString='process='+process+'&desactivo='+desactivo+'&fechaadq='+fechaadq+'&vidautil='+vidautil+'&valoradq='+valoradq+'&valordes='+valordes+'&depreciar='+depreciar+'&id_origen='+id_origen+'&id_fuente='+id_fuente+'&id_unidad='+id_unidad+'&ubicacion='+ubicacion+'&cuentaadq='+cuentaadq+'&id_proveedor='+id_proveedor+'&id_tipo_activo='+id_tipo_activo+'&codigo='+codigo+'&cadena='+cadena+'&resultado='+resultado+'&id_sector='+id_sector+'&id_tramite='+id_tramite;
	}
	else
	{
		if(process=='edited'&&cadena!="")
		{
			var id_activo=$('#id_activo').val();
			var codactivo=$('#codactivo').val();
			var urlprocess='editar_activo.php';
			var dataString='process='+process+'&desactivo='+desactivo+'&fechaadq='+fechaadq+'&vidautil='+vidautil+'&valoradq='+valoradq+'&valordes='+valordes+'&depreciar='+depreciar+'&id_origen='+id_origen+'&id_fuente='+id_fuente+'&id_unidad='+id_unidad+'&ubicacion='+ubicacion+'&cuentaadq='+cuentaadq+'&id_proveedor='+id_proveedor+'&id_tipo_activo='+id_tipo_activo+'&codigo='+codigo+'&cadena='+cadena+'&resultado='+resultado+'&codactivo='+codactivo+'&id_activo='+id_activo+'&id_sector='+id_sector+'&id_tramite='+id_tramite;
		}
		else
		{
			if(cadena=="")
			{
				display_notify('Error','No ha seleccionado ningun tipo de activo');
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
   location.href = 'admin_activo.php';
}
function deleted()
{
	var id_activo = $('#id_activo').val();
	var dataString = 'process=deleted' + '&id_activo=' + id_activo;
	$.ajax({
		type : "POST",
		url : "borrar_activo.php",
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
			url :"admin_activo_dt.php", // json datasource
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