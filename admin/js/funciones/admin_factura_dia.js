var urlprocess="admin_factura_dia.php";
$(document).ready(function() {
  $('#editable2').dataTable({
	"pageLength": 50,
	"order":[[ 0, 'desc' ], [ 3, 'desc' ]],
  "language": {
            "url": "js/funciones/Spanish.json"
        }
	});
  /* 	buscar();
	$("#buscar").click(function(){
		buscar();
	});
 */
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
