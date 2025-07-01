// app/stories/kids/at-the-farm/page.js
// This is the interactive story page for "At the Farm" for the Kid's Path
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
          console.log("Selected Spanish voice for farm story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for farm story, using default for 'es-ES'.");
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
export default function AtTheFarmStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🚜 Echo y Mike en la granja <span style={{ fontSize: '0.8em', color: '#0f766e' }}>(English ➡️ Spanish)</span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Echo y Mike en la granja" onClick={() => speak('Echo y Mike en la granja', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Join Echo and Mike on an exciting trip to the farm and learn about farm animals!
      </p>

      {/* Story Block 1: Seeing animals */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike visitan una granja. Ven muchos animales.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Echo y Mike visitan una granja. Ven muchos animales.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike visit a farm. They see many animals.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué visitan Echo y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué visitan Echo y Mike?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What do Echo and Mike visit?</p>
            <p><span className="response-icon">🦜</span> Ellos visitan una granja.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Ellos visitan una granja.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They visit a farm.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/kid-farm-animals.png"
            alt="Echo and Mike looking at farm animals"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Seeing a big red barn */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/kid-farm-barn.png"
            alt="Echo and Mike standing in front of a big red barn"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Hay un granero rojo. El granero es muy grande.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Hay un granero rojo. El granero es muy grande.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">There is a red barn. The barn is very big.</p>
          <div className="qa">
            <p>👨‍🏫 ¿De qué color es el granero?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿De qué color es el granero?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What color is the barn?</p>
            <p><span className="response-icon">🦜</span> El granero es rojo.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('El granero es rojo.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">The barn is red.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: Seeing a tractor */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>El granjero tiene un tractor. ¡El tractor es azul!</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('El granjero tiene un tractor. El tractor es azul.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">The farmer has a tractor. The tractor is blue!</p>
          <div className="qa">
            <p>👨‍� ¿Qué tiene el granjero?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué tiene el granjero?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What does the farmer have?</p>
            <p><span className="response-icon">🦜</span> Él tiene un tractor.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Él tiene un tractor.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">He has a tractor.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/kid-farm-tractor.png"
            alt="Echo and Mike looking at a blue tractor on the farm"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}