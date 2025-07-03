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
export default function AtTheFarmStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🚜 Echo y Mike en la granja <span style={{ fontSize: '0.8em', color: '#0f766e' }}></span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Echo y Mike en la granja" onClick={() => speak('Eko y Mike en la granja', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
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
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike visitan una granja. Ven muchos animales.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike visit a farm. They see many animals.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué visitan Echo y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué visitan Eko y Mike?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What do Echo and Mike visit?</p>
            <p><span className="response-icon">🦜</span> Ellos visitan una granja.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Ellos visitan una granja.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They visit a farm.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/EyM_See_Animals.png"
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
            src="/images/EyM_Big_Barn.png"
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
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Hay un granero rojo. El granero es muy grande.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">There is a red barn. The barn is very big.</p>
          <div className="qa">
            <p>👨‍🏫 ¿De qué color es el granero?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿De qué color es el granero?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What color is the barn?</p>
            <p><span className="response-icon">🦜</span> El granero es rojo.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('El granero es rojo.', 'es-ES', 0.7)}>🔊</button>
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
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('El granjero tiene un tractor. El tractor es azul.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">The farmer has a tractor. The tractor is blue!</p>
          <div className="qa">
            <p>👨‍� ¿Qué tiene el granjero?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué tiene el granjero?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What does the farmer have?</p>
            <p><span className="response-icon">🦜</span> Él tiene un tractor.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Él tiene un tractor.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">He has a tractor.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/EyM_Blue_Tractor.png"
            alt="Echo and Mike looking at a blue tractor on the farm"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
      {/* Story Block 4: Seeing a cow */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/EyM_Cow.png"
            alt="Eko and Mike looking at a cow"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Ven una vaca grande. La vaca hace &quot;muuu&quot;.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Ven una vaca grande. La vaca hace "muuu".', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They see a big cow. The cow says &quot;moo.&quot;</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué animal ven?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué animal ven?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What animal do they see?</p>
            <p><span className="response-icon">🦜</span> Ven una vaca.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Ven una vaca.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They see a cow.</p>
          </div>
        </div>
      </div>

      {/*Story Block 5: Seeing a pig */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>También ven un cerdo rosado. El cerdo hace &quot;oinc oinc&quot;.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('También ven un cerdo rosado. El cerdo hace "oinc oinc".', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They also see a pink pig. The pig says &quot;oink oink&quot;.</p>
          <div className="qa">
            <p>👨‍🏫 ¿De qué color es el cerdo?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿De qué color es el cerdo?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What color is the pig?</p>
            <p><span className="response-icon">🦜</span> Es rosado.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Es rosado.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">It is pink.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/EyM_Pig.png"
            alt="Eko and Mike looking at a pink pig"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/*Story Block 6: Seeing a chicken */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/EyM_Chicken.png"
            alt="Echo and Mike looking at a chicken"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Ven una gallina. La gallina pone huevos.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Ven una gallina. La gallina pone huevos.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They see a chicken. The chicken lays eggs.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué hace la gallina?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué hace la gallina?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What does the chicken do?</p>
            <p><span className="response-icon">🦜</span> Pone huevos.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Pone huevos.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">It lays eggs.</p>
          </div>
        </div>
      </div>

         {/* Block 7: Seeing the garden */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>También ven un jardín con muchas verduras. ¡Qué rico!</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('También ven un jardín con muchas verduras. ¡Qué rico!', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They also see a garden with many vegetables. How delicious!</p>
          <div className="qa">
            <p>👨‍¿Qué hay en el jardín?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué hay en el jardín?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What is in the garden?</p>
            <p><span className="response-icon">🦜</span> Hay muchas verduras.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Hay muchas verduras.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">There are many vegetables.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/EyM_Garden.png"
            alt="Eko and Mike looking at a vegetable garden on the farm"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}
