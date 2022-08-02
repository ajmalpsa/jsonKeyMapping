import React from 'react'
import { Grid } from "@material-ui/core"
import FieldWithLabel from "../FieldWithLabel"

function MapFields({  mappedFields, setMappedFields = () => { }, comboValues = [] }) {

    const handleChange = (index, value, key) => {
        let tempArray = [...mappedFields];
        tempArray[index] = { ...tempArray[index], mappedTo: value }
        setMappedFields(tempArray)
    }

    return (
        <Grid container spacing={2}>
            {mappedFields.map((item, index) => {
                return <MappingForm key={index + 1} item={item} comboValues={comboValues}
                    handleChange={(value) => handleChange(index, value, item.field)} />
            })}
        </Grid>
    )
}

const MappingForm = ({ handleChange = () => { }, item = {}, comboValues = [] }) => {
    return <Grid item xs={4}>
        <FieldWithLabel
            field={item.field}
            value={item.mappedTo}
            comboValues={comboValues}
            onChange={(value) => handleChange(value)} />
    </Grid>
}

export default MapFields