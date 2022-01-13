window.addEventListener('load', function(){
    //aca hay que capturar los elementos
   
    
    //input de name 
    let name = this.document.querySelector('#name');
    //div de error name esperando hacer un innerHtml
    let nameError = this.document.querySelector('#nameError');

    //input de surname 
    let surname = this.document.querySelector('#surname');
    //div de error surname esperando hacer un innerHtml
    let surnameError = this.document.querySelector('#surnameError');

    //input de sexId 
    let sexId = this.document.querySelector('#sexId');
    //div de error sexId esperando hacer un innerHtml
    let sexIdError = this.document.querySelector('#sexIdError');

    //input de birthDate 
    let birthDate = this.document.querySelector('#birthDate');
    //div de error birthDate esperando hacer un innerHtml
    let birthDateError = this.document.querySelector('#birthDateError');
    
    //input de email 
    let email = this.document.querySelector('#email');
    //div de error email esperando hacer un innerHtml
    let emailError = this.document.querySelector('#emailError');

     //input de RoleId 
     let RoleId = this.document.querySelector('#RoleId');
     //div de error RoleId esperando hacer un innerHtml
     let RoleIdError = this.document.querySelector('#RoleIdError');

     //input de password 
     let password = this.document.querySelector('#password');
     //div de error password esperando hacer un innerHtml
     let passwordError = this.document.querySelector('#passwordError');

     //input de repeatPassword 
     let repeatPassword = this.document.querySelector('#repeatPassword');
     //div de error repeatPassword esperando hacer un innerHtml
     let repeatPasswordError = this.document.querySelector('#repeatPasswordError');

    //div de error fileError 
    let fileError = this.document.querySelector('#fileError')
      
    //boton de enviar
    let enviar = this.document.querySelector('#send');
    //formulario
    let form = this.document.querySelector('#form');
    
    console.log("Validaciones por el front-end")
    
      
            enviar.addEventListener('click', (event)=>{ 
        
                let errores ={};
                
                // Evito que se envíe el formulario por hacer el click en 'Enviar'
                event.preventDefault();

                //Evalúo los campos según las condiciones requeridas y pongo mensajes de error o de éxito
    
                // name
                // if (name.value.length == 0){
                //     errores.name = 'El nombre no debe estar vacio';
                //     nameError.innerText = errores.name;
                //     name.className = 'input form-control is-invalid'
                // };

                if (name.value.length < 2) {
                    errores.name = 'El nombre debe contener al menos 2 caracteres';
                    nameError.innerText = errores.name;
                    name.className = 'input form-control is-invalid'
                };

                if(name.value.length >= 2) {
                    name.className = 'input form-control is-valid'
                    form.surname.focus();
                    nameError.innerText = null;
                };

                // surname
                // if (surname.value.length == 0){
                //     errores.surname = 'El apellido no debe estar vacio';
                //     surnameError.innerText = errores.surname;
                //     surname.className = 'input form-control is-invalid'
                // };

                if (surname.value.length < 2)  {
                    errores.surname = 'El apellido debe contener al menos 2 caracteres';
                    surnameError.innerText = errores.surname;
                    surname.className = 'input form-control is-invalid'
                };

                if(surname.value.length >= 2) {
                    surname.className = 'input form-control is-valid'
                    form.email.focus();
                    surnameError.innerText = null;
                };

                //email
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
                        email.className = 'input form-control is-valid'; // No sé por qué no se pone el simbolo de la tilde
                        form.password.focus();
                        emailError.innerText = null;
                    };
                   
                    if (resultEmailEvaluation != true ) {
                        errores.email = 'Email no válido';
                        emailError.innerText = errores.email;
                        email.className = 'input form-control is-invalid';
                        
                    };
                    

                };



                if (password.value.length < 8) {
                    errores.password = 'La contraseña debe contener al menos 8 caracteres';
                    passwordError.innerText = errores.password;
                    password.className = 'input form-control is-invalid'
                };

                if(password.value.length >= 8) {

                    /* Guardo en la variable regex las condiciones a cumplir para que el formato de la contraseña sea válida  */
                    const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);
    
                    /* Evalúo si el valor de la contraseña cargada tiene las condiciones cargadas en regex  */
    
                    const resultPasswordEvaluation = regex.test(password.value);
    
                    console.log('El resultRepeatPassword es: ', resultPasswordEvaluation); //Chequeo front-end
                    console.log(password.value); //Chequeo front-end
                    
                   
                    if (resultPasswordEvaluation != true ) {
                        errores.password = 'Password no válida';
                        passwordError.innerText = errores.password;
                        password.className = 'input form-control is-invalid';
                        
                    };
                    if (resultPasswordEvaluation == true ) {
                        password.className = 'input form-control is-valid'; // No sé por qué no se pone el simbolo de la tilde
                        form.repeatPassword.focus();
                        passwordError.innerText = null;
                    };

                };

                // repeatPassword
                // if (repeatPassword.value.length == 0){
                //     errores.repeatPassword = 'Repetir contraseña no debe estar vacía';
                //     repeatPasswordError.innerText = errores.repeatPassword;
                //     repeatPassword.className = 'input form-control is-invalid'
                // };

                if (repeatPassword.value.length < 8) {
                    errores.repeatPassword = 'Repetir contraseña debe contener al menos 8 caracteres';
                    repeatPasswordError.innerText = errores.repeatPassword;
                    repeatPassword.className = 'input form-control is-invalid'
                };

                if(repeatPassword.value.length >= 8) {

                    /* Guardo en la variable regex las condiciones a cumplir para que el formato de la contraseña sea válida  */
                    const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);
    
                    /* Evalúo si el valor del email cargado tiene las condiciones cargadas en regex  */
    
                    const resultRepeatPasswordEvaluation = regex.test(repeatPassword.value);
    
                    console.log('El resultPassword es: ', resultRepeatPasswordEvaluation); //Chequeo front-end
                    console.log(repeatPassword.value); //Chequeo front-end
                    
                   
                    if (resultRepeatPasswordEvaluation != true ) {
                        errores.repeatPassword = 'Password no válida';
                        repeatPasswordError.innerText = errores.repeatPassword;
                        repeatPassword.className = 'input form-control is-invalid';
                        
                    };
                    if (resultRepeatPasswordEvaluation == true ) {
                        repeatPassword.className = 'input form-control is-valid'; // No sé por qué no se pone el simbolo de la tilde
                        repeatPasswordError.innerText = null;
                    };
                    
                };


                // Con esto valido la extensión del archivo de imagen
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
    
                    };
                  };
                validar();
        



               
                // Si hay errores me los muestra, si no hay errores envía el formulario
    
                if (Object.keys (errores).length >= 1 ){ 
                    console.log(errores)
                    
                }  else {
                    form.submit();
                };
        
            });   
        
    });