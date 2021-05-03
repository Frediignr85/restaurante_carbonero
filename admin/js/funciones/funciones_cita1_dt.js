$(document).ready(function() {    
	$("#buscar").click(function(){
		buscar();
	});
   
});
function buscar()
{
	var fecha1 = $("#desde").val();
	var fecha2 = $("#hasta").val();
	dataTable = $('#editable2').DataTable().destroy()
	dataTable = $('#editable2').DataTable( {
		"pageLength": 50,
		"order":[ 0, 'desc' ],
      	"processing": true,      
		"autoWidth": false,
		"serverSide": true,
		"ajax":{
			url :"admin_cita1_dt.php?fecha1="+fecha1+"&fecha2="+fecha2, // json datasource
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
}

function generar2(){
	var fecha1 = $("#desde").val();
	var fecha2 = $("#hasta").val();
	dataTable = $('#editable2').DataTable().destroy()
	dataTable = $('#editable2').DataTable( {
		"pageLength": 50,
		"order":[ 0, 'desc' ],
      	"processing": true,      
		"autoWidth": false,
		"serverSide": true,
		"ajax":{
			url :"admin_cita1_dt.php?fecha1="+fecha1+"&fecha2="+fecha2, // json datasource
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