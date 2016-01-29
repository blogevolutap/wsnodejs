var nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport 
var transporter = nodemailer.createTransport({
  service: 'gmail',
   auth: {
        user: 'evolutap@gmail.com',
        pass: '123@evolutap456'
    }
});
 
// NB! No need to recreate the transporter object. You can use 
// the same transporter object for all e-mails 
 
exports.sendemail = function(callback){
    // setup e-mail data with unicode symbols 
  var mailOptions = {
      from: 'Evolutap <contato@evolutap.com.br>', // sender address 
      to: 'brunor.botelho@gmail.com', // list of receivers 
      subject: 'Hello ✔', // Subject line 
      text: 'Hello world ✔', // plaintext body 
      html: '<b>Hello world ✔</b>' // html body 
  };
   
  // send mail with defined transport object 
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      callback(info);
      console.log('Message sent: ' + info.response);
   
  });  
}