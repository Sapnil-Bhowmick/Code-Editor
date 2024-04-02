
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/Homepage/HomePage';
import EditorPage from './pages/Editorpage/EditorPage';



function App() {
  return (
    <>

      <div>
        <Toaster
          position='top-right'
          toastOptions={{

            success: {

              theme: {

                primary: '#4aee88'

              },

            },

          }}
        >

        </Toaster>
      </div>


      <BrowserRouter>

        <Routes>

          <Route path='/' element={<HomePage />}> </Route>
          <Route
            path='/editor/:roomId'
            element={<EditorPage />}>
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
