import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // use states
  const [nests, setNests] = useState([])
  const [listening, setListening] = useState(false)

  // use effect
  useEffect( ()=> {
    const events = new EventSource('http://localhost:4000/events');
    events.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      setNests((nests)=> nests.concat(parsedData))
    };
    setListening(true);
  }, [listening, nests])

  return (
    <div className="App">
      <table className="stat-stable">
        <thead>
          <tr>
            <th>Momma</th>
            <th>Eggs</th>
            <th>Tempreature</th>
          </tr>
        </thead>
        <tbody>
          {
            nests.map((nest, i) =>
              <tr key={i}>
                <td>{nest.momma}</td>
                <td>{nest.eggs}</td>
                <td>{nest.temperature}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
