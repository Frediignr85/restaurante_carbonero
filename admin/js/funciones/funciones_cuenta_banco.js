$(document).ready(function()
{
    generar2();
});
$(function (){
	//binding event click for button in modal form
	$(document).on("click", "#btnDelete", function(event) {
		deleted();
	});
	$(document).on("click", "#submit1", function(event) {
		if($("#nombre").val() != "")
		{
			if($("#numero").val() != "")
			{
				senddata();
			}
			else
			{
				display_notify("Error", "Por favor ingrese el numero de la cuenta");
			}
		}
		else
		{
			display_notify("Error", "Por favor ingrese el nombre de la cuenta");
		}
	});
	// Clean the modal form
	$(document).on('hidden.bs.modal', function(e) {
		var target = $(e.target);
		target.removeData('bs.modal').find(".modal-content").html('');
	});

});

function senddata()
{
	var process=$('#process').val();
	var nombre = $("#nombre").val();
	var numero = $("#numero").val();
	var id_banco = $("#id_banco").val();
	if(process=='insert')
	{
		var urlprocess='agregar_cuenta_banco.php';
		var id_cuenta = 0;
	}
	if(process=='edited')
	{
		var urlprocess='editar_cuenta_banco.php';
		var id_cuenta = $("#id_cuenta").val();
	}
	var dataString = "process="+process+"&nombre="+nombre+"&numero="+numero+"&id_banco="+id_banco+"&id_cuenta="+id_cuenta;
    $.ajax({
        type: 'POST',
        url: urlprocess,
        data: dataString,
        dataType : 'JSON',
        success: function(datax)
        {
		    display_notify(datax.typeinfo,datax.msg,datax.process);
		    if(datax.typeinfo=="Success")
		    {
		       setInterval("reload1("+datax.id_banco+");", 1500);
		       $("#clos").click();
		    }
	    }
    });
}
function reload1(id_banco)
{
    location.href = 'cuenta_banco.php?id_banco='+id_banco;
}
function deleted()
{
	var id_banco = $('#id_banco').val();
	var id_cuenta = $('#id_cuenta').val();
	var dataString = 'process=deleted'+'&id_banco='+id_banco+'&id_cuenta='+id_cuenta;
	$.ajax({
		type : "POST",
		url : "borrar_cuenta_banco.php",
		data : dataString,
		dataType : 'json',
		success : function(datax)
		{
			display_notify(datax.typeinfo, datax.msg);
			if(datax.typeinfo == "Success")
			{
				setInterval("reload1("+datax.id_banco+");", 1000);
				$('#clos').click();
			}
		}
	});
}
function generar2(){
	var id_banco = $("#id_banco_X").val();
	dataTable = $('#editable2').DataTable().destroy()
	dataTable = $('#editable2').DataTable( {
			"pageLength": 50,
			"responsive": true,
			"autoWidth": false,
			"order":[ 0, 'asc' ],
			"processing": true,
			"serverSide": true,
			"ajax":{
					url :"cuenta_banco_dt.php?id_banco="+id_banco, // json datasource
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