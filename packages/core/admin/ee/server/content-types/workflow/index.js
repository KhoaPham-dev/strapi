'use strict';

module.exports = {
  schema: {
    collectionName: 'strapi_workflows',
    info: {
      name: 'Workflow',
      description: '',
      singularName: 'workflow',
      pluralName: 'workflows',
      displayName: 'Workflow',
    },
    options: {},
    pluginOptions: {
      'content-manager': {
        visible: false,
      },
      'content-type-builder': {
        visible: false,
      },
    },
    attributes: {
      uid: {
        type: 'string',
      },
      stages: {
        type: 'relation',
        target: 'admin::workflow-stage',
        relation: 'oneToMany',
        mappedBy: 'workflow',
      },
    },
  },
};
