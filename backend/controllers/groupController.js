const Group = require('../models/Group');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/groups.json');

// Load initial groups from JSON
const loadGroups = () => {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Save groups to JSON
const saveGroups = (groups) => {
    fs.writeFileSync(filePath, JSON.stringify(groups, null, 2));
};

exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.json({ groups });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching groups' });
    }
};

exports.createGroup = async (req, res) => {
    const { name, code } = req.body;
    try {
        if (!name || !code) {
            return res.status(400).json({ message: 'Name and code are required' });
        }
        const group = new Group({ name, code });
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(400).json({ message: 'Error creating group' });
    }
};

exports.joinGroup = async (req, res) => {
    const { code } = req.body;
    try {
        const group = await Group.findOne({ code });
        if (group) {
            res.status(200).json({ message: 'Joined group successfully' });
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error joining group' });
    }
};

exports.deleteGroup = async (req, res) => {
    const { code } = req.body;
    try {
        const group = await Group.findOneAndDelete({ code });
        if (group) {
            const groups = loadGroups().filter(g => g.code !== code);
            saveGroups(groups);
            res.status(200).json({ message: 'Group deleted successfully' });
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting group' });
    }
};
