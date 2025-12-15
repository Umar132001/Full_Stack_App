import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(to, subject, htmlContent) {
  const msg = {
    to,
    from: "m.umar200113@gmail.com", // Make sure it's verified
    subject,
    html: htmlContent,
  };

  console.log("Sending email:", msg);

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response ? error.response.body : error
    );
    throw new Error("Email sending failed");
  }
}
