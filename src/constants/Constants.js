export default {
  DATA_OBJECTS_PAGE_SIZE: 50,
  DATA_OBJECTS_DEFAULT_SORTING_FIELD: '-created_at',

  VIEW_MODES: ['cards', 'stream'],

  SORT_MODES: [
    'sortByName',
    'sortByDate',
    'sortByFullName',
    'sortByEmail',
    'sortByScriptName',
    'sortByCodeBoxName',
    'sortByScheduleCreateDate',
    'sortByScheduleName',
    'sortByTriggerName',
    'sortByTriggerCreateDate',
    'sortByAPIKeyDescription',
    'sortByAPIKeyCreationDate',
    'sortByClassCreateDate',
    'sortByClassName'
  ],

  VIEW_ACTIONS_MAP: {
    sortByName: 'id',
    sortByDate: 'data.created_at',
    switchToListView: 'stream',
    switchToCardView: 'cards',
    sortByFullName: 'fullname',
    sortByEmail: 'data.email',
    sortByScriptName: 'data.name',
    sortByCodeBoxName: 'data.slug',
    sortByScheduleCreateDate: 'data.created_at',
    sortByScheduleName: 'data.name',
    sortByTriggerName: 'data.name',
    sortByTriggerCreateDate: 'data.created_at',
    sortByAPIKeyCreationDate: 'data.created_at',
    sortByAPIKeyDescription: 'data.description',
    sortByClassCreateDate: 'data.created_at',
    sortByClassName: 'data.name'
  },

  crontabs: [
    {
      description: 'Every minute (* * * * *)',
      crontab: '* * * * *'
    },
    {
      description: 'Every 5 minutes (*/5 * * * *)',
      crontab: '*/5 * * * *'
    },
    {
      description: 'Twice an hour (0,30 * * * *)',
      crontab: '0,30 * * * *'
    },
    {
      description: 'Once an hour (0 * * * *)',
      crontab: '0 * * * *'
    },
    {
      description: 'Twice a day (0 0,12 * * *)',
      crontab: '0 0,12 * * *'
    },
    {
      description: 'Once a day (0 0 * * *)',
      crontab: '0 0 * * *'
    },
    {
      description: 'Once a week (0 0 * * 0)',
      crontab: '0 0 * * 0'
    },
    {
      description: '1st and 15th (0 0 1,15 * *)',
      crontab: '0 0 1,15 * *'
    },
    {
      description: 'Once a month (0 0 1 * *)',
      crontab: '0 0 1 * *'
    },
    {
      description: 'Once a year (0 0 1 1 *)',
      crontab: '0 0 1 1 *'
    }
  ],

  fieldTypes: [
    {
      text: 'array',
      desc: 'Store multiple values in a single variable'
    },
    {
      text: 'boolean',
      desc: 'A logical field. Can be displayed as True/False'
    },
    {
      text: 'datetime',
      desc: 'Date in UTC format'
    },
    {
      text: 'file',
      desc: 'Binary data, max 128MB'
    },
    {
      text: 'float',
      desc: 'Floating precision number data'
    },
    {
      text: 'geopoint',
      desc: 'Geographic coordinates field'
    },
    {
      text: 'integer',
      desc: 'Allows whole numbers between -2147483647 and 2147483647'
    },
    {
      text: 'object',
      desc: 'Object field - JSON like'
    },
    {
      text: 'reference',
      desc: 'Reference to Data Object (related Data Object ID)'
    },
    {
      text: 'relation',
      desc: 'Reference to Data Objects (related to more than one Data Object ID)'
    },
    {
      text: 'string',
      desc: 'Text field limited to 128 chars'
    },
    {
      text: 'text',
      desc: 'Text field limited to 32000 chars'
    }
  ],

  PROTECTED_FROM_EDIT_CLASS_NAMES: [
    {
      name: 'user_profile',
      fields: ['name']
    }
  ],

  PROTECTED_FROM_DELETE_CLASS_NAMES: [
    'user_profile'
  ],

  SNIPPET_TEMPLATE_DATA_SOURCE_TYPES: [
    'text/html',
    'text/css',
    'text/csv',
    'text/plain',
    'application/xml',
    'application/json'
  ],

  CANCEL_BILLING_PLAN_REASONS: [
    'Business needs have changed',
    'I’m not using Syncano enough',
    'Syncano seems difficult to set up and manage',
    'I only needed Syncano for a limited time',
    'It’s too expensive',
    'I’m having too many technical issues',
    'Syncano didn’t meet our needs',
    'Dissatisfied with customer support',
    'Dissatisfied with reliability',
    'Switching to a competitor',
    'Other'
  ],

  INSTANCE_NAME_ADJECTIVES: [
    'autumn', 'hidden', 'bitter', 'misty', 'silent', 'empty', 'dry', 'dark', 'summer', 'icy', 'delicate', 'quiet',
    'white', 'cool', 'spring', 'winter', 'patient', 'twilight', 'dawn', 'crimson', 'wispy', 'weathered', 'blue',
    'billowing', 'broken', 'cold', 'damp', 'falling', 'frosty', 'green', 'long', 'late', 'lingering', 'bold', 'little',
    'morning', 'muddy', 'old', 'red', 'rough', 'still', 'small', 'sparkling', 'throbbing', 'shy', 'wandering',
    'withered', 'wild', 'black', 'young', 'holy', 'solitary', 'fragrant', 'aged', 'snowy', 'proud', 'floral',
    'restless', 'divine', 'polished', 'ancient', 'purple', 'lively', 'nameless'
  ],

  INSTANCE_NAME_NOUNS: [
    'waterfall', 'river', 'breeze', 'moon', 'rain', 'wind', 'sea', 'morning', 'snow', 'lake', 'sunset', 'pine',
    'shadow', 'leaf', 'dawn', 'glitter', 'forest', 'hill', 'cloud', 'meadow', 'sun', 'glade', 'bird', 'brook',
    'butterfly', 'bush', 'dew', 'dust', 'field', 'fire', 'flower', 'firefly', 'feather', 'grass', 'haze', 'mountain',
    'night', 'pond', 'darkness', 'snowflake', 'silence', 'sound', 'sky', 'shape', 'surf', 'thunder', 'violet', 'water',
    'wildflower', 'wave', 'water', 'resonance', 'sun', 'wood', 'dream', 'cherry', 'tree', 'fog', 'frost', 'voice',
    'paper', 'frog', 'smoke', 'star'
  ]
};
