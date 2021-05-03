var tiempo = 0;+
$(document).ready(function(){
	$(".select").select2();
	$(".otr_guardar").click(function(){
		guardar_otros();
	});
	$("#finiquit").click(function(){
		finalizar();
	});
	show_data($("#id_cita").val());
	$("#diagno").typeahead(
	{
		//Definimos la ruta y los parametros de la busqueda para el autocomplete
	    source: function(query, process)
	    {
			$.ajax(
			{
	            url: 'autocomplete_diagnostico.php',
	            type: 'GET',
	            data: 'query=' + query ,
	            dataType: 'JSON',
	            async: true,
	            //Una vez devueltos los resultados de la busqueda, se pasan los valores al campo del formulario
	            //para ser mostrados
	            success: function(data)
	            {
	              	process(data);
				}
	        });
	    },
	    //Se captura el evento del campo de busqueda y se llama a la funcion agregar_factura()
	    updater: function(selection)
	    {
	    	var data0=selection;
			var id = data0.split("|");
			var nombre = id[1];
				id = parseInt(id[0]);
				if(!exis(id))
				{
					agregar_diagnostico(id, nombre);
				}
				else
				{
					display_notify("Error", "Este diagnostico ya se agrego");
				}

	    }
	});
	$("#exam").typeahead(
	{
		//Definimos la ruta y los parametros de la busqueda para el autocomplete
	    source: function(query, process)
	    {
			$.ajax(
			{
	            url: 'autocomplete_examen.php',
	            type: 'GET',
	            data: 'query=' + query ,
	            dataType: 'JSON',
	            async: true,
	            //Una vez devueltos los resultados de la busqueda, se pasan los valores al campo del formulario
	            //para ser mostrados
	            success: function(data)
	            {
	              	process(data);
				}
	        });
	    },
	    //Se captura el evento del campo de busqueda y se llama a la funcion agregar_factura()
	    updater: function(selection)
	    {
	    	var data0=selection;
			var id = data0.split("|");
			var nombre = id[1];
				id = parseInt(id[0]);
				if(!exise(id))
				{
					agregar_examen(id, nombre);
				}
				else
				{
					display_notify("Error", "Este examen ya se agrego");
				}

	    }
	});
	$("#microciru").typeahead(
	{
		//Definimos la ruta y los parametros de la busqueda para el autocomplete
			source: function(query, process)
			{
			$.ajax(
			{
							url: 'autocomplete_microcirugia.php',
							type: 'GET',
							data: 'query=' + query ,
							dataType: 'JSON',
							async: true,
							//Una vez devueltos los resultados de la busqueda, se pasan los valores al campo del formulario
							//para ser mostrados
							success: function(data)
							{
									process(data);
				}
					});
			},
			//Se captura el evento del campo de busqueda y se llama a la funcion agregar_factura()
			updater: function(selection)
			{
				var data0=selection;
			var id = data0.split("|");
			var nombre = id[1];
				id = parseInt(id[0]);
				if(!exism(id))
				{
					agregar_microcirugia(id, nombre);
				}
				else
				{
					display_notify("Error", "Este tipo de Microcirugia ya se agrego");
				}

			}
	});
});
$(function ()
{
	//binding event click for button in modal form
	// Clean the modal form
	$(document).on('ifChecked',"#plana", function(event)
	{
		$('#plan').val("1");
	});
	$(document).on('ifUnchecked','#plana', function(event)
	{
		$('#plan').val("0");
	});
	$(document).on("click",".elim", function(){
		var id = $(this).attr("id");
		var dataString = "process=rm_diagnostico&id="+id+"&id_cita="+$("#id_cita").val();
		$("#diagnos_tt tr").each(function(){
			if($(this).attr("id") == id)
			{
				$.ajax({
				type:'POST',
				url:"consulta1.php",
				data: dataString,
				dataType: 'json',
				success: function(datax)
				{
					//display_notify(datax.typeinfo, datax.msg);
					if(datax.typeinfo == "Success")
					{
						$("#diagnos_tt #"+id+"").remove();
					}
				}
				});
			}
		});
	});
	$(document).on("click",".borrar_ciru", function(){
    /* borrar por id */
		var tr = $(this).parents("tr");
		var id = tr.find("#id_mic").val();
		var dataString = "process=rm_cirugia&id="+id+"&id_cita="+$("#id_cita").val();
		$("#micro_tt tr").each(function(){
		/*	if($(this).attr("id") == id)
			{*/
				$.ajax({
				type:'POST',
				url:"consulta1.php",
				data: dataString,
				dataType: 'json',
				success: function(datax)
				{
					//display_notify(datax.typeinfo, datax.msg);
					if(datax.typeinfo == "Success")
					{
						$("#micro_tt #"+id+"").remove();
					}
				}
				});
			//}
		});
		 if ($('#micro_tt tr').length<=1) {
					$("#honorarios_tt #2").remove();
		}

	});
	$(document).on("click",".elimi", function(){
		var id = $(this).attr("id");
		var dataString = "process=rm_examen&id="+id+"&id_cita="+$("#id_cita").val();
		$("#exam_tt tr").each(function(){
			if($(this).attr("id") == id)
			{
				$.ajax({
				type:'POST',
				url:"consulta1.php",
				data: dataString,
				dataType: 'json',
				success: function(datax)
				{
					if(datax.typeinfo == "Success")
					{
						$("#exam_tt #"+id+"").remove();
					}
				}
				});
			}
		});
	});
	$(document).on("click",".elimin", function(){
		var id = $(this).attr("id");
		var dataString = "process=rm_receta&id="+id+"&id_cita="+$("#id_cita").val();
		$("#receta tr").each(function(){
			if($(this).attr("id") == id)
			{
				$.ajax({
				type:'POST',
				url:"consulta1.php",
				data: dataString,
				dataType: 'json',
				success: function(datax)
				{
					if(datax.typeinfo == "Success")
					{
						$("#receta #"+id+"").remove();
					}
				}
				});
			}
		});
	});
	$(document).on('hidden.bs.modal', function(e)
	{
		var target = $(e.target);
		target.removeData('bs.modal').find(".modal-content").html('');
	});

	$(document).on("click", "#btn_guardar", function(event)
	{
		if($("#nombre").val()!="")
		{
			if($("#apellido").val()!="")
			{
				if($("#sexo").val()!="")
				{
					if($("#fecha").val()!="")
					{
						if($("#telefono1").val()!="")
						{
							if($("#direccion").val()!="")
							{
								editar_paciente();
							}
							else
							{
								display_notify("Warning", "Por favor ingrese la direccion");
							}
						}
						else
						{
							display_notify("Warning", "Por favor ingrese el numero de telefono");
						}
					}
					else
					{
						display_notify("Warning", "Por favor ingrese la fecha de nacimiento");
					}
				}
				else
				{
					display_notify("Warning", "Por favor seleccion el genero");
				}
			}
			else
			{
				display_notify("Warning", "Por favor ingrese el apellido");
			}
		}
		else
		{
			display_notify("Warning", "Por favor ingrese el nombre del paciente");
		}
	});
	$(document).on("click", "#btn_agregar_arc", function()
	{
		if($("#foto").val()!="")
		{
			if($("#descripcion").val()!="")
			{
				$(this).attr("disabled", true);
				upload();
			}
			else
			{
				display_notify("Error", "Por favor ingrese la descripcion de la imagen");
			}
		}
		else
		{
			display_notify("Error", "Debe seleccionar un archivo");
		}
	});
	$(document).on("click", "#btn_add_ref", function()
	{
		if($("#destino").val()!="")
		{
			if($("#motivo").val()!="")
			{
				referencia();
			}
			else
			{
				display_notify("Error", "Por favor ingrese el motivo de la referencia");
			}
		}
		else
		{
			display_notify("Error", "Por favor ingrese el destino de la referencia");
		}
	});
	$(document).on("click", "#btn_add", function(event){
		agregar_singos();
	});
	$(document).on('keydown', '.tel',function (event)
    {
	    if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 37 || event.keyCode == 39)
	    {

	    }
	    else
	    {
	        inputval = $(this).val();
	        var string = inputval.replace(/[^0-9]/g, "");
	        var bloc1 = string.substring(0,4);
	        var bloc2 = string.substring(4,7);
	        var string =bloc1 + "-" + bloc2;
	        $(this).val(string);
	    }
	});
	$(document).on("click", "#btn_add_med", function(){
		if($("#id_med").val()!="")
		{
			if($("#cantidad").val()!="")
			{
				if($("#dosis").val()!="")
				{
					if(!exisa($("#id_med").val()))
					{
						sendd();
					}
					else
					{
						display_notify("Error", "Este medicamento ya fue agregado");
					}
				}
				else
				{
					display_notify("Error","Ingrese la dosis");
				}
			}
			else
			{
				display_notify("Error", "Ingrese la cantidad");
			}
		}
		else
		{
			display_notify("Error", "Seleccione un medicamento");
		}
	});
	$(document).on("click", ".fileinput-remove-button", function(){
		$("#foto").attr("name", "foto");
	});
});
function exis(id)
{
	var ret = false;
	$("#diagnos_tt tr").each(function(){
		if($(this).attr("id") == id)
		{
			ret = true;
		}
	});
	return ret;
}
function exise(id)
{
	var ret = false;
	$("#exam_tt tr").each(function(){
		if($(this).attr("id") == id)
		{
			ret = true;
		}
	});
	return ret;
}
function exisa(id)
{
	var ret = false;
	$("#receta tr").each(function(){
		if($(this).attr("id") == id)
		{
			ret = true;
		}
	});
	return ret;
}
function exism(id)
{
	var ret = false;
	$("#micro_tt tr").each(function(){
		if($(this).attr("id") == id)
		{
			ret = true;
		}
	});
	return ret;
}
function autosave(val)
{
	var name=$('#name').val();
	if (name==''|| name.length == 0){
		var	typeinfo="Info";
		var msg="The field name is required";
		display_notify(typeinfo,msg);
		$('#name').focus();
	}
	else
	{

	}
}
function agregar_diagnostico(id, nombre)
{
	var dataString = "process=diagnostico&id="+id+"&id_cita="+$("#id_cita").val();
	$.ajax({
		type:'POST',
		url:"consulta1.php",
		data: dataString,
		dataType: 'json',
		success: function(datax)
		{
			//display_notify(datax.typeinfo, datax.msg);
			if(datax.typeinfo == "Success")
			{
				var fila = "<tr id='"+id+"'><td>"+nombre+"</td><td><a class='btn elim' id='"+id+"'><i class='fa fa-trash'></i></a></td></tr>";
				$("#diagnos_tt").append(fila);
			}
		}
	});
}
function agregar_examen(id, nombre)
{
	var dataString = "process=examen&id="+id+"&id_cita="+$("#id_cita").val();
	$.ajax({
		type:'POST',
		url:"consulta1.php",
		data: dataString,
		dataType: 'json',
		success: function(datax)
		{
			if(datax.typeinfo == "Success")
			{
				var fila = "<tr id='"+id+"'><td>"+nombre+"</td><td><a class='btn elimi' id='"+id+"'><i class='fa fa-trash'></i></a></td></tr>";
				$("#exam_tt").append(fila);
			}
		}
	});
}
function agregar_microcirugia(id, nombre)
{
	var dataString = "process=microcirugia&id="+id+"&id_cita="+$("#id_cita").val();
	$.ajax({
		type:'POST',
		url:"consulta1.php",
		data: dataString,
		dataType: 'json',
		success: function(datax)
		{
			if(datax.typeinfo == "Success")
			{
				var id_mic="<input type='hidden' id='id_mic' value='"+id+"' />"
				var fila = "<tr id='"+id+"'><td>"+id_mic+nombre+"</td><td><a class='btn borrar_ciru' id='"+id+"'><i class='fa fa-trash'></i></a></td></tr>";
				$("#micro_tt").append(fila);
			if ($('#honorarios_tt #2').length == 0) {
				var honorarios="<tr id='2'>";
						honorarios+="<td>MICROCIRUGIA</td>";
						honorarios+="<td>";
						honorarios+="<label class='checkbox-inline'><input type='checkbox' id='paquete' value='1'>PAQUETE</label>";
						honorarios+="</td>";
						honorarios+="<td><input type='text' id='txt_honorarios_micr' value='0.00'/></td>";
						honorarios+="</tr>";
						$("#honorarios_tt").append(honorarios);
			}

			}
		}
	});
}
function agregar_singos(id_p=0,estatura='',peso='',temperatura='',presion='', frecuencia_r='', frecuencia_c='',observaciones='')
{
	if(id_p==0)
	{
		var dataString = $("#add_signo").serialize();
	}
	else
	{
		var dataString='process=insert&id_paciente='+id_p+"&estatura="+estatura+"&peso="+peso+"&temperatura="+temperatura+"&presion="+presion;
			dataString+= '&frecuencia_r='+frecuencia_r+"&frecuencia_c="+frecuencia_c+"&observaciones="+observaciones;
	}
	$.ajax({
		type:'POST',
		url:"signos.php",
		data: dataString,
		dataType: 'json',
		success: function(datax)
		{
			if(id_p==0)
			{
				display_notify(datax.typeinfo, datax.msg);
			}
			if(datax.typeinfo == "Success")
			{
				$("#editModal #btn_ca").click();
				show_data(datax.id);
			}
		}
	});
}
function referencia()
{
	var dataString = $("#add_ref").serialize();
	$.ajax({
		type:'POST',
		url:"referencia.php",
		data: dataString,
		dataType: 'json',
		success: function(datax)
		{
			display_notify(datax.typeinfo, datax.msg);
			if(datax.typeinfo == "Success")
			{
				$("#viewModal #btn_ca").click();
			}
		}
	});
}
function sendd(id=0, descrip='',dosi='',pla='',cantida=0)
{
	if(id==0)
	{
		var id_medicamento = $("#id_med").val();
		var descript = $("#descript").val().split(",");
		var dosis = $("#dosis").val();
		var plan = $("#plan").val();
		var cantidad = $("#cantidad").val();
	}
	else
	{
		var id_medicamento = id;
		var descript = descrip.split(",");
		var dosis = dosi;
		var plan = pla;
		var cantidad = cantida;
	}
	var dataString = "process=receta&id="+id_medicamento+"&cantidad="+cantidad+"&dosis="+dosis+"&plan="+plan+"&id_cita="+$("#id_cita").val();
	$.ajax({
		type:'POST',
		url:"consulta1.php",
		data: dataString,
		dataType: 'json',
		success: function(datax)
		{
			if(datax.typeinfo == "Success")
			{
				var fila = "<tr id='"+id_medicamento+"'>";
					fila +="<td>"+descript[0]+"</td>";
					fila +="<td><a class='btn elimin' id='"+id_medicamento+"'><i class='fa fa-trash'></i></a></td>";
					fila +="<td><a href='ver_receta.php?id="+id_medicamento+"&idc="+$("#id_cita").val()+"' class='btn' data-toggle='modal' data-target='#viewModal' data-refresh='true'><i class='fa fa-eye'></i></a></td></tr>";
				$("#dosis").val("");
				$("#cantidad").val("");
				$("#display_prod").html("");
				$("#dosis_dis").hide();
				$("#plaan").hide();
				$("#plana").iCheck('uncheck');
				$("#plana").attr("checked",false);
				$("#receta").append(fila);
			}
		}
	});
}
function guardar_otros()
{
	var diagnostico = $("#otr_diagnostico").val();
	var examen = $("#otr_examen").val();
	var medicamento = $("#otr_medicamento").val();
	var motivo = $("#otr_motivo").val();
	var id = $("#id_cita").val();
	var dataString = "process=otr&id="+id+"&diagnostico="+diagnostico+"&examen="+examen+"&medicamento="+medicamento+"&motivo="+motivo;
	$.ajax({
		type:'POST',
		url:"consulta1.php",
		data: dataString,
		dataType: 'json',
		success: function(datax)
		{
			display_notify(datax.typeinfo, datax.msg);
		}
	});
}
function finalizar(){
	var diagnostico = $("#otr_diagnostico").val();
	var examen = $("#otr_examen").val();
	var medicamento = $("#otr_medicamento").val();
	var motivo = $("#otr_motivo").val();
	var id = $("#id_cita").val();
	var honorarios_cons=$("#txt_honorarios_cons").val();
	var honorarios_mic=0;
	var paquete=0;
	if ($("#txt_honorarios_micr").length>0){
		honorarios_mic=$("#txt_honorarios_micr").val();
		if( $('#paquete').prop('checked') ) {
		//	alert('Seleccionado Paquete');
			paquete=1;
		}

	}
	var dataString = "process=finalizar&id="+id+"&diagnostico="+diagnostico+"&examen="+examen+"&medicamento="+medicamento+"&motivo="+motivo;
	dataString+="&honorarios_cons="+honorarios_cons;
	dataString+="&honorarios_mic="+honorarios_mic;
	dataString+="&paquete="+paquete;
	alert(dataString);
	$.ajax({
		type:'POST',
		url:"consulta1.php",
		data: dataString,
		dataType: 'json',
		success: function(datax)
		{
			display_notify(datax.typeinfo, datax.msg);
			if(datax.typeinfo == "Success")
			{
				setInterval("reload1();", 1500);
			}
		}
	});
}
function editar_paciente()
{
	var dataString = $("#formulario_paciente").serialize();
	$.ajax({
		type:'POST',
		url:"editar_paciente1.php",
		data: dataString,
		dataType: 'json',
		success: function(datax)
		{
			display_notify(datax.typeinfo, datax.msg);
			if(datax.typeinfo == "Success")
			{
				$("#editModal #btn_ce").click();
				show_data(datax.id);
			}
		}
	});

}
function upload()
{
    var form = $("#form");
    var formdata = false;
    if(window.FormData)
    {
        formdata = new FormData(form[0]);
    }
    var formAction = form.attr('action');
    $.ajax({
        type        : 'POST',
        url         : 'foto_paciente.php',
        cache       : false,
        data        : formdata ? formdata : form.serialize(),
        contentType : false,
        processData : false,
        dataType : 'json',
        success: function(datax)
        {
		   if(datax.typeinfo == 'Success')
	       {
				var fila = "<tr id='fl"+datax.id_img+"'>";
					fila += "<td>"+datax.fecha+"</td>";
					fila += "<td><a target='_blank' href="+datax.url+">"+datax.nombre+"</a></td>";
					fila += "<td><button id='"+datax.id_img +"' class='btn eliminar'><i class='fa fa-trash'></i></button></td>";
					fila += "</tr>";
				$("#table").append(fila);
				$("#foto").val("");
				$("#descripcion").val("");
				$(".fileinput-remove-button").click();
				$("#foto").attr("name", "foto");
				$("#btn_agregar_arc").attr("disabled", false);
	        }
	        else
	        {
				display_notify(datax.typeinfo, datax.msg);//datax.msg);
	        }
	    }
    });
}
function reload1(id)
{
	if($("#acc").val()=="new")
	{
		location.href = "consulta.php";
	}
	else
	{
		location.href = "admin_consulta.php";
	}
}
$(function ()
{
    $(document).on('click', '.change', function(e){
    	var $this = $(this).children("i");
		if($(this).attr("act")=="down")
		{
			$this.removeClass("fa-angle-double-down");
			$this.addClass("fa-angle-double-up");
			$(this).attr("act","up");
		}
		else
		{
			$this.removeClass("fa-angle-double-up");
			$this.addClass("fa-angle-double-down");
			$(this).attr("act","down");
		}
	})
});
$(document).on('change', '#sin_honorario', function(e){
	var honorarios=$("#honorarios_dr").val()
	if (this.checked) {
		$("#txt_honorarios_cons").val('0.0')
	}
	else {
		$("#txt_honorarios_cons").val(honorarios)
	}
});

