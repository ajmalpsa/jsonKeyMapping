import React, { useRef } from 'react'

import JsonCustomHeader from 'jsonkeymapping'
import 'jsonkeymapping/dist/index.css'
import { excelData } from "./dummyDatas/excel"
import { comboValues } from "./dummyDatas/comboValues"

const App = () => {

  const jsonRef = useRef(null)

  const handleClick = () => {
    jsonRef.current.openModal(excelData, comboValues)
    console.log("...................");
  }

  return <>
    <button onClick={handleClick}>Open</button>
    <JsonCustomHeader ref={jsonRef} />
  </>
}

export default App
