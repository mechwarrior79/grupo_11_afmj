window.addEventListener('load', function(){
    //aca hay que capturar los elementos
   
    
    //input de email
    let email = this.document.querySelector('#email');
    //div de error email esperando hacer un innerHtml
    let emailError = this.document.querySelector('#emailError');
    //input de password
    let password = this.document.querySelector('#password');
    //div de error password esperando hacer un innerHtml
    let passwordError = this.document.querySelector('#passwordError');
      
    //boton de enviar
    let enviar = this.document.querySelector('#send');
    //formulario
    let form = this.document.querySelector('#form');
    
    console.log("Validaciones por el front-end")

            form.email.focus();
    
      
            enviar.addEventListener('click', (event)=>{ 
        
                let errores ={};
                
                // Evito que se envíe el formulario por hacer el click en 'Enviar'
                event.preventDefault();


                //Evalúo los campos según las condiciones requeridas y pongo mensajes de error o de éxito
    
                
    
                // Email
                if(email.value.length == 0){
                    errores.email = 'El email no debe estar vacio';
                    emailError.innerText = errores.email;
                    email.className = 'input form-control is-invalid'
                };

                if(email.value.length > 0) {

            
                    /* Guardo en la variable regex las condiciones a cumplir para que el formato del email sea válido  */
                    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    
                    /* Evalúo si el valor del email cargado tiene las condiciones cargadas en regex  */
    
                    const resultEmailEvaluation = regex.test(email.value);
    
                    console.log('El resultEmail es: ', resultEmailEvaluation); //Chequeo front-end
                    console.log(email.value); //Chequeo front-end
                    
                    if (resultEmailEvaluation == true ) {
                        email.className = 'input form-control is-valid' // No sé por qué no se pone el simbolo de la tilde
                        form.password.focus();
                        emailError.innerText = null;
                    };
                   
                    if (resultEmailEvaluation != true ) {
                        errores.email = 'Email no válido';
                        emailError.innerText = errores.email;
                        email.className = 'input form-control is-invalid';
                        form.email.focus();
                    };
                   

                };

                //password
               

                if(password.value.length > 0) {
                    password.className = 'input form-control is-valid'
                    passwordError.innerText = null;
                };

                if (password.value.length == 0) {
                    errores.password = 'La password no debe estar vacía';
                    passwordError.innerText = errores.password;
                    password.className = 'input form-control is-invalid'
                };
    
               
                // Si hay errores me los muestra, si no hay errores envía el formulario
    
                if (Object.keys (errores).length >= 1 ){ 
                    console.log(errores)
                    
                }  else {
                    form.submit();
                };
        
            });   
        
    });