import express, { Express, Request, Response } from 'express';
import { QueueFactory } from './pipeline/QueueFactory';
import { Pipeline } from './pipeline/Pipeline';
import { validateFirstNameLastNameFilter, validarCedula, validarDepto,printNeedsAssistance } from './filters/filters';
import { CustomData } from './data-structure/CustomData';
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
  //data must be a string
  let dataToProcess: CustomData = req.body;
  pipeline.processInput(dataToProcess);

  res.status(200).send({ message: 'Agendado en el pipeline', data: req.body });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});