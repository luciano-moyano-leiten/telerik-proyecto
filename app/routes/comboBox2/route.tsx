// /C:/Users/Usuario/Desktop/proyecto-telerik/telerikProyecto/app/routes/comboBox/route.tsx

import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ComboBox, ComboBoxFilterChangeEvent } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { FilterDescriptor, filterBy } from '@progress/kendo-data-query';
import { useState } from "react";

//se crea un loader para cargar los nombres en un arreglo
export const loader: LoaderFunction = async () => {
    const names = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Doe' },
        { id: 4, name: 'Pepe' },
        { id: 5, name: 'Ruffo' },

    ];
    return { names };
};

//se crea una funcion que retorna un componente ComboBox (lo que ve el usuario)
export default function ComboBoxPage() {

    const { names } = useLoaderData<{ names: { id: number, name: string }[] }>();

    const [objectSelected, setObjectSelected] = useState('');

    const handleChange = (event: any) => {
        const objectSelected = event.target.value;
        //Aca me esta trayendo los objetos console.log(objectSelected);
        setObjectSelected(objectSelected);
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

    //se crea un estado para mostrar el dialogo
    const [visible, setVisible] = useState(false);

    
    const toggleDialog = () => {
        setVisible(!visible);
    };

    //se retorna el componente ComboBox con los nombres y el filtro

    return (
        <div>
            <h1>Seleccione un nombre de la lista: </h1>
            {/* <ul>
                {names.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul> */}
            <ComboBox data={data} filterable={true}
                id="sport" textField="name" allowCustom={true} onChange={handleChange} onFilterChange={handleFilterChange} placeholder="Please select ..." />
           
            <Button type="button" onClick={toggleDialog} id="open-dialog">
                Open Dialog
            </Button>
           
            {visible && (
                <Dialog title={'Please confirm'} onClose={toggleDialog}>
                    <p style={{
                        margin: '25px',
                        textAlign: 'center'
                    }}>Are you sure you want to continue with {objectSelected.name}?</p>
                    <DialogActionsBar>
                        <Button type="button" onClick={toggleDialog}>
                            No
                        </Button>
                        <Button type="button" onClick={toggleDialog}>
                            Yes
                        </Button>
                    </DialogActionsBar>
                </Dialog>
            )}
        </div>
    );
}

//filtro de busqueda
//https://www.telerik.com/kendo-react-ui/components/dropdowns/combobox/filtering

