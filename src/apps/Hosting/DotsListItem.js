import React from 'react';

import { colors as Colors } from 'material-ui/styles';
import { ColumnList } from '../../common/';

const Column = ColumnList.Column;

const DotsListItem = ({ onDotsClick }) => {
  const styles = {
    color: Colors.blue500,
    cursor: 'pointer',
    paddingLeft: 16,
    marginBottom: 10,
    fontSize: 34
  };

  const handleDotsClick = () => {
    onDotsClick && onDotsClick();
  };

  return (
    <ColumnList.Item key="hosting-files-dots-list-item">
      <Column.Desc
        className="col-flex-1"
        data-e2e="hosting-files-dots-list-item"
      >
        <div
          onClick={handleDotsClick}
          style={styles}
        >
          ...
        </div>
      </Column.Desc>
    </ColumnList.Item>
  );
};

export default DotsListItem;
