const nohm = require('nohm').Nohm;

const Image = nohm.model('Image', {
  properties: {
    rand_path: {
      type: 'string',
      index: true,
      validations: [
        'notEmpty',
        {
          name: 'length',
          options: {
            min: 6
          },
        },
      ],
    },
    original_name: {
      type: 'string',
      validations: ['notEmpty'],
    },
    new_name: {
      type: 'string',
      index: true,
      validations: ['notEmpty'],
    },
    image_type: {
      type: 'string',
      validations: 

    },
    vitits: {
      type: 'integer',
    },
  },
})