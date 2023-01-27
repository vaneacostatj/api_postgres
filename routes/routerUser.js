const express = require('express')
const UserServices = require('../services/user_services')
const validatorHandler = require('../middlewares/validator.handler')
const { createUserSchema, updateUserSchema, getUserSchema} = require('../schemas/user.schema')

const router = express.Router();
const service = new UserServices()

router.get('/', async (req, res)=> {
  const user = await service.find()
   res.json(user)
})

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res)=> {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user)
  }
)

router.post('/create',
  validatorHandler(createUserSchema, 'body'),
  async (req, res)=> {
    const body = req.body;
    const newUser = await service.create(body)
    res.status(201).json(newUser)
  }
)

router.post('/update/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res)=> {
    const { id } = req.params;
    const body = req.body;
    const updateuser = await service.update(id,body)
    res.status(201).json(updateuser)
  }
)

router.get('/delete/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res)=> {
  const { id } = req.params;
  const user = await service.delete(id)
  res.status(201).json({
    message: 'deleted',
    user
  })
})


module.exports = router
