import React from 'react';
import _ from 'lodash';

import DataObjectsTableDateCell from './DataObjectsTableDateCell';
import DataObjectsTableFileCell from './DataObjectsTableFileCell';
import DataObjectsTableJSONCell from './DataObjectsTableJSONCell';
import DataObjectsTableReferenceCell from './DataObjectsTableReferenceCell';
import DataObjectsTableTextCell from './DataObjectsTableTextCell';

const DataObjectsTableCell = ({ item, columnId, users }) => {
  const renderContent = (content) => {
    const objectTypeRenderMethods = {
      datetime: <DataObjectsTableDateCell content={content} />,
      file: <DataObjectsTableFileCell content={content} />,
      reference: <DataObjectsTableReferenceCell content={content} />,
      relation: <DataObjectsTableReferenceCell content={content} />
    };

    if (_.includes(['created_at', 'updated_at'], columnId)) {
      return <DataObjectsTableDateCell content={{ value: content }} />;
    }

    if (_.isObject(content)) {
      if (content.type && _.keys(objectTypeRenderMethods).includes(content.type)) {
        return objectTypeRenderMethods[content.type];
      }

      return <DataObjectsTableJSONCell content={content} />;
    }

    if (_.isBoolean(content) || _.isNumber(content)) {
      return content !== null ? content.toString() : content;
    }

    if (columnId === 'username') {
      const user = _.find(users, ['id', item.owner]);

      return user ? user.username : 'No user';
    }

    return <DataObjectsTableTextCell content={content} />;
  };

  return (
    <div>
      {renderContent(item[columnId])}
    </div>
  );
};

export default DataObjectsTableCell;
