import mongoose from 'mongoose'

export async function connect() {
  const uri = 'mongodb://root:jonathan@localhost:27017/development?authSource=admin'

  mongoose.set('strictQuery', true)

  await mongoose.connect(uri)

  console.log('✅ Connected to MongoDB!')
  return mongoose
}
