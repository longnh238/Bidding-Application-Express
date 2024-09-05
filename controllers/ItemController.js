const Item = require("../models/Item");
const items = require("../data/ItemsData");

const importItems = async () => {
  try {
    await Item.deleteMany({});

    for (let item of items) {
      const newItem = new Item(item);
      await newItem.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const getItems = (req, res) => {
  try {
    Item.find()
      .then((items) => {
        if (items == null || items.length == 0) {
          res.status(404).json({ message: "Items not found" });
        } else {
          res.json(items);
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getItem = (req, res) => {
  try {
    Item.findById(req.params.id)
      .then((item) => {
        if (item == null) {
          res.status(404).json({ message: "Item not found" });
        } else {
          res.json(item);
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createItem = (req, res) => {
  try {
    const { name, description, owner, image, bids } = req.body;
    if (
      name == null ||
      description == null ||
      owner == null ||
      image == null ||
      bids == null
    ) {
      res.status(404).json({
        message:
          "Please submit all the fields including name, description, image, and bids",
      });
    } else {
      const newItem = new Item({ name, description, owner, image, bids });
      newItem
        .save()
        .then(() => {
          res.status(201).json({ message: "New item added" });
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateItem = (req, res) => {
  try {
    Item.findById(req.params.id).then((item) => {
      if (item == null) {
        res.status(404).json({ message: "Item not found" });
      } else {
        const { name, description, owner, image, bids } = req.body;
        if (
          name == null ||
          description == null ||
          owner == null ||
          image == null ||
          bids == null
        ) {
          res.status(404).json({
            message:
              "Please submit all the fields including name, description, image, and bids",
          });
        } else {
          item.name = name;
          item.description = description;
          item.owner = owner;
          item.image = image;
          item.bids = bids;

          item
            .save()
            .then(() => res.json({ message: "Item updated succesfully!" }))
            .catch((error) => {
              res.status(505).json({ message: error.message });
            });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteItem = (req, res) => {
  try {
    Item.findById(req.params.id).then((item) => {
      if (item == null) {
        res.status(404).json({ message: "Item not found" });
      } else {
        Item.findByIdAndDelete(req.params.id)
          .then(() => {
            res.json({ message: "Item deleted!" });
          })
          .catch((error) => {
            res.status(505).json({ message: error.message });
          });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  importItems,
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
