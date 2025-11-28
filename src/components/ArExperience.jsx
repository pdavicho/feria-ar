import React, { useState } from 'react';
import { storage, db } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ArExperience = ({ onGoToGallery }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  // Manejar selección de foto
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Manejar subida a Firebase
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const fileName = `feria_${Date.now()}.jpg`;
      const storageRef = ref(storage, `fotos_feria/${fileName}`);
      
      // 1. Subir imagen
      await uploadBytes(storageRef, file);
      // 2. Obtener URL
      const url = await getDownloadURL(storageRef);
      // 3. Guardar en Base de Datos
      await addDoc(collection(db, "galeria"), {
        url: url,
        createdAt: serverTimestamp()
      });

      alert("¡Foto subida con éxito!");
      setFile(null);
      setPreview(null);
      onGoToGallery(); // Ir a la galería automáticamente
    } catch (error) {
      console.error(error);
      alert("Error al subir");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>📸 Zona de Experiencia AR</h2>
      
      {/* COMPONENTE MODEL-VIEWER */}
      {/* Asegúrate de poner tu archivo .glb en la carpeta 'public' del proyecto */}
      <div style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
        <model-viewer
          src="/avatarCaricatura.glb" 
          ios-src="/avatar.usdz"
          alt="Avatar Rumiñahui"
          ar
          ar-modes="scene-viewer webxr quick-look"
          camera-controls
          shadow-intensity="1"
          style={{ width: '100%', height: '400px' }}
        >
            <button slot="ar-button" style={{
                backgroundColor: 'white', borderRadius: '4px', border: 'none', 
                position: 'absolute', top: '16px', right: '16px', padding: '10px', fontWeight: 'bold'
            }}>
              👋 Ver en tu espacio
            </button>
        </model-viewer>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
        <h3>Pasos:</h3>
        <ol style={{ textAlign: 'left' }}>
            <li>Toca el botón <strong>"Ver en tu espacio"</strong>.</li>
            <li>Acomoda el avatar y toma la foto con tu celular.</li>
            <li>Vuelve aquí y sube esa foto.</li>
        </ol>

        <input 
          type="file" 
          accept="image/*" 
          id="fileInput" 
          style={{ display: 'none' }} 
          onChange={handleFileChange} 
        />
        
        <button 
          onClick={() => document.getElementById('fileInput').click()}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', width: '100%', marginBottom: '10px' }}
        >
          📂 Seleccionar Foto
        </button>

        {preview && (
          <div>
            <img src={preview} alt="Previsualización" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', margin: '10px 0' }} />
            <br/>
            <button 
              onClick={handleUpload}
              disabled={uploading}
              style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              {uploading ? 'Subiendo...' : '🚀 Publicar en Galería'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArExperience;