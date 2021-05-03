//funcion de redirecionamiento si se guarda corretamente
$(document).ready(function() {
   	buscar();
   	buscar1();
	$("#buscar").click(function(){
		buscar();
	});
  $("#buscar1").click(function(){
    buscar1();
  });

});
function buscar()
{
	generar2();
}
function buscar1()
{
	generar3();
}
function reload1()
{
  location.href = 'admin_movimiento.php';
}
function ver()
{
	var id_detalle_cobro = $('#id_detalle').val();
	var dataString = 'process=ver' + '&id_detalle=' + id_detalle;
	$.ajax({
		type : "POST",
		url : "admin_movimiento.php",
		data : dataString,
		dataType : 'json',
		success : function(datax) {
			display_notify(datax.typeinfo, datax.msg);
			if(datax.typeinfo == "Success")
			{
				setInterval("reload1();", 1500);
			}
		}
	});
}
$(function ()
{
	// Clean the modal form
	$(document).on('hidden.bs.modal', function(e) {
		var target = $(e.target);
		target.removeData('bs.modal').find(".modal-content").html('');
	});

});

function generar2(){
	fechai=$("#desde").val();
	fechaf=$("#hasta").val();

	dataTable = $('#editable2').DataTable().destroy()
	dataTable = $('#editable2').DataTable( {
			"pageLength": 50,
			"order":[ 0, 'asc' ],
			"processing": true,
			"serverSide": true,
			"ajax":{
					url :"admin_movimiento_ingreso_dt.php?fechai="+fechai+"&fechaf="+fechaf, // json datasource
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

function generar3(){
	fechai=$("#desde").val();
	fechaf=$("#hasta").val();

	dataTable = $('#editable3').DataTable().destroy()
	dataTable = $('#editable3').DataTable( {
			"pageLength": 50,
			"order":[ 0, 'desc' ],
			"processing": true,
			"autoWidth": false,
			"serverSide": true,
			"ajax":{
					url :"admin_movimiento_dt.php?fechai="+fechai+"&fechaf="+fechaf, // json datasource
					//url :"admin_factura_rangos_dt.php", // json datasource
					//type: "post",  // method  , by default get
					error: function(){  // error handling
						$(".editable3-error").html("");
						$("#editable3").append('<tbody class="editable_grid-error"><tr><th colspan="3">No se encontró información segun busqueda </th></tr></tbody>');
						$("#editable3_processing").css("display","none");
						$( ".editable3-error" ).remove();
						}
					}
				} );

		dataTable.ajax.reload()
	//}
}
