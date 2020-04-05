const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth.js')
const { dateFormat } = require('../config/lib.js')

// model
const db = require('../models')
const Record = db.Record
const User = db.User
// sequelize: MySQL's ORM
const { Op } = require('sequelize')

const categories = [
  {
    id: 1,
    name: '家居物業',
    icon: '<i class="fas fa-home"></i>'
  },
  {
    id: 2,
    name: '交通出行',
    icon: '<i class="fas fa-shuttle-van"></i>'
  },
  {
    id: 3,
    name: '休閒娛樂',
    icon: '<i class="fas fa-grin-beam"></i>'
  },
  {
    id: 4,
    name: '餐飲食品',
    icon: '<i class="fas fa-utensils"></i>'
  },
  {
    id: 5,
    name: '其他',
    icon: '<i class="fas fa-pen"></i>'
  }
]
categories.push({
  id: 'all',
  name: '所有類別'
})
const months = []
for (let i = 1; i <= 12; i++) {
  months.push({ id: i, name: `${i} 月份` })
}
months.push({
  id: 'all',
  name: '所有月份'
})

router.get('/', authenticated, (req, res) => {
  const whereCond = { userId: req.user.id }

  let selCategory = req.query.category
  if (selCategory && selCategory !== 'all') whereCond.categoryId = selCategory
  else selCategory = 'all'

  let selMonth = req.query.month
  if (selMonth && selMonth !== 'all') {
    const today = new Date
    const thisYear = today.getUTCFullYear()

    whereCond.date = {
      [Op.lt]: `${thisYear}-${selMonth}-31`,
      [Op.gte]: `${thisYear}-${selMonth}-1`
    }
  }
  else selMonth = 'all'

  // params
  let totalAmount = 0

  // 此使用者的 record
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')
      // return promise object
      return Record.findAll({
        raw: true,
        nest: true,
        where: whereCond
      })
    })
    .then((records) => {
      records.forEach((record, index) => {
        records[index].icon = categories.find((category) => String(category.id) === String(record.categoryId)).icon

        const date = new Date(record.date)
        records[index].date = dateFormat(date, '/')

        totalAmount += record.amount
      })
      return res.render('index', { months, categories, records, totalAmount, selCategory, selMonth })
    })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router
