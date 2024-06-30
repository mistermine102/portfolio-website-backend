import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post('/email/send', async (req, res) => {
  try {
    const { name, sender, message } = req.body

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.gmail_user,
        pass: process.env.gmail_password,
      },
    })

    await transporter.sendMail({
      from: process.env.gmail_user, // sender address
      to: process.env.emails_receiver, // list of receivers
      subject: `Nowa wiadomość od ${name}`, // Subject line
      text: message + ' od ' + sender, // plain text body
      html: message + ' od ' + sender, // html body
    })

    res.json('Message sent successfully')
  } catch (error) {
    console.log(error)
    res.json('Error')
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening...')
})
