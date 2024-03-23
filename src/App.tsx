import { ToastContainer } from "react-toastify";
import { StickyNavbar } from "./Game";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <StickyNavbar></StickyNavbar>
    </>
  );
}

export default App;
