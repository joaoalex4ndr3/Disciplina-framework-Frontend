import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "./hooks/useAuth";
import useAppStore from "./store/useAppStore";

// Pages
import Landing from "./pages/Landing";
import AuthModal from "./pages/AuthModal";
import Dashboard from "./pages/Dashboard";
import PersonasPage from "./pages/Personas";
import ChatPage from "./pages/Chat";
import PricingPage from "./pages/Pricing";
import SettingsPage from "./pages/Settings";

// Components
import BackgroundBlobs from "./components/Common/BackgroundBlobs";
import Sidebar from "./components/Common/Sidebar";

/**
 * MAIN APP COMPONENT
 * Root component orchestrating all pages and functionality
 */
function App() {
  const { user, login, signup, logout, isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = React.useState(null);

  // Store selectors
  const currentPage = useAppStore((state) => state.currentPage);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const personas = useAppStore((state) => state.personas);
  const selectedPersonaId = useAppStore((state) => state.selectedPersonaId);
  const setSelectedPersonaId = useAppStore(
    (state) => state.setSelectedPersonaId,
  );
  const updateUser = useAppStore((state) => state.updateUser);

  // Auth handlers
  const handleAuth = (mode) => setAuthMode(mode);

  const handleAuthSuccess = (userData) => {
    useAppStore.setState({ user: userData });
    setAuthMode(null);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage("dashboard");
  };

  const handleNavigateToChatWithPersona = (persona) => {
    setSelectedPersonaId(persona.id);
    setCurrentPage("chat");
  };

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  // Unauthenticated view
  if (!user) {
    return (
      <>
        <Landing onAuth={handleAuth} />
        <AnimatePresence>
          {authMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AuthModal
                mode={authMode}
                onClose={() => setAuthMode(null)}
                onSuccess={handleAuthSuccess}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Authenticated view
  return (
    <div className="flex h-screen overflow-hidden bg-bg relative">
      <BackgroundBlobs />

      {/* Sidebar */}
      <Sidebar
        page={currentPage}
        onPageChange={setCurrentPage}
        user={user}
        onLogout={handleLogout}
        personasCount={personas.length}
      />

      {/* Main Content */}
      <main
        className={`flex-1 overflow-hidden ${currentPage === "chat" ? "" : "overflow-y-auto"}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full"
          >
            {currentPage === "dashboard" && (
              <Dashboard
                user={user}
                personas={personas}
                onPageChange={setCurrentPage}
              />
            )}
            {currentPage === "personas" && (
              <PersonasPage onChat={handleNavigateToChatWithPersona} />
            )}
            {currentPage === "chat" && (
              <ChatPage
                personas={personas}
                activePersonaId={selectedPersonaId}
              />
            )}
            {currentPage === "pricing" && (
              <PricingPage
                user={user}
                onUpgrade={() => {
                  updateUser({ plan: "pro", msgLimit: 999999 });
                  setCurrentPage("dashboard");
                }}
              />
            )}
            {currentPage === "settings" && <SettingsPage />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
