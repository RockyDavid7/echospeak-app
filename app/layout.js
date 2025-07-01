// app/layout.js
import '../styles/globals.css'; // Import your global CSS file
import Navbar from '../components/Navbar'; // Import the Navbar component
import Footer from '../components/Footer'; // Import the Footer component

// Metadata for the entire application (can be overridden by individual pages)
export const metadata = {
  title: {
    default: 'EchoSpeak - Language Learning App',
    template: '%s | EchoSpeak', // This allows individual page titles to be unique
  },
  description: 'Learn languages with EchoSpeak using the TPRS method. Fun, interactive, and engaging stories for all ages.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Render the Navbar component */}
        {children} {/* This prop will render the content of your individual page components */}
        <Footer /> {/* Render the Footer component */}
      </body>
    </html>
  );
}
