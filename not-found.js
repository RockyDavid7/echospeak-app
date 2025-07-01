// app/not-found.js
// This file will render the content for your 404 "Page Not Found" errors.

import Link from 'next/link';
import Image from 'next/image'; // Don't forget to import Image

// Note: Next.js 'not-found.js' files do not typically export metadata as they are error pages.

export default function NotFoundPage() {
  return (
    <main className="section"> {/* Applied section class to main for consistent padding */}
      <div className="error-container">
        <h2>404</h2>
        <h3>Oops! Page Not Found</h3>
        {/*
          Image component. You'll need to place '404-error-image.png' (or whatever you name it)
          in your `public/images/` directory.
        */}
        <Image
          src="/images/ES_404_Page.png" // Placeholder image path
          alt="Confused Echo and Mike looking at a broken page"
          width={250} // Consistent width from your original CSS
          height={150} // Approximate height for the placeholder
          className="error-image"
        />
        <p>It looks like the page you were looking for has flown away! Don't worry, we'll help you get back on track.</p>
        <Link href="/" className="home-button">Go Back to Homepage</Link> {/* Link back to the root */}
      </div>
    </main>
  );
}
