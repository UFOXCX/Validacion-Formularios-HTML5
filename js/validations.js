export const validate = (input) => {

    const inputType = input.dataset.type;

    if(validators[inputType]){
        validators[inputType](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = "";
    }else{ 
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = showErrorMessage(inputType, input);
        
        }


};

const errorTypes = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError', 
];

const errorMessages = {

    name: {

        valueMissing: 'El campo nombre no puede estrar vacio',
    },
    email: {

        valueMissing: 'El campo email no puede estar vacio',
        typeMismatch: 'El email no es valido',

    },
    password: {
        valueMissing: 'El campo contraseña no puede estar vacio',
        patternMismatch: "al menos 6 caracteres, maximo 12,debe contener una letra minuscula, una letra mayuscula, un numero y no puede tener caracteres especiales",
    },
    birthDate: {   
        valueMissing: 'Este campo fecha de nacimiento no puede estrar vacio',
        customError:  'debes tener al menos 18 años de edad',
    },
    number: { 
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El formato requerido es xxxxxxxxxx 10 numeros',
    },
    address: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La ciudad debe contener entre 10 y 40 caracteres',
    },
    city: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'el estado debe contener entre 10 y 40 caracteres',
    },
    state: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La direccion debe contener entre 10 y 40 caracteres',
    },
};

const validators = {
    birthDate : input => birthValidation(input),

};

const showErrorMessage = (inputType, input) => {  
    let message = '';
    errorTypes.forEach((error) => {
        if(input.validity[error]){
            console.log(inputType ,error);
            console.log(input.validity[error]);
            console.log(errorMessages[inputType][error]);
            message = errorMessages[inputType][error];
        }   
    });
    return message;
}



const birthValidation = (input) => {
    const clientDate = new Date(input.value);
    let message = '';
    if(!adultDate(clientDate)){
        message ='debes tener al menos 18 años de edad';
    }

    input.setCustomValidity(message);

}

const adultDate = (date) => {
    const actualDate = new Date();
    const residueDate = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate());
    return residueDate <= actualDate;
}