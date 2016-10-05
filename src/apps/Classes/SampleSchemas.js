export default {
  car: {
    name: 'car',
    description: 'This is sample Data Class for Car object',
    metadata: {
      color: 'indigo',
      icon: 'car'
    },
    schema: [
      {
        type: 'string',
        name: 'make_name'
      },
      {
        type: 'string',
        name: 'model'
      },
      {
        type: 'float',
        name: 'mileage'
      },
      {
        type: 'datetime',
        name: 'production_date'
      },
      {
        type: 'boolean',
        name: 'used'
      },
      {
        type: 'string',
        name: 'color'
      },
      {
        type: 'array',
        name: 'equipment'
      },
      {
        type: 'file',
        name: 'photo'
      },
      {
        type: 'integer',
        name: 'seats'
      }
    ]
  },
  book: {
    name: 'book',
    description: 'This is sample Data Class for Book object',
    metadata: {
      color: 'indigo',
      icon: 'school'
    },
    schema: [
      {
        type: 'string',
        name: 'title'
      },
      {
        type: 'string',
        name: 'author'
      },
      {
        type: 'datetime',
        name: 'premiere_date'
      },
      {
        type: 'boolean',
        name: 'used'
      },
      {
        type: 'array',
        name: 'categories'
      },
      {
        type: 'integer',
        name: 'pages'
      },
      {
        type: 'relation',
        name: 'holder',
        target: 'user_profile'
      }
    ]
  },
  newsletter: {
    name: 'newsletter',
    description: 'This is sample Data Class for Newsletter object',
    metadata: {
      color: 'indigo',
      icon: 'email'
    },
    schema: [
      {
        type: 'relation',
        name: 'to',
        target: 'user_profile'
      },
      {
        type: 'text',
        name: 'message'
      },
      {
        type: 'datetime',
        name: 'schedule_at'
      },
      {
        type: 'string',
        name: 'from'
      },
      {
        type: 'string',
        name: 'title'
      },
      {
        type: 'file',
        name: 'image'
      }
    ]
  },
  twilioMessage: {
    name: 'twilio_message',
    description: 'This is sample Data Class for Twilio Message object',
    metadata: {
      color: 'indigo',
      icon: 'cellphone-android'
    },
    schema: [
      {
        type: 'text',
        name: 'message'
      },
      {
        type: 'string',
        name: 'number_from'
      },
      {
        type: 'string',
        name: 'number_to'
      }
    ]
  }
};
