function soloLetras(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false
    for(var i in especiales){
         if(key == especiales[i]){
             tecla_especial = true;
             break;
         }
     }

     if(letras.indexOf(tecla)==-1 && !tecla_especial){
         return false;
     }
 }


 function soloNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras =  letras = "0123456789";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for(var i in especiales) {
        if(key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if(letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;

    }

   


      function validaVacio(valor) {
        valor = valor.replace("&nbsp;", "");
        valor = valor == undefined ? "" : valor;
        if (!valor || 0 === valor.trim().length) {
            return true;
            }
        else {
            return false;
            }
        }


      function validarfor(){
    
        var nombre_r = document.querySelector('#inputNombre_r').value; 
        var direccion_r = document.querySelector('#inputDireccion_r').value; 
        var telefono_r = document.querySelector('#inputTelefono_r').value;
        var ciudad_r = document.querySelector('#inputCiudad_r').value; 

        var dia = document.querySelector('#inputDia').value; 
        var hora = document.querySelector('#inputHora').value; 
        var ancho = document.querySelector('#inputAncho').value; 
        var alto = document.querySelector('#inputAlto').value; 
        var largo = document.querySelector('#inputLargo').value; 
        var peso = document.querySelector('#inputPeso').value; 

        var nombre_d = document.querySelector('#inputNombre_d').value; 
        var direccion_d = document.querySelector('#inputDireccion_d').value; 
        var telefono_d = document.querySelector('#inputTelefono_d').value;
        var ciudad_d = document.querySelector('#inputCiudad_d').value; 
        
        
    
        if (validaVacio(nombre_r)||validaVacio(telefono_r)||validaVacio(direccion_r)||validaVacio(ciudad_r)||validaVacio(dia)||validaVacio(hora)||validaVacio(ancho)||validaVacio(alto)||validaVacio(largo)||validaVacio(peso)||validaVacio(nombre_d)||validaVacio(telefono_d)||validaVacio(direccion_d)||validaVacio(ciudad_d)) {  //COMPRUEBA CAMPOS VACIOS
            alert("Los campos no pueden quedar vacios");
            return false;
        }
        return true;
        }