function show_data(id)
{
	$.ajax({
		type:'POST',
		url:'consulta1.php',
		data:"process=buscar&id="+id,
		dataType:'json',
		success: function(datax)
		{
			if(datax.typeinfo=="Success")
			{
				$("#dato").html(datax.table);
				$("#signo").html(datax.signo);
			}
			else
			{
			}
		},
	});
}
function clear_class()
{
	$(".list-group li").each(function(){
		$(this).removeClass("active");
	});
}
function uniexis(id)
{
	$(".list-group li").each(function(){
		if($(this).attr("id") !=id)
		{
			$(this).removeClass("active");
		}
	});
}
$(document).on("click", ".eliminar", function(event){
	var id_btn = $(this).attr("id");
	$("#table tr").each(function()
	{
		var id_btn_2 = $(this).find(".eliminar").attr("id");
		if(id_btn == id_btn_2)
		{
			var ajaxdata =
			{
				"process":"deleted",
				"id_img":id_btn
			}
			$.ajax({
			type:'POST',
			url:"foto_paciente.php",
			data: ajaxdata,
			dataType: 'json',
			success: function(datax)
			{
				if(datax.typeinfo == "Success" )
				{
					$("#fl"+id_btn+"").remove();
				}
				else if(datax.typeinfo == "Error")
				{
				}
			}
			})
		}
	})
});
