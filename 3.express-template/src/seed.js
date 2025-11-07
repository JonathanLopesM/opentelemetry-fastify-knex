import { Course, Student } from './models.js'

export async function seedDb() {
  await Course.deleteMany({})
  await Student.deleteMany({})

  const courses = await Course.insertMany([
    { name: 'Método TAJS' },
    { name: 'Formação JavaScript Expert' }
  ])

  const students = await Student.insertMany([
    { name: 'Zezin', courseId: courses[0]._id }
  ])

  console.log({
    courses: courses.map(c => c.toObject()),
    students: students.map(s => s.toObject())
  })
}
