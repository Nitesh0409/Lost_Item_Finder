const LostItem = require("../../models/lostItem");
const { validationResult } = require("express-validator");

//will add later if item is found match and claimed then remove..

exports.addLostItem = async (req, res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { itemName, description, images, tags, location } = req.body;
  const userId = req.userId || '6650e82a6f9f1937b2f6764f';

  const lostItem = new LostItem({
    userId,
    title : itemName,
    description,
    images,
    tags,
    location
  });

  try {
    const savedItem = await lostItem.save();
    console.log("item saved in db");
    res.status(201).json({
      message: 'Lost item reported successfully!',
      item: savedItem
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }

};

exports.getAllLostItems = async (req, res, next) => {
  try {
    const lostItems = await LostItem
      .find()
      .sort({ createdAt: -1 }); 
    res.status(200).json({
      message: 'Lost items fetched successfully!',
      items: lostItems
    });
  } catch (err) {
    console.error("Error fetching lost items:", err);
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.getLostItem = async (req, res, next) => {
  const itemId = req.params.id;

  try {
    const item = await LostItem.findById(itemId);
    if (!item) {
      const error = new Error("Lost Item not Found");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({ item });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
}

exports.deleteLostItem = async (req, res, next) => {
  const itemId = req.params.id;

  try {
    const item = await LostItem.findById(itemId);
    if (!item) {
      const error = new Error("Lost Item not Found");
      error.statusCode = 400;
      throw error;
    }

    /*
    will add later
    */
    // if (item.userId.toString() !== req.userId) {
    //   const error = new Error('Not authorized to delete this item.');
    //   error.statusCode = 403;
    //   throw error;
    // }

    await LostItem.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Item deleted successfully!' });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
}


exports.updateLostItem = async (req, res, next) => {
  const itemId = req.params.id;
  const { itemName, description, tags, images, location } = req.body;

  try {
    const item = await LostItem.findById(itemId);
    if (!item) {
      const error = new Error('Item not found.');
      error.statusCode = 404;
      throw error;
    }

    if (item.userId.toString() !== req.userId) {
      const error = new Error('Not authorized to update this item.');
      error.statusCode = 403;
      throw error;
    }

    item.title = itemName || item.title;
    item.description = description || item.description;
    item.tags = tags || item.tags;
    item.images = images || item.images;
    item.location = location || item.location;

    const updatedItem = await item.save();
    res.status(200).json({
      message: 'Item updated successfully!',
      item: updatedItem
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

