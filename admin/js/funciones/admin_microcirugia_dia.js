var urlprocess="admin_factura_dia.php";
$(document).ready(function() {
  generar2();


	$("#buscar").click(function(){
		generar2();
	});

});
function buscar()
{
	var ini = $("#desde").val();
    var fin = $("#hasta").val();
    var dataString="ini="+ini+"&fin="+fin;
    $.ajax({
		type : "POST",
		url : urlprocess,
		data : dataString,
		success : function(datax) {
			$("#refill").html(datax);
		}
	});
}
$(document).on("click", "#btnDelete", function(event) {
anular();
});

function anular() {
	var id_microcirugia_pte= $('#id_microcirugia_pte').val();
	var dataString = 'process=anular_datos' + '&id_microcirugia_pte=' + id_microcirugia_pte;
	$.ajax({
		type : "POST",
		url : "anular_insumos_micro.php",
		data : dataString,
		dataType : 'json',
		success : function(datax) {
			display_notify(datax.typeinfo, datax.msg);
			setInterval("location.reload();", 3000);
			$('#deleteModal').hide();
		}
	});
}
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
					url :"admin_microcirugia_dia_dt.php?fechai="+fechai+"&fechaf="+fechaf, // json datasource
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