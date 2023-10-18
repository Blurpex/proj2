import {useEffect, useState} from "react";
import {TextField, Button} from "@mui/material";
import MUIDataTable from "mui-datatables";

const App = () => {

    const url = "/employees";
    const [employees, setEmployees] = useState([])
    const [columns, setColumns] = useState([])

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        fetch(url + '?size=1000')
            .then(response => response.json())
            .then(data => {
                setEmployees(data._embedded['employees'])
                return data._embedded['employees']
            })
            .then(data => {
                let tempColumn = []
                Object.keys(data[0]).slice(0, -1).forEach(x => {
                    if(x === 'image') {
                        tempColumn.push({
                            'name': x,
                            options: {customBodyRender: (value) => <img src={`src/images/${value}`} width='100'/>}
                        })
                    } else tempColumn.push({"name": x,})
                })
                setColumns(tempColumn)
            }).catch(error => console.log(error))
    }, []);

    const deleteRows = (rowsDeleted, data, newTableData) => {
        Object.keys(rowsDeleted.lookup).forEach(x => {
            let id = employees[x].id
            fetch(url + "/" + id, {method:'DELETE'})
                .catch(error => console.log(error))
        })
    }

    const insertRow = () => {
        const body = JSON.stringify({
            "name": name,
            "description": description,
            "image": image.name
        })
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: body
        }).catch(error => console.log(error))

        const formData = new FormData();
        formData.append('image', image)
        fetch(url + '/upload', {body: formData, method: 'POST'})
            .catch(error => console.log(error))
    }

    const updateRow = () => {
        fetch(url + '/' + id)
            .then(response => response.json())
            .then(data => {
                return JSON.stringify({
                    id: id || data.id,
                    name: name || data.name,
                    description: description || data.description,
                    image: image.name || data.image
                })
            })
            .then(body => {
                fetch(url + '/' + id, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: body
                }).catch(error => console.log(error))
            }).catch(error => console.log(error))
    }

    const tableOptions = {
        rowsPerPage: 25,
        rowsPerPageOptions: [10, 25, 50, 100],
        jumpToPage: true,
        onRowsDelete: deleteRows,
    }

    return(
        <div>
            <div style={{textAlign: 'center', margin: 10}}>
                <TextField name='id' label='Id' value={id} size='small' onChange={(e) => setId(e.target.value)}/>
                <TextField name='name' label='Name' value={name} size='small' onChange={(e) => setName(e.target.value)}/>
                <TextField name='description' label='Description' value={description} size='small' onChange={(e) => setDescription(e.target.value)}/>
                <Button variant='outlined' component='label' value={image} onChange={(e) => setImage(e.target.files[0])}>
                    Upload Image
                    <input type="file" hidden/>
                </Button>
                <Button variant='contained' onClick={() => insertRow()}>Insert</Button>
                <Button variant='contained' onClick={() => updateRow()}>Update</Button>
            </div>
            <div style={{margin: 10}}>
                <MUIDataTable title='Employees' columns={columns} data={employees} options={tableOptions}/>
            </div>
        </div>
    );
}

export default App;
