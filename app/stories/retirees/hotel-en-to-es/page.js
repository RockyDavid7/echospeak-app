// app/stories/retirees/hotel-en-to-es/page.js
"use client"; // This directive marks this as a Client Component

import { useState, useEffect } from 'react'; // React hooks for state and side effects
import Image from 'next/image'; // For optimized image loading

// Re-import the speak function and voice loading logic (from a centralized helper if refactored)
// For now, copied to ensure self-contained functionality
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
          console.log("Selected Spanish voice for hotel story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for hotel story, using default for 'es-ES'.");
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
export default function HotelStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🏨 En el Hotel <span style={{ fontSize: '0.8em', color: '#0f766e' }}>(English ➡️ Spanish)</span>
        {isClient && (
          <button aria-label="Reproducir audio del título: En el Hotel" onClick={() => speak('En el Hotel', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Check in, ask for services, and talk to hotel staff in Spanish.
      </p>

      {/* Story Block 1: Arrival at the hotel */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Miguel llegan al Hotel Palacio. Están cansados del viaje.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Miguel llegan al Hotel Palacio. Están cansados del viaje.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Miguel arrive at the Palace Hotel. They are tired from the trip.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Quiénes llegan al hotel?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Quiénes llegan al hotel?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">Who arrives at the hotel?</p>
            <p><span className="response-icon">🧓</span> Echo y Miguel llegan al hotel.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Eko y Miguel llegan al hotel.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">Echo and Miguel arrive at the hotel.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/Ret_Hotel_Arrival.png"
            alt="Echo and Mike arriving at a grand hotel"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: At the reception desk */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/Ret_Hotel_Recept.png"
            alt="Echo and Mike checking in at a hotel reception desk"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Hablan con la amable recepcionista en el mostrador. La recepcionista sonríe.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Hablan con la amable recepcionista en el mostrador. La recepcionista sonríe.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They speak with the kind receptionist at the counter. The receptionist smiles.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Con quién hablan?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Con quién hablan?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">Who do they speak with?</p>
            <p><span className="response-icon">🧓</span> Hablan con la recepcionista.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Hablan con la recepcionista.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They speak with the receptionist.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: The room key */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>La recepcionista les da la tarjeta-llave de su habitación. Es la habitación 305.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('La recepcionista les da la tarjeta-llave de su habitación. Es la habitación 305.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">The receptionist gives them their room key card. It&apos;s room 305.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué les da la recepcionista?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué les da la recepcionista?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What does the receptionist give them?</p>
            <p><span className="response-icon">🧓</span> Les da la tarjeta-llave.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Les da la tarjeta-llave.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">She gives them the key card.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/Ret_Hotel_Key.png"
            alt="A hand holding a hotel room key card"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 4: Bellhop Help with luggage */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/Ret_Hotel_Bellhop.png"
            alt="A bellhop pushing a luggage cart"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Un botones les ayuda con sus maletas. Las maletas son muy grandes.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Un botones les ayuda con sus maletas. Las maletas son muy grandes.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">A bellhop helps them with their suitcases. The suitcases are very big.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Quién les ayuda con las maletas?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Quién les ayuda con las maletas?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">Who helps them with the suitcases?</p>
            <p><span className="response-icon">🧓</span> Un botones les ayuda.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Un botones les ayuda.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">A bellhop helps them.</p>
          </div>
        </div>
      </div>

      {/* Story Block 5: The Room */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Entran en su habitación. Es espaciosa y tiene un balcón con vistas al mar.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Entran en su habitación. Es espaciosa y tiene un balcón con vistas al mar.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They enter their room. It is spacious and has a balcony with a sea view.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Cómo es la habitación?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Cómo es la habitación?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What is the room like?</p>
            <p><span className="response-icon">🧓</span> La habitación es espaciosa y tiene un balcón.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('La habitación es espaciosa y tiene un balcón.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">The room is spacious and has a balcony.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/Ret_Hotel_Seaview.png"
            alt="A spacious hotel room with a balcony overlooking the sea"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 6: The hotel restaurant */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/Ret_Hotel_Rest.png"
            alt="A sign pointing to a hotel restaurant"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Echo pregunta: &quot;¿Dónde está el restaurante, por favor?&quot;</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko pregunta: ¿Dónde está el restaurante, por favor?', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo asks: &quot;Where is the restaurant, please?&quot;</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué pregunta Echo?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué pregunta Eko?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What does Echo ask?</p>
            <p><span className="response-icon">🧓</span> Pregunta dónde está el restaurante.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Pregunta dónde está el restaurante.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">She asks where the restaurant is.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
