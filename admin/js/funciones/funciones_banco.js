$(document).ready(function()
{
    generar2()
	$("file").fileinput({'showUpload':true, 'previewFileType':'image'});
	$('#formulario').validate({
	    rules: {
	        nombre: {
	        	required: true,
	        },
	     },
	    messages: {
	        nombre: "Por favor ingrese el nombre del banco",
		},
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
});
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

function autosave(val){
	var name=$('#name').val();
	if (name==''|| name.length == 0){
		var	typeinfo="Info";
		var msg="The field name is required";
		display_notify(typeinfo,msg);
		$('#name').focus();
	}
	else{
		senddata();
	}
}

function senddata()
{
	var process=$('#process').val();
    var urlprocess="";
	if(process=='insert')
	{
		urlprocess='agregar_banco.php';
	}
	if(process=='edited')
	{
		urlprocess='editar_banco.php';
	}
    var form = $("#formulario");
    var formdata = false;
    if(window.FormData)
    {
        formdata = new FormData(form[0]);
    }
    $.ajax({
        type        : 'POST',
        url         : urlprocess,
        cache       : false,
        data        : formdata ? formdata : form.serialize(),
        contentType : false,
        processData : false,
        dataType : 'json',
        assync: false,
        success: function(data)
        {
		    display_notify(data.typeinfo,data.msg);
		    if(data.typeinfo=="Success")
		    {
		       setInterval("reload1();", 1500);
		    }
	    }
    });
}
function reload1()
{
     location.href = 'admin_banco.php';
}
function deleted()
{
	var id_banco = $('#id_banco').val();
	var dataString = 'process=deleted' + '&id_banco=' + id_banco;
	$.ajax({
		type : "POST",
		url : "borrar_banco.php",
		data : dataString,
		dataType : 'json',
		success : function(datax)
		{
			display_notify(datax.typeinfo, datax.msg);
			if(datax.typeinfo == "Success")
			{
				setInterval("location.reload();", 1000);
				$('#deleteModal').hide();
			}
		}
	});
}

function generar2(){
    dataTable = $('#editable2').DataTable().destroy()
    dataTable = $('#editable2').DataTable( {
            "pageLength": 50,
            "order":[ 0, 'asc' ],
            "processing": true,
            "serverSide": true,
            "ajax":{
                    url :"admin_banco_dt.php", // json datasource
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
