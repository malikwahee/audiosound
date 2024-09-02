import React, { useState } from 'react';

const Main = () => {
  const [transcript, setTranscript] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('audio', file);

      try {
        const response = await fetch('/transcribe', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setTranscript(data.transcript);
      } catch (error) {
        console.error('Error transcribing audio:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload and Transcribe</button>
      <div>
        <h2>Transcript:</h2>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default Main;
