const Group = require('../models/Group');

const createGroup = async (req, res) => {
  const { name, code } = req.body;

  if (!name || !code) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  if (code.length !== 6) {
    return res.status(400).json({ message: 'Code must be 6 digits' });
  }

  try {
    const existingGroup = await Group.findOne({ code });

    if (existingGroup) {
      return res.status(400).json({ message: 'Group with this code already exists' });
    }

    const newGroup = new Group({ name, code });
    await newGroup.save();

    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const joinGroup = async (req, res) => {
  const { name, code } = req.body;

  if (!name || !code) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const group = await Group.findOne({ name, code });

    if (!group) {
      return res.status(400).json({ message: 'Group not found or incorrect code' });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createGroup,
  getGroups,
  joinGroup
};
