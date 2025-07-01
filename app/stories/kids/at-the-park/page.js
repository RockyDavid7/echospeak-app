// app/stories/kids/at-the-park/page.js
// This is the interactive story page for "At the Park" for the Kid's Path
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
          console.log("Selected Spanish voice for park story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for park story, using default for 'es-ES'.");
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
async function speak(text, lang = 'es-ES', rate = 0.8) {
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
export default function AtTheParkStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🌳 Echo y Mike en el parque <span style={{ fontSize: '0.8em', color: '#0f766e' }}>(English ➡️ Spanish)</span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Echo y Mike en el parque" onClick={() => speak('Eko y Mike en el parque', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Play with Echo and Mike at the park and discover new words related to nature and games.
      </p>

      {/* Story Block 1: Arrival at the park */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike van al parque. El parque es grande.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike van al parque. El parque es grande.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike go to the park. The park is big.</p>
          <div className="qa">
            <p>👨‍🏫 ¿A dónde van Echo y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿A dónde van Eko y Mike?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">Where do Echo and Mike go?</p>
            <p><span className="response-icon">🦜</span> Ellos van al parque.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Ellos van al parque.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They go to the park.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/kid-park-arrival.png"
            alt="Echo and Mike arriving at a large park"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Seeing a tree and a flower */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/kid-park-tree-flower.png"
            alt="Echo and Mike looking at a tree and a red flower"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>En el parque, hay un árbol. Hay una flor roja.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('En el parque, hay un árbol. Hay una flor roja.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">In the park, there is a tree. There is a red flower.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué hay en el parque?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué hay en el parque?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What is in the park?</p>
            <p><span className="response-icon">🦜</span> Hay un árbol y una flor.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Hay un árbol y una flor.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">There is a tree and a flower.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: Playing with a ball */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike juegan con una pelota. ¡Están muy contentos!</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike juegan con una pelota. Están muy contentos.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike play with a ball. They are very happy!</p>
          <div className="qa">
            <p>👨‍🏫 ¿Con qué juegan?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Con qué juegan?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What do they play with?</p>
            <p><span className="response-icon">🦜</span> Juegan con una pelota.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Juegan con una pelota.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They play with a ball.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/kid-park-playing.png"
            alt="Echo and Mike playing with a ball in the park"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}
