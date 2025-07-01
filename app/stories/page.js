// app/stories/page.js
// This file will now render the content for the main "Stories" overview page ("/stories")

import Link from 'next/link';

// Metadata for this specific page.
export const metadata = {
  title: 'Stories Overview',
  description: 'Explore all the interactive language learning stories available on EchoSpeak.',
};

export default function StoriesPage() {
  return (
    <main className="section"> {/* Applied section class to main for consistent padding */}
      <div className="section-content-container">
        <h2>📖 Our Engaging Stories</h2>
        <p>Dive into a world of adventure and language! Our stories are designed to make learning immersive and fun.</p>

        {/* Content for the Stories overview page, repurposed from the "Lessons coming soon" section */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px', /* Give it some height */
          backgroundColor: '#fef3c7', /* Light background */
          borderRadius: '15px',
          border: '2px dashed #fcd34d',
          padding: '2em',
          marginTop: '2em',
          color: '#78350f',
          fontSize: '1.2em',
          fontWeight: 'bold',
          flexDirection: 'column',
          maxWidth: '600px',
          margin: '2em auto'
        }}>
          <p>More interactive stories are continuously being developed and added!</p>
          <p style={{ marginTop: '1em' }}>For now, you can find our primary stories within the <Link href="/kids-path" style={{ color: '#0f766e', textDecoration: 'underline' }}>Kid&apos;s Path</Link> and <Link href="/retiree-path" style={{ color: '#0f766e', textDecoration: 'underline' }}>Retiree Path</Link> sections.</p>
        </div>
      </div>
    </main>
  );
}
