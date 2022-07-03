import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table'


function MTStudet() {
  const url = "https://michegwwe.herokuapp.com/students";
  const [data, setData] = useState([])
  useEffect(() => {
    getStudents()
  }, [])

  const getStudents = () => {
    fetch(url).then(resp => resp.json())
      .then(resp => setData(resp))
  }
  const columns = [
    {
      title: "Full_names", field: "Full_names",
      validate: (rowData) => rowData.Full_namesdate_of_birth === undefined || rowData.name === "" ? "Required" : true,
    },
    {
      title: "admision_number", field: "admision_numberadmision_number", validate: (rowData) =>
        rowData.admision_number === undefined || rowData.admision_number === "" ? "Required" : true,
    },
    {
      title: "date_of_birth", field: "date_of_birth", validate: (rowData) =>
        rowData.date_of_birth === undefined || rowData.date_of_birth === "" ? "Required" : true,
    },
    {
      title: "level", field: "level", validate: (rowData) =>
        rowData.level === undefined || rowData.level === "" ? "Required" : true,
    },

  ];
  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h4 align='center'>CRUD operation with Json-Server (with Validation) in Material Table</h4>
      <MaterialTable
        title="Student Details"
        columns={columns}
        data={data}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url, {
              method: "POST",
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify(newData)
            }).then(resp => resp.json())
              .then(resp => {
                getStudents()
                resolve()
              })
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url + "/" + oldData.id, {
              method: "PUT",
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify(newData)
            }).then(resp => resp.json())
              .then(resp => {
                getStudents()
                resolve()
              })
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url + "/" + oldData.id, {
              method: "DELETE",
              headers: {
                'Content-type': "application/json"
              },

            }).then(resp => resp.json())
              .then(resp => {
                getStudents()
                resolve()
              })
          })
        }}
      />
    </div>
  );
}

export default MTStudet;

