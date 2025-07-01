// app/faqs/page.js

// Metadata for this specific page. This defines the browser tab title and description.
export const metadata = {
  title: 'FAQs - EchoSpeak',
  description: 'Frequently Asked Questions about EchoSpeak, language learning, and TPRS.',
};

export default function FaqsPage() {
  return (
    <main>
      <section id="faq" className="section">
        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-category">
            <h3>About the Web Author</h3>
            <div className="faq-item">
              <p className="faq-question"> Who created EchoSpeak?</p>
              <p className="faq-answer">EchoSpeak was developed by Erick McFerran as part of an ITS 6333 Web Development and Design project. Erick is passionate about creating engaging and accessible educational tools.</p>
            </div>
            <div className="faq-item">
              <p className="faq-question"> What is the author&apos;s background?</p>
              <p className="faq-answer">Erick McFerran has expertise in web and mobile development, user experience design, and accessibility, with a focus on creating culturally authentic content for language learning.</p>
            </div>
          </div>

          <div className="faq-category">
            <h3>About EchoSpeak</h3>
            <div className="faq-item">
              <p className="faq-question"> What is EchoSpeak?</p>
              <p className="faq-answer">EchoSpeak is a web and mobile application designed to teach foreign languages using the Teaching Proficiency through Reading and Storytelling (TPRS) method. It features interactive stories, voice recognition, and progress tracking.</p>
            </div>
            <div className="faq-item">
              <p className="faq-question"> What languages does EchoSpeak support?</p>
              <p className="faq-answer">EchoSpeak supports language learning to and from English, Spanish, Italian, Portuguese, French, German, Russian, Arabic, and Mandarin Chinese.</p>
            </div>
            <div className="faq-item">
              <p className="faq-question"> Is EchoSpeak free?</p>
              <p className="faq-answer">EchoSpeak launches with a free trial, followed by a subscription model based on learning time length and the number of languages selected.</p>
            </div>
          </div>

          <div className="faq-category">
            <h3>Language Learning with EchoSpeak</h3>
            <div className="faq-item">
              <p className="faq-question"> How does EchoSpeak make language learning fun?</p>
              <p className="faq-answer">The app uses engaging cartoon mascots, interactive stories, and a kid-friendly design. For retirees, it uses practical, real-life scenarios to make learning relevant and enjoyable.</p>
            </div>
            <div className="faq-item">
              <p className="faq-question"> What is voice recognition used for?</p>
              <p className="faq-answer">Voice recognition is integrated into interactive stories to help users practice speaking and receive feedback, enhancing pronunciation and fluency.</p>
            </div>
          </div>

          <div className="faq-category">
            <h3>About TPRS (Teaching Proficiency through Reading and Storytelling)</h3>
            <div className="faq-item">
              <p className="faq-question"> What is TPRS?</p>
              <p className="faq-answer">TPRS (Teaching Proficiency through Reading and Storytelling) is a language teaching method that focuses on acquiring language through comprehensible input, primarily by listening to and reading engaging stories. It emphasizes understanding meaning over memorizing grammar rules.</p>
            </div>
            <div className="faq-item">
              <p className="faq-question"> Why does EchoSpeak use TPRS?</p>
              <p className="faq-answer">TPRS is highly effective for rapid language acquisition because it provides a large amount of comprehensible input in a low-stress, engaging environment. This method naturally builds vocabulary and grammar understanding through context, making it fun and efficient for learners of all ages.</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
