export default {
  get(name) {
    this.NewLibConnection
      .Template
      .please()
      .get({ name })
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, params) {
    this.NewLibConnection
      .Template
      .please()
      .update({ name }, params)
      .then(this.completed)
      .catch(this.failure);
  },

  render(name, context = {}) {
    this.NewLibConnection
      .Template
      .please()
      .render({ name }, context)
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.NewLibConnection
      .Template
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    const { name, content_type, content, context } = payload;

    this.NewLibConnection
      .Template
      .please()
      .create({
        content,
        context,
        name,
        content_type
      })
      .then(this.completed)
      .catch(this.failure);
  },

  remove(templates) {
    const promises = templates.map((template) =>
      this.NewLibConnection
        .Template
        .please()
        .delete({ name: template.name }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  renderFromEndpoint(templateName, endpointUrl) {
    const { accountKey } = this.NewLibConnection;
    const params = {
      api_key: accountKey,
      template_response: templateName,
      serialize: false
    };
    let url = endpointUrl;

    if (!url.endsWith('/')) {
      url += '/';
    }

    this.Promise.get(url, { params })
      .then(this.completed)
      .catch(this.failure);
  }
};
