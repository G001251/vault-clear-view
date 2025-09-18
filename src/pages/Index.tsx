import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { IntroPage } from "@/components/IntroPage";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleGetStarted = () => {
    setShowDashboard(true);
  };

  if (showDashboard) {
    return <Dashboard />;
  }

  return <IntroPage onGetStarted={handleGetStarted} />;
};

export default Index;
