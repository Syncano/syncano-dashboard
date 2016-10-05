import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['dataEndpoint'],
  before: (client) => {
    const { accountKey } = accounts.navigationUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Adds Data Endpoint': (client) => {
    const dataEndpointsPage = client.page.dataEndpointsPage();
    const { instanceName } = accounts.navigationUser;
    const endpointName = utils.addSuffix('data-endpoint');
    const endpointDesc = utils.addSuffix('desc');
    const className = utils.addSuffix('class');

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
      .clickElement('@endpointConfirm')
      .clickElement('@endpointCloseSummary')
      .verify.containsText('@enpointListItemClassName', className);
  },
  'Test Admin Edits Data Endpoint': (client) => {
    const dataEndpointsPage = client.page.dataEndpointsPage();
    const { tempClassNames } = accounts.navigationUser;
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
    const { instanceName } = accounts.navigationUser;

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
