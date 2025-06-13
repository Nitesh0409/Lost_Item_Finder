const LostItem = require("../../models/lostItem");
const User = require("../../models/user");

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

  const { title,
    description,
    category,
    location,
    image,
    dateLost,
    contactInfo,
    reward } = req.body;
  
  const userId = req.user.userId;

  const lostItem = new LostItem({
    userId,
    title,
    description,
    category,
    location,
    image,
    dateLost,
    contactInfo,
    reward
  });

  try {
    const savedItem = await lostItem.save();

    await User.findByIdAndUpdate(userId, {
      $push: { itemsReportedLost: savedItem._id }
    });

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
  const userId = req.user.userId;
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

  const userId = req.user.userId;

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

  const userId = req.user.userId;

  try {
    const item = await LostItem.findById(itemId);
    if (!item) {
      const error = new Error("Lost Item not Found");
      error.statusCode = 400;
      throw error;
    }

    if (item.userId.toString() !== userId) {
      const error = new Error('Not authorized to delete this item.');
      error.statusCode = 403;
      throw error;
    }

    await LostItem.findByIdAndDelete(itemId);

    await User.findByIdAndUpdate(userId, {
      $pull: { itemsReportedLost: itemId }
    });

    res.status(200).json({ message: 'Item deleted successfully!' });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
}


exports.updateLostItem = async (req, res, next) => {
  const itemId = req.params.id;
  const userId = req.user.userId;

  const { itemName, description, tags, images, location } = req.body;

  try {
    const item = await LostItem.findById(itemId);
    if (!item) {
      const error = new Error('Item not found.');
      error.statusCode = 404;
      throw error;
    }

    if (item.userId.toString() !== userId) {
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

