import React from 'react';
import _ from 'lodash';
import Moment from 'moment';

import { FontIcon } from 'material-ui';

const DataObjectsTableCell = ({ item, columnId, users }) => {
  const renderDate = (value) => {
    const date = Moment(value).format('DD/MM/YYYY');
    const time = Moment(value).format('LTS');
    const title = `${date} ${time}`;

    return (
      <div title={title}>
        {date}
      </div>
    );
  };

  const renderFile = (value) => {
    const handleFileClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.open(value.value, '_blank');
    };

    return (
      <div onClick={handleFileClick}>
        <FontIcon className="synicon-download" />
      </div>
    );
  };

  const renderReference = (value) => (
    <div>{`${value.target}: ${value.value}`}</div>
  );

  const objectTypeRenderMethods = {
    datetime: (value) => renderDate(value.value),
    file: (value) => renderFile(value),
    reference: (value) => renderReference(value),
    relation: (value) => renderReference(value)
  };

  const renderContent = (content) => {
    if (!content) {
      return null;
    }

    let renderedContent = content;

    if (_.isObject(content)) {
      if (content.type && _.keys(objectTypeRenderMethods).includes(content.type)) {
        renderedContent = objectTypeRenderMethods[content.type](content);
      } else {
        renderedContent = JSON.stringify(content);
      }
    }

    if (_.includes(['created_at', 'updated_at'], columnId)) {
      renderedContent = renderDate(content.value);
    }

    if (_.isBoolean(content) || _.isNumber(content)) {
      renderedContent = content !== null ? content.toString() : content;
    }

    if (columnId === 'username') {
      const user = _.find(users, ['id', item.owner]);

      renderedContent = user ? user.username : 'No user';
    }

    return renderedContent;
  };

  return (
    <div>
      {renderContent(item[columnId])}
    </div>
  );
};

export default DataObjectsTableCell;
