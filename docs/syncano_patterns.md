Syncano patterns
================

## Imports

```javascript

var React                 = require('react'),
    Reflux                = require('reflux'),
    Router                = require('react-router'),

    // Utils & Mixins
    HeaderMixin           = require('../Header/HeaderMixin'),
    ButtonActionMixin     = require('../../mixins/ButtonActionMixin'),
    DialogsMixin          = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin     = require('../../mixins/InstanceTabsMixin'),

    // Stores & Actions
    SessionActions        = require('../Session/SessionActions'),
    SessionStore          = require('../Session/SessionStore'),
    ApiKeysActions        = require('./ApiKeysActions'),
    ApiKeysStore          = require('./ApiKeysStore'),

    // Components
    mui                   = require('material-ui'),
    FloatingActionButton  = mui.FloatingActionButton,
    Dialog                = mui.Dialog,
    Container             = require('../../common/Container/Container.react'),
    FabList               = require('../../common/Fab/FabList.react'),
    ColorIconPickerDialog = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    ApiKeysList           = require('./ApiKeysList.react'),
    AddDialog             = require('./ApiKeysAddDialog.react');
```

## Actions

```javascript
var AuthActions = Reflux.createActions({
  'login': {},
  'activate': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'passwordSignIn': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
});

AuthActions.activate.listen(function(payload) {
  Connection
    .Accounts
    .activate(payload)
    .then(this.completed)
    .catch(this.failure);
});

AuthActions.passwordSignIn.listen(function(payload) {
  Connection
    .connect(payload.email, payload.password)
    .then(this.completed)
    .catch(this.failure);
});
```

## Vars

```javascript

var styles   = this.getStyles(),
    instance = SessionStore.instance;
```

## Style

```javascript
getStyles: function() {
  return {
    topToolbar: {
      background : Colors.blue500,
      height     : 68,
      padding    : '0 32px'
    },
    logotypeContainer: {
      height     : '100%',
      display    : 'flex',
      alignItems : 'center'
    },
  }
```

## Props formatting

```javascript
<Tab
  key      = {'menuItem-' + tab.route + '-' + index}
  label    = {tab.label}
  route    = {tab.route}
  params   = {tab.params}
  style    = {menuItemStyles}
  onActive = {this.handleTabActive} />
```

## Connecting store with actions

```javascript
var SessionStore = Reflux.createStore({
  listenables: SessionActions,
```

## Debug/Info messages

In Actions use "info":

```javascript
console.info('SessionActions::fetchUser');
```

In Stores use "debug":

```javascript
console.debug('SessionActions::onFetchUserFailure');
```

In Components use "info":

```javascript
componentWillUpdate: function(nextProps, nextState) {
  console.info('CodeBoxes::componentWillUpdate');
}
```
  

## Mixins

```javascript
mixins: [
  // Modules
  Router.State,
  Router.Navigation,

  // Stores
  Reflux.connect(CodeBoxesStore),
    
  // Local  
  HeaderMixin,
],
```
