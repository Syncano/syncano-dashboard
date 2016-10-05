import React from 'react';
import { Link } from 'react-router';
import { RaisedButton } from 'material-ui';

const AlertPageContent = ({
  imgSrc,
  headline,
  message,
  buttonLinkTo,
  buttonLabel,
  buttonSet,
  buttonDescription,
  bottomText
}) => {
  const styles = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 50px)'
    },
    flexTop: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      maxWidth: 450,
      margin: '0 auto 80px'
    },
    image: {
      display: 'block',
      marginBottom: 70
    },
    headline: {
      marginBottom: 30,
      color: '#1D2228',
      fontSize: 28,
      lineHeight: '38px',
      fontWeight: 700
    },
    message: {
      margin: 0,
      fontSize: 14,
      lineHeight: '19px',
      color: 'rgba(0,0,0,0.54)'
    },
    buttonSet: {
      marginTop: 70,
      marginBottom: 10,
      marginLeft: -10,
      marginRight: -10,
      display: 'flex',
      justifyContent: 'center'
    },
    button: {
      height: 44,
      width: 230,
      margin: '0 10px',
      boxShadow: 'none'
    },
    buttonDescription: {
      margin: '0 0 -16px',
      fontSize: 12,
      lineHeight: '16px',
      color: 'rgba(0,0,0,0.54)'
    },
    flexBottom: {
      padding: '20px 0',
      textAlign: 'center'
    },
    flexBottomText: {
      margin: 0,
      fontSize: 12,
      lineHeight: '16px',
      color: 'rgba(0,0,0,0.54)'
    }
  };

  const defaultBottomText = (
    <span>
      If you think this is an error, please contact us at: <br />
      <a href="mailto:support@syncano.com">support@syncano.com</a>
    </span>
  );

  return (
    <div style={styles.root}>
      <div style={styles.flexTop}>
        <img
          src={imgSrc}
          alt=""
          style={styles.image}
        />
        <div style={styles.headline}>
          {headline}
        </div>
        <p style={styles.message}>
          {message}
        </p>
        <div style={styles.buttonSet}>
          {buttonLinkTo && <Link to={buttonLinkTo}>
            <RaisedButton
              label={buttonLabel}
              backgroundColor="#FFCC01"
              labelColor="#1D2228"
              style={styles.button}
              labelStyle={{ fontWeight: 700 }}
            />
          </Link>}
          {buttonSet}
        </div>
        {buttonDescription && <p style={styles.buttonDescription}>{buttonDescription}</p>}
      </div>
      <div style={styles.flexBottom}>
        <p style={styles.flexBottomText}>
          {bottomText || defaultBottomText}
        </p>
      </div>
    </div>
  );
};

export default AlertPageContent;
