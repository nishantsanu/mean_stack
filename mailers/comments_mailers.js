const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'Codeial',
        to: comment.user.email,
        subject: 'New comment published',
        html: htmlString
    },(err,info) => {
        if(err){console.log('error in publishing mail',err); return;}

        console.log('Message sent',info);
        return;
    });
}


