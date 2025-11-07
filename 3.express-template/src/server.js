import { trace, context } from '@opentelemetry/api';

import express from 'express'
import { connect } from './db.js'
import { seedDb } from './seed.js'
import { Student } from './models.js'

const app = express()
const PORT = 8090

const _db = await connect()
await seedDb()

let counter = 0

app.get('/students', async (req, res) => {

  try {
    const span = trace.getSpan(context.active())
    ++counter

    if (counter === 1) {
      const students = await Student.find()

      // Busca curso manualmente (como no exemplo original)
      for (const s of students) {
        const course = await _db.model('Course').findById(s.courseId)
        s.course = course?.name || null
        delete s.courseId
      }

      const payload = {
            students,
            message: "this is from the really bad response"
        }

        span.setAttribute('http.response_payload', JSON.stringify(payload))


      return res.status(202).json({
        students,
        message:'this is the best response',
      })
    }

    if (counter === 2) {
      const students = await Student.find()
        .populate('courseId', 'name')
        .lean()

      const formatted = students.map((s) => ({
        id: s._id,
        name: s.name,
        course: s.courseId?.name,
      }))

        const payload = {
            students: formatted,
            message: "this is from the really bad response"
        }
        span.setAttribute('http.response_payload', JSON.stringify(payload))

      return res.json({
        students: formatted,
        message: 'this is the best response',
      })
    }

    counter = 0
    return res.status(401).json({ message: 'just responding with a different code!' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error', error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
