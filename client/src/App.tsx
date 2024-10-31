import './App.css';
import { Route, Routes } from "react-router-dom";
import FileUpload from './pages/fileupload/FileUpload';
function App() {
  return (
      <Routes>
        <Route path='/' element={<FileUpload />}></Route>
      </Routes>
  );
}

export default App;
