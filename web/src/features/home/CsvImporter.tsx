import axios from "axios";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";

import { getAuthToken } from "../../shared/helpers/general-helper";

export const CsvImporter: FC = () => {
  const [chooseFile, setChooseFile] = useState<any>();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChooseFile(e.target.files?.[0]);
  };

  // Handle CSV data submission to the backend API
  const handleUpload = async () => {
    console.log(chooseFile);
    try {
      const importResponse = await axios.post(
        "/api/bookmarks/import",
        {
          file: chooseFile,
        },
        {
          timeout: 300000,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      if (importResponse?.data?.message) {
        toast(importResponse?.data?.message);
      }
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };

  return (
    <div className="file-upload-component bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Upload and Bookmark GitHub Repositories
      </h2>

      <div className="flex items-center justify-between space-x-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          disabled={!chooseFile}
        >
          Upload
        </button>
      </div>
    </div>
  );
};
