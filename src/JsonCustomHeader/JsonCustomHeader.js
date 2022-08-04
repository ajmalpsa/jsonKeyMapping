import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Popup from './Popup/Popup'
import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import DisplayTable from './DisplayTable'
import isFunction from 'lodash/isFunction'
import MapFieldsForm from './MapFieldsForm'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        // color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const JsonCustomHeader = forwardRef(({ onSubmit = null }, ref) => {

    const classes = useStyles()

    const [state, setState] = useState({
        isOpen: false,
        json: [],
        fieldCombo: [],
        replacedObjectArray: []
    })
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const tableRef = useRef(null);
    const mappedFieldRef = useRef(null);

    const formatMappingField = (excelData = [], comboValues = [], mappData = []) => { // to make initial header form data from json
        if (mappData.length) {// if passes already assigned fields and mapped data
            mappedFieldRef.current.setMappedValues(mappData)
        }
        else {
            let fieldsToMap = Object.keys(excelData[0]).map((header) => {
                return { field: header, mappedTo: '' }
            })
            mappedFieldRef.current.setMappedValues(fieldsToMap)
        }
        setState({ ...state, isOpen: true, fieldCombo: comboValues, json: excelData })
    }

    const handlePopuClose = () => {
        setState({
            ...state,
            isOpen: false,
            json: [],
            fieldCombo: []
        })
    }

    const convertJsonKeyToMapped = async (fromRef = false) => {
        setIsSubmitLoading(true)
        let replacements = {}
        let mappedFields = mappedFieldRef.current.getMappedValues()
        mappedFields.forEach((data) => { //covert mapped values array to object
            replacements = { ...replacements, [data.field]: data.mappedTo }
        })

        let convertedJson = state.json.map((tab) => {// replaces old key with user assigned new key
            let replacedObject = {}
            Object.keys(tab).forEach((key) => {
                const newKey = replacements[key] || key;
                replacedObject = { ...replacedObject, [newKey]: tab[key] }
            });
            return replacedObject
        })
        if (isFunction(onSubmit) && !fromRef) await onSubmit(convertedJson)
        setState({ ...state, isOpen: false, json: [], fieldCombo: [], replacedObjectArray: convertedJson })
        setIsSubmitLoading(false)
        return convertedJson
    }

    const handleSubmitClick = () => {
        convertJsonKeyToMapped()
    }
    const handlePreviewtClick = () => {
        let mappedFields = mappedFieldRef.current.getMappedValues()
        tableRef.current.openTableModal(state.json, mappedFields)
    }

    useImperativeHandle(
        ref,
        () => ({
            openModal(jsonData, mappingFieldCombo, mappData) {
                formatMappingField(jsonData, mappingFieldCombo, mappData)
            },
            getMappedFields() {
                let mappedFields = mappedFieldRef.current.getMappedValues()
                return mappedFields
            },
            getConvertedJson() {
                return convertJsonKeyToMapped()
            }
        })
    )

    return (
        <React.Fragment>
            <Popup
                open={state.isOpen}
                title="Map Fields"
                onClose={handlePopuClose}
                actions={<div style={{ margin: '0 30px 10px 0', display: 'flex' }}>
                    <div className={classes.wrapper} >
                        <Button color='primary' variant="contained" onClick={handlePreviewtClick} size='small' style={{ boxShadow: 'none', marginRight: "2px" }} >
                            Preview
                        </Button>
                    </div>
                    <div className={classes.wrapper} >
                        <Button color='primary' variant="contained"
                            disabled={isSubmitLoading}
                            onClick={handleSubmitClick} size='small' style={{ boxShadow: 'none' }} >
                            Submit
                        </Button>
                        {isSubmitLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </div>}
            >
                <MapFieldsForm ref={mappedFieldRef} comboValues={state.fieldCombo} />
            </Popup>
            <DisplayTable ref={tableRef} />
        </React.Fragment>
    )
})

export default JsonCustomHeader