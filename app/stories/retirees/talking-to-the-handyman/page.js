// app/stories/retirees/talking-to-the-local-handyman/page.js
// This is the interactive story page for "Talking to the Local Handyman" for the Retiree Path
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
          console.log("Selected Spanish voice for handyman story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for handyman story, using default for 'es-ES'.");
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
export default function TalkingToTheHandymanStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🛠️ Echo y Mike hablan con el manitas local <span style={{ fontSize: '0.8em', color: '#0f766e' }}>(English ➡️ Spanish)</span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Eko y Mike hablan con el manitas local" onClick={() => speak('Eko y Mike hablan con el manitas local', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Learn how to describe household problems and arrange for repairs in Spanish.
      </p>

      {/* Story Block 1: Describing the problem */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike tienen un problema en casa. La tubería gotea.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike tienen un problema en casa. La tubería gotea.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike have a problem at home. The pipe is leaking.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué problema tienen?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué problema tienen?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What problem do they have?</p>
            <p><span className="response-icon">🧓</span> La tubería gotea.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('La tubería gotea.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">The pipe is leaking.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-handyman-arrival.png"
            alt="Echo and Mike looking at a leaking pipe"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Calling the handyman */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/retiree-handyman-fix.png"
            alt="Echo talking on the phone to a handyman"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Llaman al manitas local. Echo dice: &quot;Necesito un fontanero.&quot;</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Llaman al manitas local. Eko dice: "Necesito un fontanero."', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They call the local handyman. Echo says: &quot;I need a plumber.&quot;</p>
          <div className="qa">
            <p>👨‍🏫 ¿A quién llaman?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿A quién llaman?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">Who do they call?</p>
            <p><span className="response-icon">🧓</span> Llaman al manitas.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Llaman al manitas.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They call the handyman.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: Arranging payment */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>El manitas arregla la tubería. Mike pregunta: &quot;¿Cuánto le debo?&quot;</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('El manitas arregla la tubería. Mike pregunta: "¿Cuánto le debo?"', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">The handyman fixes the pipe. Mike asks: &quot;How much do I owe you?&quot;</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué arregla el manitas?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué arregla el manitas?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What does the handyman fix?</p>
            <p><span className="response-icon">🧓</span> Arregla la tubería.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Arregla la tubería.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They fix the pipe.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-handyman-payment.png"
            alt="Mike paying the handyman"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}
