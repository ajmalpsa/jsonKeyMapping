import { Button } from '@material-ui/core'
import _ from 'lodash'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Popup from '../Popup/Popup'
import Table from './Table'

const DisplayTable = forwardRef((props, ref) => {

    const [state, setState] = useState({
        jsonData: [], header: [], isOpen: false
    })

    const handlePopupClose = () => {
        setState({ jsonData: [], header: [], isOpen: false })
    }

    useImperativeHandle(
        ref,
        () => ({
            openTableModal(jsonData = [], header = []) {
                setState({ jsonData, header, isOpen: true })
            }
        })
    )

    const printDoc = () => {
        let iframe = document.getElementById("json-table-print").outerHTML;
        let w = window.open();
        w.document.write(iframe);
        w.print();
        w.close();
    };

    return (
        <Popup
            open={state.isOpen}
            title="Preview Data"
            onClose={handlePopupClose}
            actions={<div style={{ margin: '0 30px 10px 0' }}>
                <Button variant="contained" size='small' onClick={printDoc} style={{ boxShadow: 'none', marginRight: 5 }} >
                    Print
                </Button>
                <Button variant="contained" size='small' style={{ boxShadow: 'none' }} >
                    Submit
                </Button>
            </div>}
        >
            <Table header={state.header} data={state.jsonData} />
        </Popup>
    )
})

export default DisplayTable