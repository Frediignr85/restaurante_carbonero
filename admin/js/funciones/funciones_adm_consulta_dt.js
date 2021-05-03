$(document).ready(function() {
   	buscar();
	$("#buscar").click(function(){
		buscar();
	});

});
function buscar()
{
	generar2();
}
function generar2(){
	fechai=$("#desde").val();
	fechaf=$("#hasta").val();

	dataTable = $('#editable2').DataTable().destroy()
	dataTable = $('#editable2').DataTable( {
			"pageLength": 50,
			"order":[ 1, 'asc' ],
			"processing": true,
			"serverSide": true,
			"ajax":{
					url :"admin_consulta_dt.php?fechai="+fechai+"&fechaf="+fechaf, // json datasource
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
