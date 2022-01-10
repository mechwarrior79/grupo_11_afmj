window.addEventListener('load', function(){
//aca hay que capturar los elelmentos
//let elemento = this.document.querySelector('#elIdDelElemento');
//let name = document.querySelector('#titulo');
//name.style.backgroundColor = 'red'

let name = this.document.querySelector('#name');
let nameError = this.document.querySelector('#nameError')
let enviar = this.document.querySelector('#send');
let form = this.document.querySelector('#form');
let mainDescription = this.document.querySelector('#mainDescription');
let mainError = this.document.querySelector('#mainError');
let secondaryDescription = this.document.querySelector('#secondaryDescription');
let secondaryError = this.document.querySelector('#secondaryError');
let price = this.document.querySelector('#price');
let priceError = this.document.querySelector('#priceError');
let discount = this.document.querySelector('#discount');
let discountError = this.document.querySelector('#discountError');


console.log("entro por el front")

  
        enviar.addEventListener('click', (event)=>{ 
    
            let errores ={};
            

            event.preventDefault();

             if(name.value.length < 5) {
                errores.name = 'El nombre debe contener al menos 5 caracteres';
                nameError.innerText = errores.name;
                name.className = 'input form-control is-invalid'
            }

            if(name.value.length == 0){
                errores.name = 'El nombre no debe estar vacio';
                nameError.innerText = errores.name;
                name.className = 'input form-control is-invalid'
            }

            if(name.value.length >= 5) {
                name.className = 'input form-control is-valid'
                form.mainDescription.focus();
                nameError.innerText = null;
            }
             
            if(mainDescription.value.length < 20) {
                errores.main = 'La descripcion principal debe contener al menos 20 caracteres';
                mainError.innerText = errores.main;
                mainDescription.className = 'input form-control is-invalid'
            };

            if(secondaryDescription.value.length < 20) {
                errores.secondary = 'La descripcion secundaria debe contener al menos 20 caracteres';
                secondaryError.innerText = errores.secondary;
                secondaryDescription.className = 'input form-control is-invalid'
            };

            if(price.value.length <1 ){
                errores.price = 'El precio debe tener al menos 2 numeros!';
                priceError.innerHTML = errores.price;
                price.className = 'input form-control is-invalid'
            };

            if(discount.value.length <1 ){
                errores.discount = 'Debe completar este campo obligatoriamente para el registro!';
                discountError.innerHTML = errores.discount;
                discount.className = 'input form-control is-invalid'
            };

            if (Object.keys (errores).length >= 1 ){ 
                console.log(errores)
            }  else {
                form.submit();
            }
    
        })
        
    
})