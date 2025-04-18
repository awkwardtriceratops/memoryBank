import { useState } from 'react';

function App() {
  const [note, setNote] = useState('');
  const [mentalScore, setMentalScore] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();  // prevent page reload :contentReference[oaicite:10]{index=10}

    const payload = { "note": note, "mentalScore": mentalScore };  // payload to send to Flask endpoint :contentReference[oaicite:11]{index=11}

    const res = await fetch('https://flaskmemoryhandler-1c69fbba4651.herokuapp.com/api/add', {   // POST to Flask endpoint :contentReference[oaicite:11]{index=11}
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // make the bodyt the payload json
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      //add text box to show success message
      document.getElementById('messageholder').innerText = 'Entry added successfully! This is the time it was added: '+new Date().toLocaleString(); // show timestamp
      setNote('');
      setMentalScore('');
    } else {
      alert('Error adding entry');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Add Memory</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Note:<br/>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mental Score:<br/>
            <input
              type="number"
              step="0.1"
              value={mentalScore}
              onChange={e => setMentalScore(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p id='messageholder'></p>
    </div>
  );
}

export default App;
