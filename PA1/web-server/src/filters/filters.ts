import { CustomData } from '../data-structure/CustomData';
// FILTRO 1
//Se valida que los nombres y apellidos no tenga números ni caracteres que no sean letras​
export const validateFirstNameLastNameFilter = (input: CustomData): CustomData => {
    console.log(`Filtro validateFirstNameLastNameFilter,  input ${JSON.stringify(input)} }`);
    let regexOnlyLetters = /^[a-zA-Z]+$/;
    if (!regexOnlyLetters.test(input.name))
        throw new Error("Nombre contiene caracteres extraños");
    if (!regexOnlyLetters.test(input.surname))
        throw new Error("Apellido contiene caracteres extraños");
    return input;
};

//Filtro 2 
export const validarCedula = (input: CustomData): CustomData => {
    let ci: string = input.ci;
    if ((ci.length < 7 || ci.length > 8) || ci.charAt(0) === '0') {
        throw new Error("Cedula no cumple requisitos");
    }
    return input;
};

// FILTRO 4
export const printNeedsAssistance = (input: CustomData): CustomData => {
    if (input.needsAssistance)
        console.log(`La persona ${input.name} ${input.surname} necesita asistencia en movilidad`);
    else
        console.log(`La persona ${input.name} ${input.surname} será agendado en el proceso común`);
    return input;
};