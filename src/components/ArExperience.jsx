import React, { useState } from 'react';
import { storage, db } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ArExperience = ({ selectedAvatar, onGoToGallery, onBack }) => {
  const [uploading, setUploading] = useState(false);

  // ESTA FUNCIÓN SE ACTIVA APENAS EL USUARIO ELIGE LA FOTO
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // INICIO DE SUBIDA AUTOMÁTICA
    setUploading(true);
    try {
      const fileName = `feria_${Date.now()}.jpg`;
      const storageRef = ref(storage, `fotos_feria/${fileName}`);
      
      // 1. Subir
      await uploadBytes(storageRef, file);
      // 2. URL
      const url = await getDownloadURL(storageRef);
      // 3. Firestore (Guardamos qué avatar era también)
      await addDoc(collection(db, "galeria"), {
        url: url,
        avatar: selectedAvatar.name,
        createdAt: serverTimestamp()
      });

      alert("¡Foto guardada! 🚀");
      onGoToGallery(); 

    } catch (error) {
      console.error(error);
      alert("Error al subir. Intenta de nuevo.");
      setUploading(false); // Solo quitamos el loading si falla
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <button onClick={onBack} style={{ float: 'left', background: 'none', border: 'none', fontSize: '20px' }}>⬅</button>
      <h3>{selectedAvatar.name}</h3>
      
      {/* MODEL VIEWER DINÁMICO */}
      <div style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px', backgroundColor: 'white' }}>
        <model-viewer
          src={selectedAvatar.file} 
          alt={selectedAvatar.name}
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="fixed"
          render-scale="2"
          camera-controls
          shadow-intensity="1"
          style={{ width: '100%', height: '400px' }}
        >
            <button slot="ar-button" style={{
                backgroundColor: 'white', borderRadius: '20px', border: 'none', 
                position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                padding: '10px 20px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
            }}>
              📸 Ver en AR
            </button>
        </model-viewer>
      </div>

      <div style={{ backgroundColor: '#e9ecef', padding: '20px', borderRadius: '15px' }}>
        <p style={{marginBottom: '15px'}}>¿Ya te tomaste la foto?</p>
        
        {uploading ? (
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
                Subiendo foto... ⏳
            </div>
        ) : (
            <>
                <input 
                  type="file" 
                  accept="image/*" 
                  id="cameraInput" 
                  style={{ display: 'none' }} 
                  onChange={handleFileSelect} 
                />
                
                <button 
                  onClick={() => document.getElementById('cameraInput').click()}
                  style={{ 
                    padding: '15px 20px', 
                    fontSize: '18px', 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '50px', 
                    width: '100%', 
                    boxShadow: '0 4px 0 #218838'
                  }}
                >
                  📤 Subir foto recién tomada
                </button>
            </>
        )}
      </div>
    </div>
  );
};

export default ArExperience;