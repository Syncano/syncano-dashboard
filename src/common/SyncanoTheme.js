import { colors as Colors } from 'material-ui/styles/';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';
import Spacing from './Spacing';

const palette = {
  primary1Color: '#244273',
  primary2Color: Colors.blue500,
  primary3Color: Colors.blue100,
  accent1Color: Colors.indigo500,
  accent2Color: Colors.pinkA400,
  accent3Color: Colors.pinkA100,
  textColor: Colors.darkBlack,
  alternateTextColor: Colors.white,
  canvasColor: Colors.white,
  borderColor: Colors.grey300,
  disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
};

export default {
  spacing: Spacing,
  fontFamily: 'Avenir, sans-serif',
  zIndex: {
    menu: 1000,
    appBar: 1100,
    leftNavOverlay: 1200,
    leftNav: 1300,
    dialogOverlay: 1400,
    dialog: 1500,
    layer: 2000,
    popover: 2100,
    tooltip: 3000
  },
  palette,
  flatButton: {
    primaryTextColor: palette.primary1Color,
    textColor: 'rgba(0, 0, 0, 0.54)'
  },
  raisedButton: {
    primaryColor: Colors.blue700
  },
  floatingActionButton: {
    color: Colors.pinkA200
  },
  tableHeaderColumn: {
    textColor: 'rgba(0, 0, 0, 0.54)'
  },
  tableRow: {
    hoverColor: '#EEEEEE'
  },
  toggle: {
    thumbOffColor: '#fff',
    trackOffColor: 'rgba(0, 0, 0, 0.26)'
  },
  menuSubheader: {
    textColor: 'rgba(0, 0, 0, 0.54)'
  }
};
