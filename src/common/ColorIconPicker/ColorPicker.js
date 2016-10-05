import React from 'react';
import Radium from 'radium';
import { Color } from '../';
import { Paper, FontIcon } from 'material-ui';

export default Radium(({ selectedColor, onColorChange }) => {
  const getStyles = () => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      height: '100%',
      cursor: 'pointer'
    },
    item: {
      margin: 5,
      height: 20,
      width: 20,
      opacity: '0.7',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      color: '#fff',
      fontSize: 16,
      top: 2
    }
  });

  const renderColorItem = (color) => {
    let icon = null;
    const styles = getStyles();
    let zDepth = 0;

    styles.item.background = Color.getColorByName(color);

    if (color === selectedColor) {
      zDepth = 2;
      icon = (
        <FontIcon
          className="synicon-check"
          style={styles.icon}
        />
      );
    }

    return (
      <Paper
        id={color}
        zDepth={zDepth}
        key={color}
        circle={true}
        style={styles.item}
        onClick={() => onColorChange(color)}
      >
        {icon}
      </Paper>
    );
  };

  return (
    <div style={getStyles().container}>
      {Color.getColorPickerPalette().map((color) => renderColorItem(color))}
    </div>
  );
});
