import express, { Express, Request, Response } from 'express';
import { QueueFactory } from './pipeline/QueueFactory';
import { Pipeline } from './pipeline/Pipeline';
import { validateFirstNameLastNameFilter, validarCedula, validarDepto,printNeedsAssistance } from './filters/filters';
import { CustomData } from './data-structure/CustomData';
import { randomInt } from 'crypto';
require('dotenv').config();

//console.log("Voy a llamar al QueFactory")
// construye una funcion de creacion de colas dependiendo de un parm se crea una funcion u otra (bull o rabbit)
const queueFactory = QueueFactory.getQueueFactory<CustomData>; //ojo que no la invoca aca si no dentro de la Pipeline

// Crear una nueva instancia de Pipeline usando Bull como backend de la cola
//console.log("Voy a llamar al Pipeline")
const pipeline = new Pipeline<CustomData>([validateFirstNameLastNameFilter, validarCedula,validarDepto, printNeedsAssistance], queueFactory);
//console.log("Sali del pipeline")

//se crea el listener para cuando un job termina
pipeline.on('finalOutput', (output) => {
  console.log(`Salida final del PIPELINE: ${JSON.stringify(output)}`);
});

//se crea el listener para cuando un job da error
pipeline.on('errorInFilter', (error, data) => {
  console.error(`Error en el filtro: ${error}, Datos: ${JSON.stringify(data)}`);
});
const app: Express = express();
const port: number = 3000;

app.use(express.json());

app.post('/users', (req: Request, res: Response) => {
  console.log('Received data. Using body:', req.body);

  let dataToProcess: CustomData = req.body;
  if (tieneCamposVacios(dataToProcess))
    res.status(400).send({ message: 'Error por datos vacíos. Por favor, revise su input.' });
  else
  {
    pipeline.processInput(dataToProcess);
    res.status(200).send({ message: 'Agendado en el pipeline', data: req.body });
  }
});

function tieneCamposVacios(objeto: { [key: string]: any }): boolean {
  for (const clave in objeto) {
      if (objeto.hasOwnProperty(clave)) {
          if (objeto[clave] === "" || objeto[clave] === null) {
              return true; // Si se encuentra un campo vacío, retorna true
          }
      }
  }
  return false; // Si no se encontraron campos vacíos, retorna false
}


app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});