import React, { useState } from 'react';
import ArExperience from './components/ArExperience';
import Gallery from './components/Gallery';

function App() {
  const [view, setView] = useState('ar'); // 'ar' o 'gallery'

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ backgroundColor: '#222', color: 'white', padding: '15px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem' }}>Rumiñahui AR Experience</h1>
      </header>

      <main>
        {view === 'ar' ? (
          <>
            <ArExperience onGoToGallery={() => setView('gallery')} />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={() => setView('gallery')} style={{ background: 'transparent', border: '1px solid #333', padding: '10px', borderRadius: '5px' }}>
                    Ver Galería Pública
                </button>
            </div>
          </>
        ) : (
          <Gallery onBack={() => setView('ar')} />
        )}
      </main>
    </div>
  );
}

export default App;