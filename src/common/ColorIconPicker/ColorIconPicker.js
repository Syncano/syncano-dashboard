import React from 'react';
import { Tabs, Tab } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import PreviewCircle from './PreviewCircle';
import PreviewHexagon from './PreviewHexagon';
import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';

const ColorIconPicker = ({
  color,
  icon,
  previewStyle = 'circle',
  onIconChange,
  onColorChange,
  title = 'Instance icon'
}) => {
  const styles = {
    headline: {
      color: 'rgba(0, 0, 0, 0.498039)',
      fontSize: 12,
      lineHeight: '18px'
    },
    tab: {
      color: Colors.blue400,
      fontSize: 13,
      lineHeight: '18px',
      fontWeight: 800
    },
    inkBarStyle: {
      background: Colors.blue400
    },
    contentContainerStyle: {
      paddingTop: 25
    },
    tabItemContainerStyle: {
      background: 'transparent',
      borderBottom: '1px solid #b8c0c9'
    }
  };

  const renderPreview = {
    circle: (
      <PreviewCircle
        color={color}
        icon={icon}
      />
    ),
    hexagon: (
      <PreviewHexagon
        color={color}
        icon={icon}
      />
    )
  }[previewStyle];

  return (
    <div>
      <p style={styles.headline}>
        {title}
      </p>
      {renderPreview}
      <Tabs
        inkBarStyle={styles.inkBarStyle}
        contentContainerStyle={styles.contentContainerStyle}
        tabItemContainerStyle={styles.tabItemContainerStyle}
      >
        <Tab
          style={styles.tab}
          label="COLOR"
        >
          <ColorPicker
            selectedColor={color}
            onColorChange={onColorChange}
          />
        </Tab>
        <Tab
          style={styles.tab}
          label="ICON"
        >
          <IconPicker
            selectedIcon={icon}
            onIconChange={onIconChange}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ColorIconPicker;
