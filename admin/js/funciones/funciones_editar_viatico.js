$(document).ready(function(){
    var processxx = $('#process').val();
	if (processxx == 'edited'){
		var id_movimiento = $('#id_movimiento').val();
		var datos = "process=recuperar"+"&id_movimiento="+id_movimiento;
		$.ajax({
			type : "POST",
			url : "editar_movimiento_caja_v.php",
			data : datos,
			dataType : 'json',
			success : function(datos) {
				$.each(datos, function(key, value){
					var arr = Object.keys(value).map(function(k) { return value[k]});
					var id_mov_caja= arr[0];
					var naturaleza= arr[1];
					var detalle= arr[2];
					var valor= arr[3];
					var id_mcd= arr[4];
					agregar_tabla(naturaleza,detalle,valor);
				});
			}
		});
	}
});
function agregar_tabla(natux,detallex,valorx){
	var natu="";
	var detalle="";
	var valor="";
	if(natux == "" || detallex == "" || valorx == ""){
		natu = $("#natu").val();
	  	detalle = $("#detalle").val();
	  	valor = $("#valor").val();
	}
	else{
		natu = natux;
	  	detalle = detallex;
	  	valor = valorx;
	}
	if (natu != "" &&  detalle != "" && valor != "" ) {
	    var fila = "<tr>";
		fila += "<td ><input type='text' class='natu' value='"+natu+"'><input type='hidden' class='id_mcd'  value='0'></td>";
	    fila += "<td ><input type='text'  class='detalle' value='"+detalle+"'></td>";
	    fila += "<td ><input type='text' class='valor numeric' value='"+valor+"'></td>";
	  	fila += "<td class='delete text-center'><a class='btn Delete'><i class='fa fa-trash'></i></a></td>";
        fila +="</tr>";
	    $("#presentacion_table").append(fila);
	    $(".clear").val("");
	}else {
	    display_notify("Error", "Por favor complete todos los campos");
	}
    var importe_total = 0;
    $(".valor").each(
    function(index, value) {
        if ( $.isNumeric( $(this).val() ) ){
        importe_total = importe_total + eval($(this).val());
        //console.log(importe_total);
        var monto=$("#monto").val();
        if(importe_total>monto){
          var resta=importe_total- eval($(this).val());
          var reset=monto-resta;
          eval($(this).val(reset));
          display_notify('Warning', 'La suma de los detalles sobrepaso el monto: verifique!');
        }
        }
      }
    );
}