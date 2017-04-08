import React from 'react';
import Radium from 'radium';
import { Link, withRouter } from 'react-router';

import { DialogsMixin } from '../../mixins';

import { ColumnList, Color, DataObjectsAmount } from '../../common';

const Column = ColumnList.Column;

const ClassesListItem = Radium(React.createClass({

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [DialogsMixin],

  getStyles() {
    return {
      checkIcon: {
        fileName: {
          width: '35vw'
        },
        fileDescription: {
          width: '35vw'
        }
      }
    };
  },

  render() {
    const { params } = this.context;
    const { item, router } = this.props;
    const metadata = item.metadata;
    const redirectPath = `/instances/${params.instanceName}/classes/${item.name}/objects/`;
    const redirectToDataObjects = () => router.push(redirectPath);
    const styles = this.getStyles();

    return (
      <ColumnList.Item
        key={item.name}
        id={item.name}
      >
        <Column.CheckIcon
          checkable={false}
          className="col-flex-3"
          customStyles={styles.checkIcon}
          id={item.name}
          iconClassName={metadata && metadata.icon ? metadata.icon : 'table-large'}
          background={Color.getColorByName(metadata && metadata.color ? metadata.color : 'blue')}
          keyName="name"
          handleIconClick={redirectToDataObjects}
          primaryText={item.name}
          secondaryText={item.description}
          handleClick={redirectToDataObjects}
        />
        <Column.Desc className="col-flex-1">
          <DataObjectsAmount
            data-e2e={`${item.name}-data-objects`}
            className={item.name}
            dataObjects={item.objects_count}
          />
        </Column.Desc>
        <Column.ID className="col-flex-1">
          <Link
            to={{
              name: 'users',
              params
            }}
          >
            {item.group}
          </Link>
        </Column.ID>
      </ColumnList.Item>
    );
  }
}));

export default withRouter(ClassesListItem);
