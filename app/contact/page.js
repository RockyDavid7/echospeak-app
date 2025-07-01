// app/contact/page.js

// Metadata for this specific page. This will set the browser tab title and description.
export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the EchoSpeak team with your comments and questions.',
};

export default function ContactPage() {
  return (
    <main>
      <section id="contact" className="section">
        <div className="contact-form-container">
          <h2>Get in Touch with EchoSpeak!</h2>
          <p>We&apos;d love to hear from you! Whether you have a question, feedback, or just want to say hello, please fill out the form below and we&apos;ll get back to you as soon as possible.</p>

          {/*
            Form for comments and questions.
            The 'action' attribute remains a placeholder as direct email sending from client-side HTML/JS is not possible.
            You would integrate a server-side solution (like a Next.js API route or a third-party service) here.
          */}
          <form action="#" method="POST" aria-label="Contact form">
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input type="text" id="name" name="user_name" required aria-required="true" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email:</label>
              <input type="email" id="email" name="user_email" required aria-required="true" placeholder="Enter your email address" />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input type="text" id="subject" name="email_subject" required aria-required="true" placeholder="Subject of your message" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="user_message" rows="6" required aria-required="true" placeholder="Write your message here..."></textarea>
            </div>

            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </section>
    </main>
  );
}
