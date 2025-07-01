// components/Navbar.jsx
import Link from 'next/link'; // Import Link for client-side navigation

export default function Navbar() {
  return (
    <header>
      <nav className="navbar" aria-label="Main navigation">
        <h1 className="logo">EchoSpeak</h1>
        <ul className="nav-menu">
          {/* Home Page Link */}
          <li><Link href="/">Home</Link></li>
          {/* Discovery Paths (Scroll to section on homepage) */}
          <li><Link href="/#choose-path">Discovery Paths</Link></li>
          {/* Stories Overview Page Link (Updated to /stories) */}
          <li><Link href="/stories">Stories</Link></li>
          {/* FAQs Page Link */}
          <li><Link href="/faqs">FAQs</Link></li>
          {/* Contact Us Page Link */}
          <li><Link href="/contact">Contact Us</Link></li>
          {/* Subscribe Page Link */}
          <li><Link href="/subscribe">Subscribe</Link></li>
          {/* Languages Page Link */}
          <li><Link href="/languages">Languages</Link></li>
          {/* Login Page Link */}
          <li><Link href="/login" className="login-button">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}
