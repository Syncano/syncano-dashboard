export default {
  url: 'https://localhost:8080/#/solutions/list',
  elements: {
    solutionsView: {
      selector: 'div#solutions'
    },
    solutionDetails: {
      selector: '//button//span[text()="SEE DETAILS"]',
      locateStrategy: 'xpath'
    },
    favorite: {
      selector: '//div[text()="Favorite"]',
      locateStrategy: 'xpath'
    },
    allSolutions: {
      selector: '//div[text()="All solutions"]',
      locateStrategy: 'xpath'
    },
    mySolutions: {
      selector: '//div[text()="My solutions"]',
      locateStrategy: 'xpath'
    },
    favoriteSolutionTitle: {
      selector: 'span[class="synicon-filter-remove-outline"]'
    },
    mySolutionTitle: {
      selector: 'span[class="synicon-filter-remove-outline"]'
    },
    tagsList: {
      selector: '//div[@class="tags-list"]',
      locateStrategy: 'xpath'
    },
    tagsListItem: {
      selector: '//div[@class="tags-list"]//div[text()="js"]',
      locateStrategy: 'xpath'
    },
    tagsListJs: {
      selector: '//div[@class="tags-list"]//div[text()="js"]',
      locateStrategy: 'xpath'
    },
    tagsJs: {
      selector: '//span[@class="synicon-tag"]/following-sibling::a[text()="js"]',
      locateStrategy: 'xpath'
    },
    solutionAvatars: {
      selector: '//div[@class="row"]//img[@size="55"]',
      locateStrategy: 'xpath'
    }
  }
};
