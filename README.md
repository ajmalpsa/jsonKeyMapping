# jsonkeymapping

> to map new key to json

[![NPM](https://img.shields.io/npm/v/jsonkeymapping.svg)](https://www.npmjs.com/package/jsonkeymapping) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save jsonkeymapping
```

## Usage

```jsx
import JsonCustomHeader, { MapFieldsForm } from 'jsonkeymapping'
import 'jsonkeymapping/dist/index.css'

const App = () => {
  const jsonRef = useRef(null)
  const mappedFieldRef = useRef(null)

  const handleClick = () => {
    jsonRef.current.openModal(
      jsonData, //Array of objects -> mandatory
      comboValues, //combo values for mapping field -> Array -> Mandatory -> sample [{code: 'id', name: 'id'}]
      mappData, //for showing already added mapping form data
      )
  }

  return (
    <>
      <button onClick={handleClick}>Open</button>
      <JsonCustomHeader ref={jsonRef} />
      <MapFieldsForm
        ref={mappedFieldRef}
        comboValues={comboValues} //combo data for fields => sample [{code: 'id', name: 'id'}]
        fields={mappData} //for showing already added mapping form data
        viewOnly={true} //diable editing
      />
    </>
  )
}
```

## License

MIT © [ajmalpsa](https://github.com/ajmalpsa)
