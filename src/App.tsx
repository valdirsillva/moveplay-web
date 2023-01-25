
import { AuthProvider } from './contexts/auth';
import './global.module.css'
import { Router } from './router/router';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router />
      </div>
    </AuthProvider>

  );
}

export default App;
