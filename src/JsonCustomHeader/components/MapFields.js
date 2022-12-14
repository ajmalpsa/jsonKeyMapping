import React, { useEffect, useImperativeHandle, useState } from 'react'
import { Grid } from "@material-ui/core"
import FieldWithLabel from "../FieldWithLabel"

const MapFields = React.forwardRef(({ fields = [], comboValues = [] }, ref) => {

    const [mappedFields, setMappedFieds] = useState([])

    useEffect(() => {
        if (fields.length) {
            setMappedFieds(fields)
        }
    }, [fields])

    const handleChange = (index, value, key) => {
        let tempArray = [...mappedFields];
        tempArray[index] = { ...tempArray[index], mappedTo: value }
        setMappedFieds(tempArray)
    }

    useImperativeHandle(
        ref,
        () => ({
            setMappedValues(fields = []) {
                setMappedFieds(fields)
            },
            getMappedValues() {
                return mappedFields
            }
        })
    )

    return (
        <Grid container spacing={2}>
            {mappedFields.map((item, index) => {
                return <MappingForm key={index + 1} item={item} comboValues={comboValues}
                    handleChange={(value) => handleChange(index, value, item.field)} />
            })}
        </Grid>
    )
})

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