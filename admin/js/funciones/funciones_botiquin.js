//Inicio de la funcion inicial del archivo funciones_botiquin.js
$(document).ready(function(){

    //Inicio de llamar la funcion que genera el dataTable
    generarDataTable();
    //Fin de llamar la funcion que genera el dataTable

});
//Fin de la funcion inicial del archivo funciones_botiquin.js

//Inicio funcion para generar el datatable de la tabla botiquin

function generarDataTable(){
    fechai=$("#desdeRecepcion").val();
    fechaf=$("#hastaRecepcion").val();  
    dataTable = $('#tblBotiquin').DataTable().destroy()
    dataTable = $('#tblBotiquin').DataTable( {
            "pageLength": 50,
            "order":[ 0, 'asc' ],
            "processing": true,
            "serverSide": true,
            "ajax":{
                    url :"admin_botiquin_dt.php?fechai="+fechai+"&fechaf="+fechaf, // json datasource
                    //url :"admin_factura_rangos_dt.php", // json datasource
                    //type: "post",  // method  , by default get
                    error: function(){  // error handling
                        $(".tblBotiquin-error").html("");
                        $("#tblBotiquin").append('<tbody class="editable_grid-error"><tr><th colspan="3">No se encontró información segun busqueda </th></tr></tbody>');
                        $("#tblBotiquin_processing").css("display","none");
                        $( ".tblBotiquin-error" ).remove();
                        }
                    }
                } );

        dataTable.ajax.reload()
    //}
}
//Fin de la funcion para generar el datatable de la tabla botiquin