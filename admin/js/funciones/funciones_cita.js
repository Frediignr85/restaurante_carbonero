$(document).ready(function() {
  $(".select").select2();
  $(".numeric").numeric({
    negative: false,
    decimals: false
  });
  $("#nombre").typeahead({
    //Definimos la ruta y los parametros de la busqueda para el autocomplete
    source: function(query, process) {
      $.ajax({
        url: 'autocomplete_paciente.php',
        type: 'GET',
        data: 'query=' + query,
        dataType: 'JSON',
        async: true,
        //Una vez devueltos los resultados de la busqueda, se pasan los valores al campo del formulario
        //para ser mostrados
        success: function(data) {
          process(data);
        }
      });
    },
    //Se captura el evento del campo de busqueda y se llama a la funcion agregar_factura()
    updater: function(selection) {
      var data0 = selection;
      var id = data0.split("|");
      var nombre = id[1];
      id = parseInt(id[0]);
			$("#nombre").addClass("hidden");
			$("#pacientex").removeClass("hidden");
      $("#pacientex").val(nombre);
      $("#id_paciente").val(id);

    }
  });
	$("#pacientex").click(function(){
		$("#nombre").removeClass("hidden");
		$("#pacientex").addClass("hidden");
		$("#pacientex").val("");
		$("#id_paciente").val("");
	});
  $("#doctor").change(function() {
    var id_doctor = $(this).val();
    $.ajax({
      type: 'POST',
      url: 'agregar_cita1.php',
      data: 'process=cons_esp&id_doctor=' + id_doctor,
      dataType: 'JSON',
      success: function(datax) {
        $("#esp").html(datax.select);
        $("#especialidad").select2();
      }
    });
  });
  $("#submit1").click(function() {
    if ($("#id_paciente").val() != "") {
      if ($("#doctor").val() != "") {
        if ($("#fecha").val() != "") {
          if ($("#hora").val() != "") {
            if ($("#espacio").val() != "") {
              if ($("#motivo").val() != "") {
                if ($("#estado").val() != "") {
                  senddata();
                } else {
                  display_notify("Warning", "Por favor seleccione el estado de la cita");
                }
              } else {
                display_notify("Warning", "Por favor ingrese el motivo de la cita");
              }
            } else {
              display_notify("Warning", "Por favor seleccione un consultorio");
            }
          } else {
            display_notify("Warning", "Por favor ingrese la hora de la cita");
          }
        } else {
          display_notify("Warning", "Por favor ingrese la fecha de la cita");
        }
      } else {
        display_notify("Warning", "Por favor seleccione un medico");
      }

    } else {
      display_notify("Warning", "Por favor seleccione un paciente");
    }
  });
});
$(function() {
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

function autosave(val) {
  var name = $('#name').val();
  if (name == '' || name.length == 0) {
    var typeinfo = "Info";
    var msg = "The field name is required";
    display_notify(typeinfo, msg);
    $('#name').focus();
  } else {
    senddata();
  }
}

function senddata() {
  var id_paciente = $('#id_paciente').val();
  var id_especialidad = $('#especialidad').val();
  var doctor = $('#doctor').val();
  var fecha = $('#fecha').val();
  var hora = $('#hora').val();
  var espacio = $('#espacio').val();
  var estado = $('#estado').val();
  var observaciones = $('#observaciones').val();
  var motivo = $('#motivo').val();

  //Get the value from form if edit or insert
  var process = $('#process').val();

  if (process == 'insert') {
    var id_cita = 0;
    var urlprocess = 'agregar_cita1.php';
  }
  if (process == 'edit') {
    var id_cita = $('#id_cita').val();
    var urlprocess = 'editar_cita1.php';
  }
  var dataString = 'process=' + process + '&id_cita=' + id_cita + '&id_paciente=' + id_paciente + '&doctor=' + doctor + '&fecha=' + fecha;
  dataString += '&hora=' + hora + '&espacio=' + espacio + '&estado=' + estado + '&observaciones=' + observaciones + '&motivo=' + motivo+ '&id_especialidad=' + id_especialidad;
  $.ajax({
    type: 'POST',
    url: urlprocess,
    data: dataString,
    dataType: 'json',
    success: function(datax) {
      display_notify(datax.typeinfo, datax.msg);
      if (datax.typeinfo == "Success") {
        setInterval("reload1();", 1500);
      }
    }
  });
}

function reload1() {
  location.href = 'admin_cita.php';
}

function deleted() {
  var id_cita = $('#id_cita').val();
  var dataString = 'process=deleted' + '&id_cita=' + id_cita;
  $.ajax({
    type: "POST",
    url: "borrar_cita.php",
    data: dataString,
    dataType: 'json',
    success: function(datax) {
      display_notify(datax.typeinfo, datax.msg);
      if (datax.typeinfo == "Success") {
        setInterval("reload1();", 1500);
        $('#deleteModal').hide();
      }
    }
  });
}
