import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import CustomOutlet from "./components/CustomOutlet";
import LoginPage from "./pages/LoginPage";
import SafeRoute from "./components/SafeRoute";
import ConversationDetails from "./components/Conversation/ConversationDetails";
import ConversationStartPage from "./pages/ConversationStartPage";
import { useDeleteModal } from "./hooks/useDeleteModal";
import DeleteWarningModal from "./components/modals/DeleteWarningModal";
import { useSearchModal } from "./hooks/useSearchModal";
import SearchModal from "./components/modals/SearchModal";
function App() {
  const { isOpen } = useDeleteModal();
  const { isOpen: searchIsOpen } = useSearchModal();

  return (
    <>
      <Routes>
        <Route
          element={
            <SafeRoute>
              <CustomOutlet />
            </SafeRoute>
          }
        >
          <Route path="/" element={<ConversationStartPage />} />
          <Route path="/c/:id" element={<ConversationDetails />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <div className="">{isOpen && <DeleteWarningModal />}</div>
      <div>{searchIsOpen && <SearchModal />}</div>
    </>
  );
}

export default App;
