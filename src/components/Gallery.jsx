import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Gallery = ({ onBack }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios en tiempo real (Realtime)
    const q = query(collection(db, "galeria"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const photosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPhotos(photosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', padding: '8px 16px' }}>⬅ Volver al AR</button>
      
      <h2 style={{ textAlign: 'center' }}>Galería de la Feria</h2>
      
      {loading ? <p>Cargando...</p> : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
          gap: '10px' 
        }}>
          {photos.map(photo => (
            <div key={photo.id} style={{ position: 'relative' }}>
              <a href={photo.url} target="_blank" rel="noopener noreferrer">
                <img 
                  src={photo.url} 
                  alt="Feria" 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} 
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;