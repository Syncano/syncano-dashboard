import React from 'react';
import _ from 'lodash';
import { SelectField, TextField } from 'material-ui';
import SelectFieldWrapperItem from './SelectFieldWrapperItem';

const SelectFieldWrapper = ({ name, disabled, itemStyles = {}, options, type = 'list', ...other }) => {
  const renderSelectField = () => (
    <SelectField
      name={name}
      className={`${name}-dropdown`}
      fullWidth={true}
      floatingLabelText={_.capitalize(name)}
      {...other}
    >
      {_.map(options, (item) => SelectFieldWrapperItem(item, type, itemStyles))}
    </SelectField>
  );

  return disabled ? <TextField {...other} /> : renderSelectField();
};

export default SelectFieldWrapper;
