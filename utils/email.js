import { Resend } from "resend";

export const sendEmail = async (email, emailText, emailSubject) => {
  try {
    const resend = new Resend(process.env.RESEND_KEY);

    const sent = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: emailSubject,
      html: `<h2>${emailText}</h2>`,
    });

    //console.log("Email sent successfully:", sent);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
