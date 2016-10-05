import React from 'react';
import { RaisedButton } from 'material-ui';
import { Socket } from '../../common/';

const styles = {
  container: {
    border: '1px dashed #dedede',
    borderRadius: 6,
    padding: 20,
    marginBottom: 20
  },
  iconColumn: {
    width: 54,
    paddingRight: 40
  },
  iconContainer: {
    width: 50,
    height: 44,
    padding: 0,
    top: 2
  },
  icon: {
    fontSize: 44,
    cursor: 'default'
  },
  title: {
    color: '#4a4a4a',
    fontSize: 18,
    fontWeight: 800,
    lineHeight: '25px',
    marginBottom: 4
  },
  description: {
    color: '#888',
    fontSize: 14,
    lineHeight: '19px'
  },
  documentationUrl: {
    fontSize: 14,
    lineHeight: '19px'
  }
};

export default ({ socketName, title, description, documentationUrl, handleCreate, label = 'Add' }) => (
  <div style={styles.container}>
    <div className="row align-middle">
      <div className="col-flex-0" style={{ width: 'auto' }}>
        <div style={styles.iconColumn}>
          {React.createElement(Socket[socketName], {
            tooltip: null,
            style: styles.iconContainer,
            iconStyle: styles.icon
          })}
        </div>
      </div>
      <div className="col-flex-1">
        <div style={styles.title}>
          {title}
        </div>
        <div style={styles.description}>
          {description}
        </div>
        <div style={styles.documentationUrl}>
          <a href={documentationUrl} target="_blank">{title} docs.</a>
        </div>
      </div>
      <div className="col-flex-0" style={{ width: 'auto' }}>
        <RaisedButton
          label={label}
          primary={true}
          style={{ marginRight: 0 }}
          onTouchTap={handleCreate}
        />
      </div>
    </div>
  </div>
);
