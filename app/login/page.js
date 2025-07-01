// app/login/page.js
// This file will render the content for your "Login" page ("/login")

import Link from 'next/link'; // Import Link for navigation

// Metadata for this specific page.
export const metadata = {
  title: 'Login - EchoSpeak', // Updated title for clarity
  description: 'Log in to your EchoSpeak account to continue your language learning journey.',
};

export default function LoginPage() {
  return (
    <main className="section"> {/* Applied section class to main for consistent padding */}
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <p>Log in to continue your language learning journey with EchoSpeak.</p>

        {/*
          Login form. The 'action' attribute remains a placeholder as actual authentication
          requires a backend server.
        */}
        <form action="#" method="POST" aria-label="Login form">
          <div className="form-group">
            <label htmlFor="username_email">Username or Email:</label>
            <input type="text" id="username_email" name="username_email" required aria-required="true" placeholder="Enter your username or email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required aria-required="true" placeholder="Enter your password" />
          </div>

          <button type="submit" className="submit-button">Login</button>
        </form>

        <div className="login-links">
            <p><Link href="#">Forgot Password?</Link></p>
            <p>Don&apos;t have an account? <Link href="#">Sign Up!</Link></p>
        </div>
      </div>
    </main>
  );
}
