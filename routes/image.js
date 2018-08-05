const mongoose  = require('mongoose');
const Image     = require('../models/image');

/**
 * GET /i - Displays all book
 *
 * @TODO : Lock this down to admin-level personnel only.
 */
function getImages(req, res) {
  let images = Image.find( {} ).exec((err, images) => {
    if (err)
      return res.send(err);

    res.json(images);
  });
}

/**
 * POST /i - Upload a new book
 *
 * @TODO : Integrate authentication to ensure only our web servers
 *          are sending this request.
 */
function postImage(req, res) {
  let newImage = new Image(req.body);

  newImage.save((err, image) => {
    if (err)
      return res.send(req.body);

    res.json( { message: 'Image successfully uploaded', image } );
  });
}

/**
 * GET /i/:image - Display a specific image
 *
 * @TODO : Validate extension against image type; if invalid, don't serve,
 *          even if image_name is fine.
 *
 * @TODO : Refactor how we serve images as a whole... especially pull URL
 *          out of the code and into a configuration.
 */
function getImage(req, res) {
  let image_name, image_ext;
  [image_name, image_ext] = parse_image_param(req.params.img);

  if (image_name && image_ext) {
    Image.findOne( { file_name: req.params.img } ).lean().exec((err, image) => {
      if (err)
        return res.send(err);

      // We found the image... now do this the worse way possible until I circle back and fix it up
      res.setHeader('content-type', image.image_type);
      res.send('http://' + image.server + '.simage.us/files/' + image_name + '.' + image_ext);
    })
  }
}

/**
 * PUT /i/:image - Update an image record
 *
 * @TODO : Lock this down top admin-level personnel only
 */
function updateImage(req, res) {
  Image.findOne( { file_name: req.params.img }, (err, image) => {
    if (err)
      return res.send(err);

    Object.assign(image, req.body).save((err, image) => {
      if (err)
        res.send(err);

      res.json( { message: 'Image updated', image } );
    });
  });
}

/**
 * DELETE /i/:image - Delete an image record
 *
 * @TODO : Lock this down top admin-level personnel only
 */
function deleteImage(req, res) {
  Image.remove( { file_name: req.params.img }, (err, res) => {
    res.json( { message: 'Image successfully deleted', res } );
  });
}

/**
 * Check the given image parameter and return various parts
 */
function parse_image_param(image) {
  if (image.match(/(\w+)\.(\w{3,4})$/)) {
    return [RegExp.$1, RegExp.$2];
  }

  return [null, null];
}

module.exports = { getImage, getImages, postImage, deleteImage, updateImage };