const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth.js')
const { dateFormat } = require('../config/lib.js')

// model
const db = require('../models')
const Record = db.Record
const User = db.User

// params
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

function generateTemplateParams (kind, record, errors) {
  const params = {}
  params.action = (kind === 'add') ? '/records/new' : `/records/${record.id}?_method=PUT`
  params.note = (kind === 'add') ? '請輸入你的支出' : '請修改你的支出'
  params.buttonName = (kind === 'add') ? '新增支出' : '送出'
  params.categories = categories
  if (record) {
    params.name = record.name
    params.date = record.date
    params.category = record.categoryId || record.category
    params.merchant = record.merchant
    params.amount = record.amount
    params.errors = errors
  }
  return params
}

// 新增
router.get('/new', authenticated, (req, res) => {
  res.render('edit', generateTemplateParams('add'))
})

router.post('/new', authenticated, (req, res) => {
  const errors = []
  const { name, date, amount, category, merchant } = req.body

  // value check
  if (!name.trim() || !date.trim() || !amount.trim() || !category.trim() || !merchant.trim()) errors.push({ message: '所有欄位均為必填' })
  if (Number(amount) < 0 || isNaN(Number(amount))) errors.push({ message: '金額請輸入整數' })

  if (errors.length > 0) {
    res.render('edit', generateTemplateParams('add', req.body, errors))
    return false
  }

  // When you create a user document, Mongoose will cast the value to a native JavaScript date using the Date() constructor.
  const record = new Record({
    name, date, amount, userId: req.user._id, categoryId: category, merchant
  })

  Record.create({
    name,
    date,
    amount,
    UserId: req.user.id,
    categoryId: category,
    merchant
  })
    .then((record) => res.redirect('/'))
    .catch((err) => console.log(err))
})

// 編輯
router.get('/edit/:id', authenticated, (req, res) => {
  Record.findByPk(req.params.id)
    .then((record) => {
      // TODO: ask: 如果沒有先用 get() 轉成 JS 單純物件，下面 date 會轉不成功
      return record.get()
    })
    .then((record) => {
      const date = new Date(record.date)
      record.date = dateFormat(date, '-')
      res.render('edit', generateTemplateParams('edit', record))
    })
    .catch((err) => console.log(err))
})

router.put('/:id', authenticated, (req, res) => {
  const errors = []
  const { name, date, amount, category, merchant } = req.body

  // value check
  if (!name || !date || !amount || !category || !merchant) errors.push({ message: '每個欄位均為必填' })
  if (Number(amount) < 0 || isNaN(Number(amount))) errors.push({ message: '金額請輸入整數' })

  if (errors.length > 0) {
    req.body.id = req.params.id
    res.render('edit', generateTemplateParams('edit', req.body, errors))
    return false
  }

  Record.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
    .then((record) => {
      record.name = req.body.name
      record.date = req.body.date
      record.merchant = req.body.merchant
      record.amount = req.body.amount
      record.categoryId = req.body.category

      return record.save()
    })
    .then((todo) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

// 刪除
router.delete('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')

      return Record.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router
