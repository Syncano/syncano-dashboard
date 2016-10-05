import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import { FormMixin } from '../../mixins';
import Store from './TemplateDialogStore';
import { TextField } from 'material-ui';
import Constants from '../../constants/Constants';
import { AutoCompleteWrapper } from '../../common';

export default React.createClass({
  displayName: 'TemplateDialogContent',

  mixins: [
    Reflux.connect(Store),
    FormMixin
  ],

  getErrors(key) {
    const { errors } = this.props;

    return _.get(errors, key) || [];
  },

  render() {
    const {
      handleNameTextFieldChange,
      hasEditMode,
      contentType,
      name,
      handleChangeAutoComplete
    } = this.props;
    const contentTypes = Constants.SNIPPET_TEMPLATE_DATA_SOURCE_TYPES;
    const selectedContentTypes = _.map(contentTypes, (item) => ({ name: item }));

    return (
      <div data-e2e="template-dialog-content">
        <TextField
          data-e2e="template-name"
          ref="name"
          name="name"
          autoFocus={true}
          fullWidth={true}
          disabled={hasEditMode}
          value={name}
          onChange={handleNameTextFieldChange}
          errorText={this.getErrors('name').join(' ')}
          hintText="Name of the Template"
          floatingLabelText="Name"
        />
        <AutoCompleteWrapper
          name="contentType"
          data-e2e="template-content-type"
          hintText="Start typing to narrow down content types or type a new one"
          searchText={contentType}
          onUpdateInput={handleChangeAutoComplete}
          onNewRequest={handleChangeAutoComplete}
          errorText={this.getErrors('content_type').join('')}
          items={{ userData: selectedContentTypes }}
          showDividers={false}
        />
      </div>
    );
  }
});
