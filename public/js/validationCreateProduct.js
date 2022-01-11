window.addEventListener('load', function(){
//aca hay que capturar los elelmentos
//let elemento = this.document.querySelector('#elIdDelElemento');
//let name = document.querySelector('#titulo');
//name.style.backgroundColor = 'red'

//input de nombre producto
let name = this.document.querySelector('#name');
//div de error nombre esperando hacer un innerHtml
let nameError = this.document.querySelector('#nameError')
//input de mainDescription
let mainDescription = this.document.querySelector('#mainDescription');

let mainError = this.document.querySelector('#mainError');
//textarea de descripcion secundaria
let secondaryDescription = this.document.querySelector('#secondaryDescription');
//div de error descripcion secundaria esperando un innerHtml
let secondaryError = this.document.querySelector('#secondaryError');

let price = this.document.querySelector('#price');
let priceError = this.document.querySelector('#priceError');

//input de discount
let discount = this.document.querySelector('#discount');
//div de error discount esperando un innerHtml
let discountError = this.document.querySelector('#discountError');


let fileError = this.document.querySelector('#fileError')




//boton de enviar
let enviar = this.document.querySelector('#send');
//formulario
let form = this.document.querySelector('#form');
//textarea de descripcion principal


console.log("entro por el front")

  
        enviar.addEventListener('click', (event)=>{ 
    
            let errores ={};
            

            event.preventDefault();

             if(name.value.length < 5) {
                 //meto name en errores
                errores.name = 'El nombre debe contener al menos 5 caracteres';
                nameError.innerText = errores.name;
                name.className = 'input form-control is-invalid'
            };

            if(name.value.length == 0){
                errores.name = 'El nombre no debe estar vacio';
                nameError.innerText = errores.name;
                name.className = 'input form-control is-invalid'
            };

            if(name.value.length >= 5) {
                name.className = 'input form-control is-valid'
                form.mainDescription.focus();
                nameError.innerText = null;
            }
             
            if(mainDescription.value.length < 20) {
                errores.main= 'La descripcion principal debe contener al menos 20 caracteres';
                mainError.innerText = errores.main;
                mainDescription.className = 'input form-control is-invalid'
            };
            if(mainDescription.value.length == 0){
                errores.main = 'La descripcion principal no debe estar vacia';
                mainError.innerText = errores.main;
                mainDescription.className = 'input form-control is-invalid'
            }

            if(mainDescription.value.length >= 20) {
                mainDescription.className = 'input form-control is-valid'
                form.secondaryDescription.focus();
                mainError.innerText = null;
            }
            

            if(secondaryDescription.value.length < 20) {
                errores.secondary = 'La descripcion secundaria debe contener al menos 20 caracteres';
                secondaryError.innerText = errores.secondary;
                secondaryDescription.className = 'input form-control is-invalid'
            };

            if(secondaryDescription.value.length == 0){
                errores.secondary = 'La descripcion secundaria no debe estar vacia';
                secondaryError.innerText = errores.secondary;
                secondaryDescription.className = 'input form-control is-invalid'
            }

            if(secondaryDescription.value.length >= 20) {
                secondaryDescription.className = 'input form-control is-valid'
                form.price.focus();
                secondaryError.innerText = null;
            };
            
            if(price.value.length == 0){
                errores.price = 'El precio no debe estar vacio';
                priceError.innerText = errores.price;
                price.className = 'input form-control is-invalid'
            }
            
           
            if(price.value.length > 0) {
                price.className = 'input form-control is-valid'
                form.discount.focus();
                priceError.innerText = null;
            }

            if(discount.value.length == 0){
                errores.discount= 'El descuento no debe estar vacio';
                discountError.innerText = errores.discount;
                discount.className = 'input form-control is-invalid'
            };

            if(discount.value.length >= 1) {
                discount.className = 'input form-control is-valid'
                discountError.innerText = null;

            };

            function validar() {
                // Obtener nombre de archivo
                let archivo = document.getElementById('archivo').value,
                // Obtener extensión del archivo
                    extension = archivo.substring(archivo.lastIndexOf('.'),archivo.length);   
                // Si la extensión obtenida no está incluida en la lista de valores
                // del atributo "accept", mostrar un error.
                if(document.getElementById('archivo').getAttribute('accept').split(',').indexOf(extension) < 0) {
                    errores.file = ('El archivo debe ser de extension .JPG,.JPEG,.PNG, GIF')
                    fileError.innerHTML= (errores.file)
                } else {
                    fileError.innerText = null;

                }
              }
              validar();

           
            

            if (Object.keys (errores).length >= 1 ){ 
                console.log(errores)
                
            }  else {
                form.submit();
            };
    
        })
        
    
})