import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['dataEndpoint'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Adds Data Endpoint': (client) => {
    const dataEndpointsPage = client.page.dataEndpointsPage();
    const { instanceName } = instances.thirdInstance;
    const endpointName = utils.addSuffix('data-endpoint');
    const endpointDesc = utils.addSuffix('desc');
    const className = utils.addSuffix('class');
    const orderOption = dataEndpointsPage.elements.endpointOrderByChoice.selector;

    dataEndpointsPage
      .goToUrl(instanceName, 'data-endpoints')
      .clickElement('@addButtonZeroState')
      .fillInput('@endpointName', endpointName)
      .fillInput('@endpointDescription', endpointDesc)
      .fillInput('@endpointClassName', className)
      .clickElement('@endpointDescription')
      .clickElement('@endpointConfirm')
      .fillInput('@classFieldName', 'string')
      .clickElement('@classFieldType')
      .clickElement('@classDropdownSelection')
      .click('@addClassFieldButton')
      .clickElement('@endpointConfirm')
      .fillInput('@endpointPageSize', 20)
      .clickDropdown('@endpointOrderBy', orderOption)
      .clickElement('@endpointConfirm')
      .clickElement('@endpointCloseSummary')
      .verify.containsText('@enpointListItemClassName', className);
  },
  'Test Admin Edits Data Endpoint': (client) => {
    const dataEndpointsPage = client.page.dataEndpointsPage();
    const { classNames: tempClassNames } = instances.thirdInstance;
    const selectedClass = tempClassNames[0];

    dataEndpointsPage
      .clickListItemDropdown('@endpointFirstItemOptionsMenu', 'Edit')
      .fillInput('@endpointClassName', selectedClass)
      // click into description input as workaround for enter key closing autocomplete suggestions
      .clickElement('@endpointDescription')
      .clickElement('@endpointConfirm')
      .fillInput('@endpointPageSize', 33)
      .clickElement('@endpointConfirm')
      .clickElement('@endpointCloseSummary')
      .verify.containsText('@enpointListItemClassName', selectedClass);
  },
  'Test Admin Selects/Deselects Data Endpoint': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItem = listsPage.elements.selectedItemDataEndpoint.selector;
    const optionsMenu = listsPage.elements.firstItemOptionsMenu.selector;

    client.singleItemSelectUnselect('synicon-socket-data', optionsMenu, selectedItem);
  },
  'Test Admin Delete Data Endpoint': (client) => {
    const dataEndpointsPage = client.page.dataEndpointsPage();

    dataEndpointsPage
      .clickListItemDropdown('@endpointFirstItemOptionsMenu', 'Delete')
      .clickElement('@confirmButton')
      .waitForElementPresent('@addButtonZeroState');
  },
  'Test Add Data Endpoint with Sample Class': (client) => {
    const dataEndpointsPage = client.page.dataEndpointsPage();
    const endpointName = utils.addSuffix('data-endpoint');
    const endpointDesc = utils.addSuffix('desc');
    const { instanceName } = instances.thirdInstance;

    dataEndpointsPage
      .goToUrl(instanceName, 'data-endpoints')
      .clickElement('@addButtonZeroState')
      .fillInput('@endpointName', endpointName)
      .fillInput('@endpointDescription', endpointDesc)
      .clickElement('@endpointClassName')
      .clickElement('@endpointSampleClass')
      .clickElement('@endpointConfirm')
      .fillInput('@classLastFieldName', 'newField')
      .fillInput('@endpointClassName', 'sampleClass')
      .click('@addClassFieldButton')
      .clickElement('@endpointConfirm')
      .fillInput('@endpointPageSize', 20)
      .clickElement('@endpointConfirm')
      .clickElement('@endpointCloseSummary')
      .verify.containsText('@enpointListItemClassName', 'sampleclass');
  }
});
