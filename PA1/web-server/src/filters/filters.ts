import { CustomData } from '../data-structure/CustomData';


//Filtro 2 
export const validarCedula = (input: CustomData): CustomData => {
    let ci: string = input.ci;
    if ((ci.length < 7 || ci.length > 8) || ci.charAt(0) === '0') {
        throw new Error("Cedula no cumple requisitos");
    }
    return input

};