import React from 'react'
import ComboBox from '../ComboBox'
import "./style.css"

function FieldWithLabel({ field = "", comboValues = [], onChange = () => { }, value = '' }) {

    return (
        <div className="row" style={{ margin: "10px" }}>
            <div className={"input-group prefix"} style={{
                "position": "relative",
                "display": "table",
                "borderCollapse": "separate",
                "width": "100%",
               
                "borderRight": "0"
            }}>
                <span className="input-group-addon" style={{
                    "padding": "0",
                    "fontSize": "0.85rem",
                    "borderRadius": "4px 0px 0px 4px",
                    "fontWeight": "400",
                    "lineHeight": "1",
                    "color": "#616161",
                    "textAlign": "center",
                    "backgroundColor": "rgb(246, 246, 246)",
                    "border": "1px solid #ccc",
                    "width": "30%",
                    "whiteSpace": "nowrap",
                    "verticalAlign": "middle",
                    "display": "table-cell"
                }}>
                    {field}
                </span>
                <span style={{ width: '70%' }}>
                    <ComboBox
                        mappingkey={{ label: 'name', value: 'code' }}
                        name="Map To"
                        value={value}
                        optionsdata={comboValues}
                        onChange={(_, value) => onChange(value?.value ?? '')}
                    />
                </span>
            </div>
        </div >
    )
}

export default FieldWithLabel