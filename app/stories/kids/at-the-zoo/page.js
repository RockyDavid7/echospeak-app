// app/stories/kids/at-the-zoo/page.js
// This is the interactive story page for "At the Zoo" for the Kid's Path
"use client"; // This directive marks this as a Client Component

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Re-import the speak function and voice loading logic (copied for self-containment)
let spanishVoice = null;
let voicesLoadedPromise = null;

function loadAndSelectVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  if (!voicesLoadedPromise) {
    voicesLoadedPromise = new Promise(resolve => {
      const setSpanishVoice = () => {
        const voices = speechSynthesis.getVoices();
        spanishVoice = voices.find(voice =>
          voice.lang.startsWith('es') && (
            voice.name.includes('Google español') ||
            voice.name.includes('Microsoft David Mobile - Spanish (Mexico)') ||
            voice.name.includes('Microsoft Laura Mobile - Spanish (Spain)') ||
            voice.name.includes('español') ||
            voice.name.toLowerCase().includes('spanish')
          )
        );
        if (!spanishVoice) {
          spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
        }
        if (spanishVoice) {
          console.log("Selected Spanish voice for zoo story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for zoo story, using default for 'es-ES'.");
        }
        resolve();
      };
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = setSpanishVoice;
      }
      if (speechSynthesis.getVoices().length > 0) {
        setSpanishVoice();
      }
    });
  }
}
if (typeof window !== 'undefined') {
  loadAndSelectVoice();
}

// Speak function with optional rate control
async function speak(text, lang = 'es-ES', rate = 0.7) {
  if (!('speechSynthesis' in window)) {
    console.error('Web Speech API is not supported in this browser.');
    return;
  }
  if (voicesLoadedPromise) {
    await voicesLoadedPromise; // Ensure voices are loaded before attempting to speak
  }
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }
  utterance.rate = rate;
  utterance.onend = function(event) {
    console.log('Speech finished for:', text);
  };
  utterance.onerror = function(event) {
    console.error('Speech synthesis error:', event.error, '(Utterance event error)');
  };
  try {
    speechSynthesis.speak(utterance);
    console.log(`Attempting to speak: "${text}" with voice "${utterance.voice ? utterance.voice.name : 'default'}" in ${utterance.lang} at rate ${utterance.rate}`);
  } catch (e) {
    console.error('Error calling speechSynthesis.speak():', e);
  }
}

// Main component for the story page
export default function AtTheZooStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🦁 Echo y Mike en el zoológico <span style={{ fontSize: '0.8em', color: '#0f766e' }}></span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Echo y Mike en el zoológico" onClick={() => speak('Eko y Mike en el zoológico', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Explore the animal kingdom with Echo and Mike and learn animal names in Spanish!
      </p>

      {/* Story Block 1: Arrival at the zoo */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike visitan el zoológico. El zoológico es grande.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike visitan el zoológico. El zoológico es grande.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike visit the zoo. The zoo is big.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué visitan Echo y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué visitan Eko y Mike?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What do Echo and Mike visit?</p>
            <p><span className="response-icon">🦜</span> Ellos visitan el zoológico.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Ellos visitan el zoológico.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They visit the zoo.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/Kid_Zoo/EyM_Enter_Zoo.png"
            alt="Echo and Mike at the entrance of a zoo"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Seeing a lion */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/Kid_Zoo/EyM_Zoo_Lion.png"
            alt="Echo and Mike looking at a lion in its enclosure"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Ven un león. El león es grande y ruge.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Ven un león. El león es grande y ruge.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They see a lion. The lion is big and roars.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué ven primero?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué ven primero?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What do they see first?</p>
            <p><span className="response-icon">🦜</span> Ven un león.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Ven un león.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They see a lion.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: Seeing monkeys */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>También ven monos. Los monos son pequeños y saltan.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('También ven monos. Los monos son pequeños y saltan.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They also see monkeys. The monkeys are small and jump.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Cómo son los monos?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Cómo son los monos?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What are the monkeys like?</p>
            <p><span className="response-icon">🦜</span> Son pequeños y saltan.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Son pequeños y saltan.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They are small and jump.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/Kid_Zoo/EyM_Zoo_Monkeys.png"
            alt="Echo and Mike watching monkeys jumping"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}
