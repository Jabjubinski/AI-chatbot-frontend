import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import CustomOutlet from "./components/CustomOutlet";
import LoginPage from "./pages/LoginPage";
import SafeRoute from "./components/SafeRoute";
import ConversationDetails from "./components/Conversation/ConversationDetails";
import ConversationStartPage from "./pages/ConversationStartPage";
import { useDeleteModal } from "./hooks/useDeleteModal";
import DeleteWarningModal from "./components/modals/DeleteWarningModal";
import SearchConversationsPage from "./pages/SearchConversationsPage";
import FeedPage from "./pages/FeedPage";
import Chat from "./components/Chat/Chat";

function App() {
  const { isOpen } = useDeleteModal();

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
          <Route path="/" element={<FeedPage />} />
          <Route path="/cs" element={<ConversationStartPage />} />
          <Route path="/c/:id" element={<ConversationDetails />} />
          <Route path="/c/search" element={<SearchConversationsPage />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <div className="">{isOpen && <DeleteWarningModal />}</div>
    </>
  );
}

export default App;
