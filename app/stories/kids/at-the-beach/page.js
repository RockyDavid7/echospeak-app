// app/stories/kids/at-the-beach/page.js
// This is the interactive story page for "At the Beach" for the Kid's Path
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
          console.log("Selected Spanish voice for beach story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for beach story, using default for 'es-ES'.");
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
export default function AtTheBeachStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🏖️ Echo y Mike en la playa <span style={{ fontSize: '0.8em', color: '#0f766e' }}></span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Echo y Mike en la playa" onClick={() => speak('Eko y Mike en la playa', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Splash around with Echo and Mike and learn about beach activities and sea animals in Spanish.
      </p>

      {/* Story Block 1: Arrival at the beach */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike van a la playa. El sol es brillante.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike van a la playa. El sol es brillante.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike go to the beach. The sun is bright.</p>
          <div className="qa">
            <p>👨‍🏫 ¿A dónde van Echo y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿A dónde van Echo y Mike?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">Where do Echo and Mike go?</p>
            <p><span className="response-icon">🦜</span> Ellos van a la playa.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Ellos van a la playa.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They go to the beach.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/EyM_Arrive_Beach.png"
            alt="Echo and Mike arriving at a sunny beach"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Seeing a crab */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/EyM_Red_Crab.png"
            alt="Echo and Mike looking at a small crab on the sand"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>En la arena, ven un cangrejo. El cangrejo es rojo.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('En la arena, ven un cangrejo. El cangrejo es rojo.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">On the sand, they see a crab. The crab is red.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué ven en la arena?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué ven en la arena?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What do they see on the sand?</p>
            <p><span className="response-icon">🦜</span> Ven un cangrejo.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Ven un cangrejo.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They see a crab.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: Swimming in the ocean */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike nadan en el mar. El agua es azul.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Echo y Mike nadan en el mar. El agua es azul.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike swim in the sea. The water is blue.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Dónde nadan?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Dónde nadan?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">Where do they swim?</p>
            <p><span className="response-icon">🦜</span> Nadan en el mar.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Nadan en el mar.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They swim in the sea.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/EyM_Swimming.png"
            alt="Echo and Mike swimming in the blue ocean"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>{/* UPDATED Story Block 4: Swimming with a dolphin */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/EyM_Dolphin.png"
            alt="Echo and Mike swimming with a playful dolphin"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Echo y Mike nadan con un delfín. El delfín es muy amigable.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike nadan con un delfín. El delfín es muy amigable.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Eko and Mike swim with a dolphin. The dolphin is very friendly.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Con quién nadan?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Con quién nadan?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">Who do they swim with?</p>
            <p><span className="response-icon">🦜</span> Nadan con un delfín.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Nadan con un delfín.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They swim with a dolphin.</p>
          </div>
        </div>
      </div>

      {/* UPDATED Story Block 5: Playing with a sea turtle */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>También juegan con una tortuga marina. La tortuga es lenta y divertida.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('También juegan con una tortuga marina. La tortuga es lenta y divertida.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They also play with a sea turtle. The turtle is slow and fun.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Con qué animal juegan?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Con qué animal juegan?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What animal do they play with?</p>
            <p><span className="response-icon">🦜</span> Juegan con una tortuga marina.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Juegan con una tortuga marina.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They play with a sea turtle.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/EyM_SeaTurtle.png"
            alt="Eko and Mike playing with a sea turtle"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}

