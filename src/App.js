import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import { LogginForm } from './components/LogginInForm';
import { SigupForm } from './components/SigUpForm';
import ProtectedRoute from './Services/ProtectedRoutes';
import { GlobalStyle } from './GlobalStyle';



function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
<Routes>
<Route  path="/" element={<LogginForm/>}/>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;


