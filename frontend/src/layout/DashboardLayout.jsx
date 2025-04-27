import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "./Header";
import { motion } from "framer-motion";

const DashboardLayout = ({ children, role, email }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <Header role={role} email={email} />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
