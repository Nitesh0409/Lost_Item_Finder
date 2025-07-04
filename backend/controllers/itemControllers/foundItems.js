const FoundItem = require("../../models/foundItem");
const User = require("../../models/user");

const { validationResult } = require("express-validator");

//will add later if item is found match and claimed then remove..

exports.addFoundItem = async (req, res,next) => {
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
    coordinates,
    tags,
    dateFound,
    contactInfo,
    safeLocation } = req.body;
  
    const userId = req.user.userId;
  
  const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
  const parsedCoordinates = typeof coordinates === "string" ? JSON.parse(coordinates) : coordinates;

  // console.log(req.file);

  // Handle uploaded image
  const imageInfo = req.file
    ? {
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    }
    : null;
  

  const foundItem = new FoundItem({
    userId,
    title,
    description,
    category,
    location,
    coordinates : parsedCoordinates,
    tags: parsedTags,
    image: imageInfo, // ← now storing file info, not URL
    dateFound,
    contactInfo,
    safeLocation,
  });

  try {
    const savedItem = await foundItem.save();
    
    await User.findByIdAndUpdate(userId, {
      $push: { itemsReportedFound: savedItem._id }
    });

    console.log("item saved in db");
    res.status(201).json({
      message: 'found item reported successfully!',
      item: savedItem
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }

};

exports.getAllFoundItems = async (req, res, next) => {
  try {
    const foundItems = await FoundItem
      .find()
      .sort({ createdAt: -1 }); 
    res.status(200).json({
      message: 'Found items fetched successfully!',
      items: foundItems
    });
  } catch (err) {
    console.error("Error fetching found items:", err);
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.getFoundItem = async (req, res, next) => {
  const itemId = req.params.id;

  try {
    const item = await FoundItem.findById(itemId);
    if (!item) {
      const error = new Error("found Item not Found");
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

exports.deleteFoundItem = async (req, res, next) => {
  const itemId = req.params.id;
  const userId = req.user.userId;
  try {
    const item = await FoundItem.findById(itemId);
    if (!item) {
      const error = new Error("Found Item not Found");
      error.statusCode = 400;
      throw error;
    }

    if (item.userId.toString() !== userId) {
      const error = new Error("Not authorized to delete this item");
      error.statusCode = 403; // Forbidden
      throw error;
    }


    await FoundItem.findByIdAndDelete(itemId);
    
    await User.findByIdAndUpdate(userId, {
      $pull: { itemsReportedFound: itemId }
    });
    console.log("item deleted");
    res.status(200).json({ message: 'Item deleted successfully!' });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
}


exports.updateFoundItem = async (req, res, next) => {
  const itemId = req.params.id;
  const { itemName, description, tags, image, location } = req.body;

  const userId = req.user.userId;

  try {
    const item = await FoundItem.findById(itemId);
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
    item.image = image || item.image;
    item.location = location || item.location;
    item.coordinates = coordinates || item.coordinates;

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


/*
will add later
*/
// if (item.userId.toString() !== req.userId) {
//   const error = new Error('Not authorized to delete this item.');
//   error.statusCode = 403;
//   throw error;
// }
