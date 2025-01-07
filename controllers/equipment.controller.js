const Equipment = require('../models/equipment.model.js');
const mongoose = require('mongoose');
const { isEqual } = require('../utils/isEqual.js');


exports.getAllEquipments = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getEquipmentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.trim() === "") {
      return res.status(400).json({ message: "ID parameter is required" });
    }


    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const equipment = await Equipment.findById(id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createEquipment = async (req, res) => {
  const { name, image, type, quantity, status } = req.body;
  const newEquipment = new Equipment({ name, image, type, quantity, status });

  try {
    const savedEquipment = await newEquipment.save();
    res.status(201).json(savedEquipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateEquipment = async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEquipment) return res.status(404).json({ message: 'Equipment not found' });
    res.status(202).json(updatedEquipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteEquipment = async (req, res) => {
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
    const { name } = deletedEquipment;
    if (!deletedEquipment) return res.status(404).json({ message: 'Equipment not found' });
    res.status(200).json({ message: `${name} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
