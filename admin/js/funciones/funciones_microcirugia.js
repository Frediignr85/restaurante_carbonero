$(document).ready(function()
{
	generar2();
	$('#costo_base').numeric({
		negative: false,
		decimalPlaces: 2
	});
	$(".select").select2();
	$('#formulario').validate(
		{
			rules:
			{
				descripcion:
				{
					required: true,
				},
				costo_base:
				{
					required: true,
				},


			},
			messages:
			{
				descripcion: "Por favor ingrese la descripcion",
				costo_base: "Por favor ingrese el costo base",


			},
			highlight: function(element)
			{
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(element)
			{
				$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
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
		$(document).on("click", "#btnDelete", function(event)
		{
			deleted();
		});
		// Clean the modal form
		$(document).on('hidden.bs.modal', function(e)
		{
			var target = $(e.target);
			target.removeData('bs.modal').find(".modal-content").html('');
		});

	});



	function senddata()
	{
		var descripcion=$('#descripcion').val();
		var observaciones=$('#observaciones').val();
		var costo_base=$('#costo_base').val();


		//Get the value from form if edit or insert
		var process=$('#process').val();

		if(process=='insert')
		{
			var id_microcirugia=0;
			var urlprocess='agregar_microcirugia.php';
		}
		if(process=='edit')
		{
			var id_microcirugia=$('#id_microcirugia').val();
			var urlprocess='editar_microcirugia.php';
		}
		var dataString ='process='+process+'&id_microcirugia='+id_microcirugia+'&descripcion='+descripcion+'&observaciones='+observaciones+'&costo_base='+costo_base;
		$.ajax({
			type:'POST',
			url:urlprocess,
			data: dataString,
			dataType: 'json',
			success: function(datax)
			{
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
		location.href = 'admin_microcirugia.php';
	}
	function deleted()
	{
		var id_microcirugia = $('#id_microcirugia').val();
		var dataString = 'process=deleted' + '&id_microcirugia=' + id_microcirugia;
		$.ajax({
			type : "POST",
			url : "borrar_microcirugia.php",
			data : dataString,
			dataType : 'json',
			success : function(datax)
			{
				display_notify(datax.typeinfo, datax.msg);
				if(datax.typeinfo=="Success")
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
				"order":[ 0, 'asc' ],
				"processing": true,
				"serverSide": true,
				"ajax":{
						url :"admin_microcirugia_dt.php", // json datasource
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
