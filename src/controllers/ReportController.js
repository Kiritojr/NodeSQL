const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show (req, res) {
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%gmail%'
        }
      },
      include: [
        { 
          association: 'addresses', 
          where: { 
            street: 'rua das Palmeiras' 
          } },

        { 
          association: 'techs', 
          required: false,
          where: {
            name: {
              [Op.iLike]: 'React%'
            }
          } },
      ],
    })

    return res.json(users);
  }
};