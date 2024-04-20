import { ToastContainer } from "react-toastify";
import { Game } from "./Game";
import 'react-toastify/dist/ReactToastify.css';
import Characters from './Characters';
import { Footer } from './Footer';
function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <Game></Game>
      <div >
          <Characters></Characters>
        </div>
          <Footer></Footer>
    </>
  );
}

export default App;
