import React, { useState } from 'react';
import AvatarMenu from './components/AvatarMenu';
import ArExperience from './components/ArExperience';
import Gallery from './components/Gallery';

function App() {
  const [view, setView] = useState('menu'); // 'menu', 'ar', 'gallery'
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Navegación
  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    setView('ar');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* Header Fijo */}
      <header style={{ backgroundColor: '#343a40', color: 'white', padding: '15px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem' }}>RumiAR Experience</h1>
      </header>

      <main>
        {view === 'menu' && (
          <>
            <AvatarMenu onSelectAvatar={handleSelectAvatar} />
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <button onClick={() => setView('gallery')} style={{ textDecoration: 'underline', background: 'none', border: 'none', color: '#666' }}>
                    Ver Galería Pública
                </button>
            </div>
          </>
        )}

        {view === 'ar' && selectedAvatar && (
          <ArExperience 
            selectedAvatar={selectedAvatar} 
            onGoToGallery={() => setView('gallery')} 
            onBack={() => setView('menu')}
          />
        )}

        {view === 'gallery' && (
          <Gallery onBack={() => setView('menu')} />
        )}
      </main>
    </div>
  );
}

export default App;