import React from 'react';

const ListContainer = ({ children, style, className, ...other }) => (
  <div
    data-e2e={other['data-e2e']}
    className={className}
    style={{ ...{ marginBottom: 24 }, ...style }}
  >
    {children}
  </div>
);

ListContainer.propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string
};

export default ListContainer;
