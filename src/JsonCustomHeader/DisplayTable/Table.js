import React from 'react'

const tableStyle = {
    "textAlign": "left",
    //   "fontFamily": "\"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\",\n    Roboto, \"Helvetica Neue\", Arial, sans-serif",
    "fontSize": "1rem",
    "fontWeight": "400",
    "lineHeight": "1.45",
    // "direction": "rtl",
    "wordWrap": "break-word",
    "WebkitBoxDirection": "normal",
    "color": "#404e67",
    "backgroundColor": "transparent",
    "border": "1px solid #e3ebf3",
    "width": "95%",
    "margin": "0 auto",
    "clear": "both",
    "borderCollapse": "separate",
    "boxSizing": "content-box",
    "borderSpacing": "0"
}

const trStyle = { boxSizing: "border-box" }

const thStyle = {
    "borderSpacing": "0",
    "textAlign": "inherit",
    "whiteSpace": "nowrap",
    "border": "1px solid #e3ebf3",
    "boxSizing": "content-box",
    "verticalAlign": "bottom",
    "borderTop": "1px solid #e3ebf3",
    "fontWeight": "bold",
    "padding": "10px 18px",
    "borderBottom": "transparent",
    "cursor": "pointer",
    "backgroundRepeat": "no-repeat",
    "backgroundPosition": "center right",
    "width": "194.113px"
}

const tdStyle = {
    "verticalAlign": "top",
    "border": "1px solid #e3ebf3",
    "borderBottom": "1px solid #e3ebf3",
    "boxSizing": "content-box",
    "padding": "8px 10px"
}

function Table({ header = [], data = [] }) {

    return (
        <React.Fragment>
            <table style={tableStyle} id="json-table-print" >
                <thead style={{ background: '#aad7f021', ...trStyle }}>
                    <tr>
                        {header.map((head, index) => {
                            return <th style={thStyle} key={index}>
                                {head.mappedTo}
                            </th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return <tr key={index}>
                            {header.map((head, index) => {
                                return <td style={tdStyle} key={index}>
                                    {item[head.field]}
                                </td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Table