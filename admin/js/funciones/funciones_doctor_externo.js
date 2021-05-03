$(document).ready(function() {
	generar2();
	$(".nume").numeric({
		negative:false,
    	decimal:false
	});
	$(".select").select2();
	$('#formulario').validate({
	    rules: {
				nombre:
				{
					required: true,
				},
				apellido:
				{
					required: true,
				},
                telefono:
                {
                    required: true
                },
                comision:
                {
                    required:true
                }
	        },
	        messages:
	        {
				nombre: "Por favor ingrese el nombre del doctor.",
                apellido: "Por favor ingrese el apellido del doctor.",
                telefono: "Por favor ingrese el numero de telefono.",
                comision: "Por favor ingrese el porcentaje de comision."
			},
	    submitHandler: function (form)
	    {
	        senddata();
	    }
	});
	$(".may").keyup(function() {
    $(this).val($(this).val().toUpperCase());
  });
  	$('#producto').on('keyup', function(evt)
  	{
  		if(evt.keyCode == 32)
  		{
  			$(this).val($(this).val().replace(" ",""));
  		}
  		else
  		{
  			$(this).val($(this).val().toLowerCase());
  		}
  	});
	$('#admi').on('ifChecked', function(event)
	{
		if($("#process").val() =="permissions")
		{
			$('.i-checks').iCheck('check');
			$('#admin').val("1");
		}
		else
		{
			$('#admin').val("1");
		}
	});
	$('#admi').on('ifUnchecked', function(event)
	{
		if($("#process").val() =="permissions")
		{
			$('.i-checks').iCheck('uncheck');
			$('#admin').val("0");
		}
		else
		{
			$('#admin').val("0");
		}
	});
	$('#activ').on('ifChecked', function(event)
	{
		$('#activo').val("1");
	});
	$('#activ').on('ifUnchecked', function(event)
	{
		$('#activo').val("0");
	});
});
//Validaciones de los campos
$('#precio_examen').numeric({negative:false,decimalPlaces:2});
$(function ()
{
	//binding event click for button in modal form
	$(document).on("click", "#anular", function(event) {
		estado();
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
	var apellido=$('#apellido').val();
	var especialidad=$('#especialidad').val();
	var direccion=$('#direccion').val();
	var telefono=$('#telefono').val();
	var email=$('#email').val();
	var comision=$('#comision').val();
	var nombre_consultorio=$('#nombre_consultorio').val();
    //Get the value from form if edit or insert
	var process=$('#process').val();
	if(process=='insert')
	{
		var id_doctor=0;
		var urlprocess='agregar_doctor_externo.php';
		var dataString='process='+process+'&nombre='+nombre+'&apellido='+apellido+'&especialidad='+especialidad+'&direccion='+direccion+'&telefono='+telefono+'&email='+email+'&comision='+comision+'&nombre_consultorio='+nombre_consultorio;
	}
	if(process=='edited')
	{
		var id_doctor=$('#id_doctor').val();
		var urlprocess='editar_doctor_externo.php';
		var dataString='process='+process+'&nombre='+nombre+'&apellido='+apellido+'&especialidad='+especialidad+'&direccion='+direccion+'&telefono='+telefono+'&email='+email+'&comision='+comision+'&id_doctor='+id_doctor+'&nombre_consultorio='+nombre_consultorio;
	}
	if(process=='permissions')
	{
		var id_usuario=$('#id_usuario').val();
		var urlprocess='permiso_usuario.php';
		var myCheckboxes = new Array();
        var cuantos=0;
		var chequeado=false;
		var admin = $("#admin").val();
        $("input[name='myCheckboxes']:checked").each(function(index)
        {
			var est=$('#myCheckboxes').eq(index).attr('checked');
			chequeado=true;
            myCheckboxes.push($(this).val());
            cuantos=cuantos+1;
		});
		if (cuantos==0){
			myCheckboxes='0';
		}

		var dataString='process='+process+'&admin='+admin+'&id_usuario='+id_usuario+'&myCheckboxes='+myCheckboxes+'&qty='+cuantos;
		//alert(dataString);
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
				setInterval("reload();", 1500);
			}
		}
	});
}

