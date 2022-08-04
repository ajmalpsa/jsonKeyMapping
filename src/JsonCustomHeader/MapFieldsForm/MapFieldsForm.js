import React, { useEffect, useImperativeHandle, useState } from 'react'
import { Grid } from "@material-ui/core"
import FieldWithLabel from "../FieldWithLabel"

const MapFieldsForm = React.forwardRef(({ fields = [], comboValues = [], viewOnly = false }, ref) => {

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

    const getMappedValues = () => {
        return mappedFields.filter((field) => !!field.mappedTo)
    }


    useImperativeHandle(
        ref,
        () => ({
            setMappedValues(fields = []) {
                setMappedFieds(fields)
            },
            getMappedValues() {
                return getMappedValues()
            }
        })
    )

    return (
        <Grid container spacing={2}>
            {mappedFields.map((item, index) => {
                return <MappingForm key={index + 1} item={item} comboValues={comboValues} disabled={viewOnly}
                    handleChange={(value) => handleChange(index, value, item.field)} />
            })}
        </Grid>
    )
})

const MappingForm = ({ handleChange = () => { }, item = {}, comboValues = [], disabled }) => {
    return <Grid item xs={4}>
        <FieldWithLabel
            disabled={disabled}
            field={item.field}
            value={item.mappedTo}
            comboValues={comboValues}
            onChange={(value) => handleChange(value)} />
    </Grid>
}

export default MapFieldsForm