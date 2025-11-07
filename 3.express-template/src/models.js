import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }
})

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }
})

export const Course = mongoose.model('Course', courseSchema)
export const Student = mongoose.model('Student', studentSchema)
