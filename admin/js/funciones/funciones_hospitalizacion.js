$(document).ready(function(){
    generar();
    setInterval(function(){ generar(); }, 30000);
    $("#paciente_replace").hide();
    $(".select").select2();
    $(".decimal").numeric({negative:false,decimalPlaces:2});

    //buscar pacientes por recepciones

    $("#paciente").typeahead({
        source: function(query, process) {
          $.ajax({
            type: 'POST',
            url: 'autocomplete_paciente_recepcion.php',
            data: 'query=' + query,
            dataType: 'JSON',
            async: true,
            success: function(data) {
              process(data);
              //var name_paciente = $("#paciente").val();
              //$("#id_cliente").val(name_paciente);
            }
          });
        },
        updater: function(selection) {
          var prod0 = selection;
          var prod = prod0.split("|");
          var id_p = prod[0];
          var nombre = prod[1];
          var evento = prod[3];
          //alert("SELECT: "+sexo);
          $('#paciente_replace').val(nombre);
          $('#descripcion_recepcion').val(evento);
          $('#pacientee').val(id_p);
          $('#paciente_replace').show();
          $('#paciente').hide();
          $("#producto_buscar").focus();
          // agregar_producto_lista(id_prod, descrip, isbarcode);
        }
      });

    //buscar pacientes por recepciones
    $('#hora_entrada').timepicker({ 'step': 1 });
    if($("#estado_habitacion").val() == 0){
        $( "#hora_salida" ).prop( "readonly", true );
        $( "#hora_salida" ).val("Seleccione hora de entrada");
    }

    //jquery validate

    $.validator.addMethod('regexp', function(value, element, param)
	{
	  	return this.optional(element) || value.match(param);
	},'Mensaje a mostrar si se incumple la condición');

	$('#formulario_hospitalizacion').validate({
	    rules: {
	        paciente: {
				required: true,
			},
            numero_piso: {
				required: true,
			},
            n_habitacion: {
				required: true,
			},
            precio_habitacion: {
				required: true,
				regexp:/^\d+\.\d{0,2}$/ ,
			},
            fecha_de_entrada: {
				required: true,
				regexp: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/ ,
			},
            hora_entrada: {
				required: true,
				regexp:/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/,
			},
	    },
	    messages: {
			paciente: {
				required: "Por favor ingrese un paciente recepcionado.",
			},
            numero_piso: {
				required: "Por favor ingrese el numero de piso de la habitacion.",
			},
            n_habitacion: {
				required: "Por favor ingrese el numero de habitacion de la habitacion",
			},
            precio_habitacion: {
				required: "Por favor ingrese el precio por hora  de la habitacion",
				regexp:'El precio por hora de la habitacion no es valido' ,
			},
            fecha_de_entrada: {
				required: "Por favor ingrese la fecha de entrada",
				regexp:'La fecha de entrada no es valida' ,
			},
            hora_entrada: {
				required: "Por favor ingrese la hora de entrada",
				regexp:'La hora de entrada no es valida' ,
			},
		},
        errorLabelContainer: 'paciente',
		highlight: function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function(element) {
			$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
		},
	    submitHandler: function (form) {
	        senddata();
	    }
	});
    //jquery validate
    if($("#estado_habitacion").val() != 0){
        var ajaxdata = { "process" : "estado_habitacion_edit", "estado": $("#estado_habitacion").val(), "n_habitacion": $("#n_habitacion").val() };
        $.ajax({
            url:"editar_hospitalizacion.php",
            type: "POST",
            data: ajaxdata,
            dataType: 'json',
            success: function(opciones)
            {
                $("#precio_habitacion").val(opciones.precio);
                $("#informacion_estado").html(opciones.resultado);
                $("#estado_habitacion").val(opciones.estado);
            }
        });
        if($("#radio_cobro1").is(':checked')) {
            var valor = $("#hora_entrada").val();
            var divisor = valor.split(" ");
            var divisor2 = divisor[0].split(":");
            var minuto = divisor2[1];
            var cadena = '';
            var minuto_bueno = parseInt(minuto, 10);
            if(minuto_bueno < 10){
                cadena = "0"+minuto_bueno;
            }
            else{
                cadena = minuto_bueno;
            }
            $('#hora_salida').timepicker({
                'minTime': '00:'+cadena+'am',
                'maxTime': '11:'+cadena+'pm',
                'step': 60
            });
        }
        else{
            $('#hora_salida').timepicker({ 'step': 1 });
        }
    }
    if($("#id_estado_hospitalizacion").val() != "1" && $("#id_estado_hospitalizacion").val() != "2" ){
            $(':radio:not(:checked)').attr('disabled', true);
    }


});
$(document).on("change","#radio_cobro1", function(){
    $('#hora_entrada').val("");
    $('#hora_salida').val("");
    if($("#hora_entrada").val() == ""){
        $("#hora_salida").prop("readonly", true );
        $( "#hora_salida" ).val("Seleccione hora de entrada");
    }
    else{
        $("#hora_salida").prop("readonly", false );
        $("#hora_salida").val("");
    }
});
$(document).on("change","#hora_entrada", function(){

    if($(this).val() == ""){
        $("#hora_salida").prop("readonly", true );
        $( "#hora_salida" ).val("Seleccione hora de entrada");
    }
    else{
        $("#hora_salida").prop("readonly", false );
        $("#hora_salida").val("");
    }
});
$(document).on("change","#radio_cobro2", function(){

    $('#hora_entrada').val("");
    $('#hora_salida').val("");
    if($("#hora_entrada").val() == ""){
        $("#hora_salida").prop("readonly", true );
        $( "#hora_salida" ).val("Seleccione hora de entrada");
    }
    else{
        $("#hora_salida").prop("readonly", false );
        $("#hora_salida").val("");
    }
});
$(document).on("focus", "#paciente_replace", function() {
    $(this).val("");
    $(this).hide();
    $("#paciente").show();
    $("#paciente").focus();
    $('#pacientee').val("0");
});
$(document).on("focus", "#precio_habitacion", function() {
    if($("#n_habitacion").val()){
        $(this).val("");
        $( "#precio_habitacion" ).prop( "readonly", false );
        $("#precio_habitacion").focus();
    }
});

