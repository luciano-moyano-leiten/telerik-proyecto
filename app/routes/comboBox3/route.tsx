// /C:/Users/Usuario/Desktop/proyecto-telerik/telerikProyecto/app/routes/comboBox/route.tsx

import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ComboBox, ComboBoxFilterChangeEvent } from '@progress/kendo-react-dropdowns';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { FilterDescriptor, filterBy } from '@progress/kendo-data-query';
import { useState } from "react";

//se crea un loader para cargar los nombres en un arreglo
export const loader: LoaderFunction = async () => {
    const names = [
        {
          "address": {
            "geolocation": {
              "lat": "-37.3159",
              "long": "81.1496"
            },
            "city": "kilcoole",
            "street": "new road",
            "number": 7682,
            "zipcode": "12926-3874"
          },
          "id": 1,
          "email": "john@gmail.com",
          "username": "johnd",
          "password": "m38rmF$",
          "name": {
            "firstname": "john",
            "lastname": "doe"
          },
          "phone": "1-570-236-7033",
          "__v": 0
        },
        {
          "address": {
            "geolocation": {
              "lat": "-37.3159",
              "long": "81.1496"
            },
            "city": "kilcoole",
            "street": "Lovers Ln",
            "number": 7267,
            "zipcode": "12926-3874"
          },
          "id": 2,
          "email": "morrison@gmail.com",
          "username": "mor_2314",
          "password": "83r5^_",
          "name": {
            "firstname": "david",
            "lastname": "morrison"
          },
          "phone": "1-570-236-7033",
          "__v": 0
        },
        {
          "address": {
            "geolocation": {
              "lat": "40.3467",
              "long": "-30.1310"
            },
            "city": "Cullman",
            "street": "Frances Ct",
            "number": 86,
            "zipcode": "29567-1452"
          },
          "id": 3,
          "email": "kevin@gmail.com",
          "username": "kevinryan",
          "password": "kev02937@",
          "name": {
            "firstname": "kevin",
            "lastname": "ryan"
          },
          "phone": "1-567-094-1345",
          "__v": 0
        },
      ]
    return { names };
};



//se crea una funcion que retorna un componente ComboBox (lo que ve el usuario)
export default function ComboBoxPage() {

    const { names } = useLoaderData<{ names: { name: {id:number; firstname: string; lastname: string } }[] }>();

    const [value, setValue] = useState('');

    const handleChange = (event: any) => {
        const name = event.target.value;
        setValue(name);
    }


    //se crea un estado para almacenar los nombres y otro para almacenar los nombres filtrados
    const [data, setData] = useState(names);

    const filterData = (filter: FilterDescriptor) => {
        const filterValue = filter.value.slice();
        const data = names.filter(item => item.name.toLowerCase().includes(filterValue));
        return filterBy(data, filter);
    };

    //se crea una funcion que se encarga de filtrar los nombres
    const handleFilterChange = (event: ComboBoxFilterChangeEvent) => {
        setData(filterData(event.filter));
    };

    
    
    //se retorna el componente ComboBox con los nombres y el filtro
    
  const CustomCell = (props: { dataItem: {
      phone: any;
      password: any;
      username: any; 
      id: any; 
      email: any; 
}; }) => {
      return (
          <td>
              <button onClick={() => alert(`Edit :
                ${props.dataItem.id}
                ${props.dataItem.email}
                ${props.dataItem.username}
                ${props.dataItem.password}
                ${props.dataItem.phone}`)}>Editar</button>
              <button onClick={() => alert(`Delete: 
                ${props.dataItem.id}
                ${props.dataItem.email}
                ${props.dataItem.username}
                ${props.dataItem.password}
                ${props.dataItem.phone}`)}>Borrar</button>
          </td>
      );
  };

  return (
      <div>
          
          <Grid
              data={data}
              style={{ height: '300px' }}
          >
              <GridColumn field="id" title="ID" width="50px" />
              <GridColumn field="email" title="Email" />
              <GridColumn field="username" title="Username" />
              <GridColumn field="password" title="Password" />
              <GridColumn field="phone" title="Phone" />
              <GridColumn field="custom" title="Actions" cell={CustomCell} />
          </Grid>
      </div>
  );
    
}

//filtro de busqueda
//https://www.telerik.com/kendo-react-ui/components/dropdowns/combobox/filtering

