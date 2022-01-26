import './App.css';
import io from 'socket.io-client'

// establish connection with socket io (front with back)

const socket = io.connect("http://localhost:3001")

function App() {
  return (
    <div className="App">
      <h3> Join a Chat</h3>
      <input type="text" placeholder="Type your username"/>
      <input type="text" placeholder="Room ID"/>
      <button>Join a Room</button>

    </div>
  );
}

export default App;