function reload()
{
   location.href = 'admin_doctor_externo.php';
}
function estado()
{
    
	var id_doctor = $('#id_doctor').val();
    var estado = $('#estado').val();
    if(estado == 0){
        var id_sucursal = $('#id_sucursal').val();
        var dataString1 = 'process=consultar_doctor_examen' + '&id_doctor=' + id_doctor+ '&id_sucursal=' + id_sucursal;
        $.ajax({
            type : "POST",
            url : "http://labangel.apps-oss.com/api/consultar_doctores.php",
            data : dataString1,
            assync: false,
            dataType : 'json',
            success : function(datax) {
                if(datax.resultado == "SI"){
                    display_notify("Error","El doctor tiene examenes registrados.");
                }
                else{
                    var dataString = 'process=anular' + '&id_doctor=' + id_doctor+ '&estado=' + estado;
                    $.ajax({
                        type : "POST",
                        url : "estado_doctor_externo.php",
                        data : dataString,
                        assync: false,
                        dataType : 'json',
                        success : function(datax) {
                            display_notify(datax.typeinfo, datax.msg);
                            if(datax.typeinfo == "Success")
                            {
                                setInterval("reload();", 1500);
                                $('#deleteModal').hide();
                            }
                        }
                    });
                }
            }
        });	
    }
    else{
        var dataString = 'process=anular' + '&id_doctor=' + id_doctor+ '&estado=' + estado;
        $.ajax({
            type : "POST",
            url : "estado_doctor_externo.php",
            data : dataString,
            assync: false,
            dataType : 'json',
            success : function(datax) {
                display_notify(datax.typeinfo, datax.msg);
                if(datax.typeinfo == "Success")
                {
                    setInterval("reload();", 1500);
                    $('#deleteModal').hide();
                }
            }
        });
    }
   
}

function ver()
{
	var id_empleado = $('#id_empleado').val();
	var dataString = 'process=ver' + '&id_empleado=' + id_empleado;
	$.ajax({
		type : "POST",
		url : "ver_producto.php",
		data : dataString,
		dataType : 'json',
		success : function(datax) {
			display_notify(datax.typeinfo, datax.msg);
			if(datax.typeinfo == "Success")
			{
				setInterval("reload();", 1500);
				$('#verModal').hide();
			}
		}
	});
}
$('#telefono').on('keydown', function (event)
    {
	    if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 37 || event.keyCode == 39)
	    {

	    }
	    else
	    {
	        if((event.keyCode>47 && event.keyCode<60 ) || (event.keyCode>95 && event.keyCode<106 ))
	        {
	        	inputval = $(this).val();
	        	var string = inputval.replace(/[^0-9]/g, "");
		        var bloc1 = string.substring(0,4);
		        var bloc2 = string.substring(4,7);
		        var string =bloc1 + "-" + bloc2;
		        $(this).val(string);
	        }
	        else
	        {
	        	event.preventDefault();
	        }

	    }
	});
$('#dui').on('keydown', function (event)
    {
	    if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 37 || event.keyCode == 39)
	    {

	    }
	    else
	    {
	        if((event.keyCode>47 && event.keyCode<60 ) || (event.keyCode>95 && event.keyCode<106 ))
	        {
	        	inputval = $(this).val();
	        	var string = inputval.replace(/[^0-9]/g, "");
		        var bloc1 = string.substring(0,8);
		        var bloc2 = string.substring(8,8);
		        var string =bloc1 + "-" + bloc2;
		        $(this).val(string);
	        }
	        else
	        {
	        	event.preventDefault();
	        }

	    }
	});
$(document).on("keyup","#comision", function()
{
  if($(this).val()!="")
  {
    if(parseInt($(this).val())<100)
    {

    }
    else {
      $(this).val(100);
    }
  }

});


function generar2(){

	dataTable = $('#editable2').DataTable().destroy()
	dataTable = $('#editable2').DataTable( {
			"pageLength": 50,
			"responsive": true,
			"autoWidth": false,
			"order":[ 0, 'asc' ],
			"processing": true,
			"serverSide": true,
			"ajax":{
					url :"admin_doctor_externo_dt.php", // json datasource
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

		dataTable.ajax.reload();
	//}
}