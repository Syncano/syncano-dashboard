import React from 'react';

import { Link } from 'react-router';
import { Card, CardTitle, CardText, RaisedButton } from 'material-ui';

const DialogSummaryRedirect = ({ linkTo, title, text, buttonLabel }) => {
  const styles = {
    card: {
      marginBottom: 28
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    containerText: {
      flex: 1
    },
    containerButton: {
      paddingLeft: 20
    },
    link: {
      fontSize: 16
    }
  };

  const button = (
    <RaisedButton
      primary={true}
      label={buttonLabel}
    />
  );

  const dashboardLink = (
    <Link to={linkTo}>
      {button}
    </Link>
  );

  const externalLink = (
    <a
      href={linkTo.pathname}
      target="_blank"
    >
      {button}
    </a>
  );

  const isDashboardLink = linkTo.pathname.indexOf('http') === -1;
  const link = isDashboardLink ? dashboardLink : externalLink;

  return (
    <Card style={styles.card}>
      <CardTitle title={title} />
      <CardText>
        <div style={styles.container}>
          <div style={styles.containerText}>
            {text}
          </div>
          <div style={styles.containerButton}>
            {link}
          </div>
        </div>
      </CardText>
    </Card>
  );
};

export default DialogSummaryRedirect;
