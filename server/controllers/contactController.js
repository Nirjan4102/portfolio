const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const transporter = require('../config/nodemailer');

exports.submitContact = async (req, res, next) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Save to MongoDB database first
    const contact = await Contact.create({ name, email, subject, message });

    // Attempt to send email notification to site owner
    try {
      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
        replyTo: email,
        subject: `New Portfolio Message: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #6c63ff; margin-top: 0;">New Message from Portfolio Website</h2>
            <hr style="border: none; border-top: 1px solid #eee;" />
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <h3 style="color: #333; margin-bottom: 5px;">Message:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #6c63ff;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 25px;" />
            <p style="color: #888; font-size: 12px; margin-bottom: 0;">Submitted on ${new Date().toLocaleString()}</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`📧 Contact email sent successfully for message from ${email}`);
    } catch (emailErr) {
      console.warn('⚠️ Could not send email notification (check SMTP credentials in .env):', emailErr.message);
      // Notice: Do NOT crash the request. The message is safely saved in MongoDB!
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Thank you for reaching out.',
      data: { id: contact._id },
    });
  } catch (error) {
    next(error);
  }
};
