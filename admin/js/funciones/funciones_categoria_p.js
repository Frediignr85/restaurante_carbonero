$(function (){
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


function senddata(){
	var name=$('#nombre').val();
	var description=$('#descripcion').val();

	//Get the value from form if edit or insert
	var process=$('#process').val();

	if(process=='insert')
	{
		var id_categoria=0;
		var urlprocess='agregar_categoria_p.php';
	}

	if(process=='edited')
	{
		var id_categoria=$('#id_categoria').val(); ;
		var urlprocess='editar_categoria_p.php';
	}
	var dataString='process='+process+'&id_categoria='+id_categoria+'&nombre='+name+'&descripcion='+description;
	//alert(dataString);
	$.ajax({
		type:'POST',
		url:urlprocess,
		data: dataString,
		dataType: 'json',
		success: function(datax){
			process=datax.process;
			display_notify(datax.typeinfo,datax.msg);
			if(datax.typeinfo == "Success")
			{
				setInterval("reload1();", 1000);
			}
		}
	});
}

function reload1()
{
	location.href = 'admin_categoria_p.php';
}
function deleted()
{
	var id_categoria = $('#id_categoria').val();
	var dataString = 'process=deleted' + '&id_categoria=' + id_categoria;
	$.ajax({
		type : "POST",
		url : "borrar_categoria_p.php",
		data : dataString,
		dataType : 'json',
		success : function(datax) {
			display_notify(datax.typeinfo, datax.msg);
			if(datax.typeinfo == "Success")
			{
				setInterval("reload1();", 1000);
			}
			$('#deleteModal').hide();
		}
	});
}


$(document).ready(function(){
    generar2();
});	

function generar2(){
	dataTable = $('#editable2').DataTable().destroy()
	dataTable = $('#editable2').DataTable( {
		"pageLength": 50,
		"order":[ 0, 'desc' ],
  		"processing": true,      
		"autoWidth": false,
		"serverSide": true,
		"ajax":{
					url :"admin_categoria_p_dt.php", // json datasource
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