const mongoose=require('mongoose')
mongoose.set('strictQuery', true);
// const db="mongodb://localhost:27017/dabbaOP"


// mongoose.connect(db).then(()=>{
//   console.log('connection successfull')
// } , err => {
//   console.log(err)
// })
// }).catch((err)=>console.log(`not connected`))

 
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/Vlab`)

    console.log('MongoDB connected!!')
  } catch (err) {
    console.log('Failed to connect to MongoDB', err)
  }
}

connectDB()