import React, { memo, useState } from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, withStyles } from '@material-ui/core';

const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: '0px 4px 4px 0px',
        border: '1px solid #ccc',
        fontSize: '0.85rem'
      },
    },
  },
})(TextField);

const ComboBox = (props) => {
  const { name = "Combo box", mappingkey = {}, optionsdata = [], onChange = () => { }, value = '' } = props;
  let newProps = { ...props };
  delete newProps.value;
  delete newProps.inputValue;
  const data = getComboData(mappingkey, optionsdata)

  let opData = (data && data.length) ? data : [];
  // eslint-disable-next-line
  let [selectedVal] = opData.filter(option => option.value == value);
  selectedVal = selectedVal ? selectedVal : '';
  let val = typeof selectedVal === 'object' ? selectedVal.label : '';
  const [inputValue, setInputValue] = useState(val);

  return (
    <React.Fragment>
      <Autocomplete
        options={opData}
        value={selectedVal}
        fullWidth
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={onChange}
        getOptionLabel={(option) => {
          return option.label ? option.label : "";
        }}
        renderInput={(params) => <StyledTextField {...params} label={name} variant="outlined" />}
        size="small"
      />
    </React.Fragment>
  );
};

function getComboData(mappingKey, optionsdata) {

  return transform(optionsdata, mappingKey);

}

function transform(data, mappingKey) {
  let options = [];
  data.forEach((row) => {
    options.push({ label: row[mappingKey['label']], value: row[mappingKey['value']] })
  });
  return options;
}



export default memo(ComboBox);
