const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://karthick:8925414216@karthi264326.gbutqoy.mongodb.net/passkey?appName=karthi264326').then(() => {
    console.log("connected to mongodb");
}).catch(() => {
    console.log("error connecting to mongodb");
})
const cretential = mongoose.model('cretential', {}, 'bulkmail')


const port = 2643;
const nodemailer = require('nodemailer');




app.post('/sendmail', (req, res) => {
    let msg = req.body.msg;
    let maildata = req.body.maildata;
    cretential.find().then((data) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: data[0].toJSON().user,
                pass: data[0].toJSON().pass
            }
        });
        new Promise((resolve, rej) => {
            try {
                for (let i = 0; i < maildata.length; i++) {
                    transporter.sendMail({
                        from: 'dhonikarthick26@gmail.com',
                        to: maildata[i],
                        subject: 'Test Email',
                        text: msg
                    })
                    console.log("mail sent to " + maildata[i]);

                }
                resolve("sucess");
            }
            catch (err) {
                rej("error");
            }

        }).then(() => {
            res.send(true)
        }).catch(() => {
            res.send(false)
        })
    }).catch((err) => {
        console.log(err);
    })


})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})