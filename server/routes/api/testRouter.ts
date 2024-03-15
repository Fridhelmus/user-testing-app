import { Router } from 'express'
import testController from '../../controllers/testController'

const router = Router()

router.get('/test/:id', (req, res, next) => testController.getTestById(req, res, next, req.params.id))
router.get('/test', (req, res, next) => testController.getTestList(req, res, next))
router.get('/usertest/:email/:testId', testController.getUserTestMark)
router.post('/result', async (req, res, next) => {
  const { email, testId, mark } = req.body
  console.log(email, testId, mark)

  try {
    await testController.insertUserTest(email, testId, mark)
    res.status(201).json({ message: 'data stored successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error on writing to database' })
  }
})

export { router }
