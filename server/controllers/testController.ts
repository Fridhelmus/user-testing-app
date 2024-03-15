import { pool } from '../db'

class TestController {

  async getTestById(_req, res, _next, id: string) {
      const result = await pool.query('SELECT * FROM questions WHERE testId = $1', [id])
      
      res.json(result.rows)
  }

  async getTestList(_req, res, _next) {
      const result = await pool.query('SELECT * FROM tests')
      
      res.json(result.rows)
  }

  async insertUserTest(email, testId, mark) {
    try {
      const userQuery = `
        SELECT id FROM users WHERE email = $1
      `
      const userResult = await pool.query(userQuery, [email])
      const userId = userResult.rows[0]?.id

      if (userId) {
        const checkQuery = `
          SELECT * FROM UserTests WHERE UserID = $1 AND TestID = $2
        `
        const checkResult = await pool.query(checkQuery, [userId, testId])

        if (checkResult.rows.length === 0) {
          const query = `
            INSERT INTO UserTests (UserID, TestID, CompletionDate, Mark)
            VALUES ($1, $2, NOW(), $3)
          `
          await pool.query(query, [userId, testId, mark])
        } else {
          console.error(`User with email:${email} and testId:${testId} already exist`)
        }
      } else {
        console.error(`user with email:${email} not found`)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Database write error:', error.message)
      }
    }
  }

  async getUserTestMark(req, res, _next) {
    const { email, testId } = req.params

    try {
      const userQuery = `
        SELECT id FROM users WHERE email = $1
      `
      const userResult = await pool.query(userQuery, [email])
      const userId = userResult.rows[0]?.id

      if (userId) {
        const markQuery = `
          SELECT Mark FROM UserTests WHERE UserID = $1 AND TestID = $2
        `
        const markResult = await pool.query(markQuery, [userId, testId])
        const mark = markResult.rows[0]?.mark

        if (mark !== undefined) {
          res.json({ mark })
        } else {
          res.status(404).json({ error: `Test with id:${testId} for user with email:${email} not found` })
        }
      } else {
        res.status(404).json({ error: `User with email:${email} not found` })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Database read error:', error.message)
        res.status(500).json({ error: 'Database read error' })
      }
    }
  }  
}

export default new TestController()
