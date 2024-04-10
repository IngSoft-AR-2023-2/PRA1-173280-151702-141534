// src/sendData.ts
import axios from 'axios';
const faker = require('faker'); // o import faker from 'faker';


const sendData = async () => {
  const ciList = ["12345678", "02345678", "00342453", "56477765", "78754554", "43243243", "32423535", "32432444",
    "32432445", "32432446", "32432447", "32432448"];
  const dptoList = ["Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida", "Lavalleja",
    "Maldonado", "Montevideo", "Paysandú", "Río Negro", "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó",
    "Treinta y Tres"];

  // const userData = {
  //   name: faker.name.firstName(),
  //   surname: faker.name.lastName(),
  //   ci: ciList[ faker.number.int({min:0, max:ciList.length}) ],
  //   tel: faker.number.int({min:90000000, max:99999999}),
  //   dept: faker.datatype.boolean() 
  //       ? dptoList[ faker.number.int({min:0, max:dptoList.length}) ] 
  //       : faker.location.state(),
  //   needsAssistance: faker.datatype.boolean()
  // };

  const usersData = [
    {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      ci: ciList[2],
      tel: "098679922",
      dept: faker.datatype.boolean()
        ? dptoList[6]
        : "Algo",
      needsAssistance: faker.datatype.boolean()
    },
    {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      ci: ciList[6],
      tel: "095324832",
      dept: faker.datatype.boolean()
        ? dptoList[2]
        : "Algo",
      needsAssistance: faker.datatype.boolean()
    },
    {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      ci: ciList[4],
      tel: "091432235",
      dept: faker.datatype.boolean()
        ? dptoList[4]
        : "Algo",
      needsAssistance: faker.datatype.boolean()
    },
    {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      ci: ciList[1],
      tel: "097665534",
      dept: faker.datatype.boolean()
        ? dptoList[15]
        : "Algo",
      needsAssistance: faker.datatype.boolean()
    },
    {
      name: "Car@ct&r",
      surname: faker.name.lastName(),
      ci: ciList[1],
      tel: "097665534",
      dept: faker.datatype.boolean()
        ? dptoList[15]
        : "Algo",
      needsAssistance: faker.datatype.boolean()
    },
    {
      name: faker.name.firstName(),
      surname: "E#tr4ñ0",
      ci: ciList[1],
      tel: "097665534",
      dept: faker.datatype.boolean()
        ? dptoList[15]
        : "Algo",
      needsAssistance: faker.datatype.boolean()
    },
    {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      ci: ciList[11],
      tel: "091436742",
      dept: faker.datatype.boolean()
        ? dptoList[18]
        : "Algo",
      needsAssistance: faker.datatype.boolean()
    }
  ];

  try {
    for (let i = 0; i < usersData.length; i++) {
      const element = usersData[i];
      const response = await axios.post('http://localhost:3000/users', element);
      console.log('Data sent successfully:', response.data);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado
        // que cae fuera del rango de 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error('Error request:', error.request);
      } else {
        // Algo más causó el error
        console.error('Error message:', error.message);
      }
    } else {
      // Error no relacionado con Axios
      console.error('Error:', error);
    }
  }
};

sendData();
