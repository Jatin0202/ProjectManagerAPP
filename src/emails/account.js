const sgMail= require('@sendgrid/mail')

sgMail.setApiKey('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')

const sendWelcomeEmail= (email,name)=>{
    sgMail.send({
        to: email,
        from: 'jatindhingra009@gmail.com',
        subject: 'Welcome to Project Manager App',
        text: `Welcome to the app,${name} . Let me know how you get along with the app. 
        We will help you to build your projects efficiently as youyu get along with us.` 
    })
}

const sendDeleteEmail= (email,name)=>{
    sgMail.send({
        to: email,
        from: 'jatindhingra850@gmail.com',
        subject: 'Fuck-off',
        text: `Fuckoff ${name}` 
    })
}

module.exports= {
    sendWelcomeEmail,
    sendDeleteEmail
}