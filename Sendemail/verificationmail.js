import nodemailer from "nodemailer";

const sendEmail = async(useremail)=> {
    let transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.gmail,
            pass: process.env.g_password
        },
        tls: {
	        rejectUnauthorized: false
        }
    })

   const mailOptions = {
        from: 'opsy5916@gmail.com',
        to: useremail,
        subject: 'Verification Required',
        text: 'Thank you for taaking bold steps to register with us. Now to have access to Task Organser full fetures, you need to verify'
    };

    await transporter.sendMail(mailOptions, (error, info)=>{
        if(error) {
            console.log(error.message);
        }

        if (info) {
            console.log ("email sent successfully")
        }
    });

}

export default sendEmail;