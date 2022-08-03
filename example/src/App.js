import React, { useRef } from 'react'
import {JsonCustomHeader, MapFieldsForm} from 'jsonkeymapping'
// import { MapFieldsForm }  from 'jsonkeymapping/src/JsonCustomHeader'
import 'jsonkeymapping/dist/index.css'
import { excelData } from "./dummyDatas/excel"
import { comboValues } from "./dummyDatas/comboValues"

const App = () => {

  const mappData = [
    { field: 'id', mappedTo: 'eId' },
    { field: 'first_name', mappedTo: 'firstName' },
    { field: 'last_name', mappedTo: 'lastName' },
    { field: 'email', mappedTo: 'mailId' },
    { field: 'gender', mappedTo: 'sex' },
    { field: 'ip_address', mappedTo: 'address' }
  ]

  const jsonRef = useRef(null)
  const mappedFieldRef = useRef(null)

  const handleClick = () => {
    jsonRef.current.openModal(excelData, comboValues, mappData)
  }

  return <>
    <button onClick={handleClick}>Open</button>
    <JsonCustomHeader ref={jsonRef} />
    <MapFieldsForm ref={mappedFieldRef} comboValues={comboValues} fields={mappData} viewOnly={true} />
  </>
}

export default App