$(document).on("change", "#hora_entrada", function(evt){
    var valor = $(this).val();
    var divisor = valor.split(" ");
    var divisor2 = divisor[0].split(":");
    var minuto = divisor2[1];
    if($("#radio_cobro1").is(':checked')) {
        var cadena = '';
        var minuto_bueno = parseInt(minuto, 10);
        if(minuto_bueno < 10){
            cadena = "0"+minuto_bueno;
        }
        else{
            cadena = minuto_bueno;
        }
        $('#hora_salida').timepicker({
            'minTime': '00:'+cadena+'am',
            'maxTime': '11:'+cadena+'pm',
            'step': 60
        });
    }
    else{
        $('#hora_salida').timepicker({ 'step': 1 });
    }
})
$(document).on("change", "#numero_piso", function(evt)
{
    $("#n_habitacion *").remove();
    $("#select2-n_habitacion-container").text("");
    var ajaxdata = { "process" : "habitacion", "id_piso": $("#numero_piso").val() };
    $.ajax({
        url:"agregar_hospitalizacion.php",
      	type: "POST",
      	data: ajaxdata,
        success: function(opciones)
      	{
			$("#select2-n_habitacion-container").text("Seleccione");
    	    $("#n_habitacion").html(opciones);
            $( "#precio_habitacion" ).prop( "readonly", true );
    	}
    })
});
$(document).on("change", "#n_habitacion", function(evt)
{
    var ajaxdata = { "process" : "estado_habitacion", "id_habitacion": $("#n_habitacion").val() };
    $.ajax({
        url:"agregar_hospitalizacion.php",
      	type: "POST",
      	data: ajaxdata,
        dataType: 'json',
        success: function(opciones)
      	{
            $("#precio_habitacion").val(opciones.precio);
    	    $("#informacion_estado").html(opciones.resultado);
            $("#estado_habitacion").val(opciones.estado);
    	}
    })
});
function generar() {
    fini = $("#fini").val();
    fin = $("#fin").val();
    dataTable = $('#editable2').DataTable().destroy()
    dataTable = $('#editable2').DataTable({
        "pageLength": 50,
        "order": [
            [1, 'desc'],
            [0, 'desc']
        ],
        "processing": true,
        "serverSide": true,
        "rowReorder": {
            dataSrc: 'listing_order'
          },

			"autoWidth": false,
        "ajax": {
            url: "admin_hospitalizaciones_dt.php?fini="+fini+"&fin="+fin, // json datasource
            //url :"admin_factura_rangos_dt.php", // json datasource
            //type: "post",  // method  , by default get
            error: function() { // error handling
                $(".editable2-error").html("");
                $("#editable2").append('<tbody class="editable2_grid-error"><tr><th colspan="3">No se encontró información segun busqueda </th></tr></tbody>');
                $("#editable2_processing").css("display", "none");
                $(".editable2-error").remove();
            }
        },
        "columnDefs": [{
            "targets": 1, //index of column starting from 0
            "render": function(data, type, full, meta) {
                if (data != null)
                    return '<p class="text-success"><strong>' + data + '</strong></p>';
                else
                    return '';
            }
        }],
        "language": {
            "url": "js/Spanish.json"
        }
    });
    dataTable.ajax.reload()
    //}
}
$(function ()
{
	//binding event click for button in modal form
	$(document).on("click", "#btnDelete", function(event)
	{
		deleted();
	});
    $(document).on("click", "#seacr", function(event) {
        generar();
    });
	$(document).on("click", "#btnEstado", function(event)
	{
		estado();
	});
	$(document).on("click", "#btnVolver", function(event)
	{
		reload1();
	});
    $(document).on("click", "#btnAnularHospitalizacion", function(event)
	{
		anular_hospitalizacion();
	});
    $(document).on("click", "#btnBorrarHospitalizacion", function(event)
	{
        borrar_hospitalizacion();
	});

    
	// Clean the modal form
	$(document).on('hidden.bs.modal', function(e)
	{
		var target = $(e.target);
		target.removeData('bs.modal').find(".modal-content").html('');
	});

});
function anular_hospitalizacion(){
    swal({
        title: "Esta a punto de anular una hospitalizacion",
        text: "Esta seguro de hacerlo?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, anular",
        cancelButtonText: "No, cancelar!",
        closeOnConfirm: true,
        closeOnCancel: false
    },
        function(isConfirm) {
            if (isConfirm) {
                var id_hospitalizacion = $("#id_hospitalizacion_anular").val();
                var ajaxdata = { "process" : "anular", "id_hospitalizacion": id_hospitalizacion };
                $.ajax({
                    type : "POST",
                    url : "anular_hospitalizacion.php",
                    data : ajaxdata,
                    async: false,
                    dataType: 'json',
                    success : function(datax) {
                        display_notify(datax.typeinfo,datax.msg);
                        if(datax.typeinfo == "Success")
                        {
                            setInterval("reload1();", 1500);
                        }
                    }
                });

            } else {
            swal("Cancelado", "Operación cancelada", "error");
            correcto++;
            }
    });
}
function borrar_hospitalizacion(){
    swal({
        title: "Esta a punto de borrar una hospitalizacion",
        text: "Esta seguro de hacerlo?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, borrar",
        cancelButtonText: "No, cancelar!",
        closeOnConfirm: true,
        closeOnCancel: false
    },
        function(isConfirm) {
            if (isConfirm) {
                var id_hospitalizacion = $("#id_hospitalizacion_borrar").val();
                var ajaxdata = { "process" : "borrar", "id_hospitalizacion": id_hospitalizacion };
                $.ajax({
                    type : "POST",
                    url : "borrar_hospitalizacion.php",
                    data : ajaxdata,
                    async: false,
                    dataType: 'json',
                    success : function(datax) {
                        display_notify(datax.typeinfo,datax.msg);
                        if(datax.typeinfo == "Success")
                        {
                            setInterval("reload1();", 1500);
                        }
                    }
                });

            } else {
            swal("Cancelado", "Operación cancelada", "error");
            correcto++;
            }
    });
}
function senddata(){
    let id_paciente = $("#pacientee").val();
    let nombre_paciente = $("#paciente").val();
    let id_habitacion = $("#n_habitacion").val();
    let precio_por_hora = $("#precio_habitacion").val();
    let process = $("#process").val();
    let tipo_pago = 1;
    let estado_cuarto =$("#estado_habitacion").val();
    let fecha_de_entrada = $("#fecha_de_entrada").val();
    let fecha_de_salida = $("#fecha_de_salida").val();
    let hora_entrada = $("#hora_entrada").val();
    let hora_salida = $("#hora_salida").val();

    var id_recepcion = 0;
    if(!hora_salida.match(/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/)){
        hora_salida = " 00:00:00";
    }
    if($("#radio_cobro1").is(':checked')) {
        tipo_pago = 0;
    }
    var correcto = 0;
    var dataString="";
    if(process == 'insert'){
        var ajaxdata = { "process" : "verificar_paciente", "id_paciente": id_paciente };
        $.ajax({
            url:"agregar_hospitalizacion.php",
            type: "POST",
            data: ajaxdata,
            dataType: 'json',
            async: false,
            success: function(opciones)
            {
                id_recepcion = opciones.id_recepcion_x;
                dataString+="process="+process+"&id_recepcion="+id_recepcion+"&id_cuarto="+id_habitacion;
                dataString+="&precio_por_hora="+precio_por_hora+"&tipo_pago="+tipo_pago+"&fecha_de_entrada="+fecha_de_entrada;
                dataString+="&fecha_de_salida="+fecha_de_salida+"&hora_entrada="+hora_entrada+"&hora_salida="+hora_salida;
                if(opciones.resultado == "1"){
                    if(estado_cuarto != "DISPONIBLE"){
                        swal({
                            title: "Esta a punto de ingresar una hospitalizacion",
                            text: "Esta seguro de hacerlo?",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "Si, ingresar",
                            cancelButtonText: "No, cancelar!",
                            closeOnConfirm: true,
                            closeOnCancel: false
                        },
                            function(isConfirm) {
                                if (isConfirm) {
                                    ingresar_hospitalizaicon(dataString);
                                } else {
                                swal("Cancelado", "Operación cancelada", "error");
                                correcto++;
                                }
                        });
                    }
                    else{
                        ingresar_hospitalizaicon(dataString);
                    }
                }else{
                    swal("Operacion cancelada", "El paciente "+nombre_paciente+" no existe o no se encuentra registrado en la recepcion.", "error");
                }

            }
    });
    }
    if(process == 'edited'){
        let id_hospitalizacion = $("#id_hospitalizacion").val();
        let dataString = "";
        if($("#id_estado_hospitalizacion").val() == "1"){
            dataString+="process="+process+"&id_cuarto="+id_habitacion+"&id_hospitaliza="+id_habitacion;
            dataString+="&precio_por_hora="+precio_por_hora+"&tipo_pago="+tipo_pago+"&fecha_de_entrada="+fecha_de_entrada;
            dataString+="&fecha_de_salida="+fecha_de_salida+"&hora_entrada="+hora_entrada+"&hora_salida="+hora_salida+"&id_hospitalizacion="+id_hospitalizacion;
            if($("#estado_cuarto").val() != "1"){
                swal({
                    title: "Esta a punto de editar una hospitalizacion",
                    text: "Esta seguro de hacerlo?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Si, editar",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: true,
                    closeOnCancel: false
                },
                    function(isConfirm) {
                        if (isConfirm) {
                            editar_hospitalizacion(dataString);
                        } else {
                        swal("Cancelado", "Operación cancelada", "error");
                        correcto++;
                        }
                });
            }
            else{
                editar_hospitalizacion(dataString);
            }
        }
        if($("#id_estado_hospitalizacion").val() == 2){
            dataString+="process="+process+"&id_cuarto="+id_habitacion+"&id_hospitaliza="+id_habitacion;
            dataString+="&precio_por_hora="+precio_por_hora+"&tipo_pago="+tipo_pago;
            dataString+="&fecha_de_salida="+fecha_de_salida+"&hora_entrada="+hora_entrada+"&hora_salida="+hora_salida+"&id_hospitalizacion="+id_hospitalizacion;
            if($("#estado_cuarto").val() != "1"){
                swal({
                    title: "Esta a punto de editar una hospitalizacion",
                    text: "Esta seguro de hacerlo?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Si, editar",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: true,
                    closeOnCancel: false
                },
                    function(isConfirm) {
                        if (isConfirm) {
                            editar_hospitalizacion(dataString);
                        } else {
                        swal("Cancelado", "Operación cancelada", "error");
                        correcto++;
                        }
                });
            }
            else{
                editar_hospitalizacion(dataString);
            }
        }
        if($("#id_estado_hospitalizacion").val() == 3){

        }

    }

}
function ingresar_hospitalizaicon(dataString){
    $.ajax({
        type : "POST",
        url : "agregar_hospitalizacion.php",
        data : dataString,
        async: false,
        dataType: 'json',
        success : function(datax) {
            display_notify(datax.typeinfo,datax.msg);
            if(datax.typeinfo == "Success")
            {
                setInterval("reload1();", 1500);
            }
        }
    });
}
function editar_hospitalizacion(dataString){
    $.ajax({
        type : "POST",
        url : "editar_hospitalizacion.php",
        data : dataString,
        async: false,
        dataType: 'json',
        success : function(datax) {
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
   location.href = 'admin_hospitalizaciones.php';
}
