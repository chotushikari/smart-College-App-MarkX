// 📍 components/CSVUploadTab.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CSVUploadTab = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a CSV file");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/upload-users", formData);
      toast.success("CSV uploaded successfully 🚀");
      setFile(null);
    } catch (err) {
      toast.error("Upload failed ❌ " + err.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div className="space-y-4">
      <label className="font-semibold text-lg">Upload .CSV File</label>
      <input
        type="file"
        accept=".csv"
        onChange={e => setFile(e.target.files[0])}
        className="border rounded p-2 w-full"
      />
      <button
        onClick={handleUpload}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded transition"
      >
        Upload File
      </button>
    </div>
  );
};

export default CSVUploadTab;
