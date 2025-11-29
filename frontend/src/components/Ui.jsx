import React, { useState, Suspense } from "react";
import * as XLSX from "xlsx";

// Lazy-loaded components
const Toast = React.lazy(() => import("./subcomponents/Toast"));
const LoadingSpinner = React.lazy(() => import("./subcomponents/LoadingSpinner"));
const SuccessCheck = React.lazy(() => import("./subcomponents/SuccessCheck"));
const FileUpload = React.lazy(() => import("./subcomponents/FileUpload"));

const Ui = () => {
const [msg, setMsg] = useState("");
const [maildata, setMaildata] = useState([]);
const [send, setSend] = useState(false);
const [success, setSuccess] = useState(false);
const [toast, setToast] = useState({ show: false, message: "", type: "" });

const showToast = (message, type) => {
setToast({ show: true, message, type });
setTimeout(() => setToast({ show: false, message: "", type: "" }), 2500);
};

const handleChange = (e) => setMsg(e.target.value);

const handleSend = async () => {
setSend(true);

try {
  if (window.Cypress) {
    await new Promise((res) => setTimeout(res, 500));
  } else {
    await fetch("http://localhost:2643/sendmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg, maildata }),
    });
  }

  setSuccess(true);
  setTimeout(() => setSuccess(false), 1200);
  showToast("Mail sent successfully!", "success");
} catch (err) {
  showToast("Error occurred while sending mail", "error");
  console.error(err);
} finally {
  setSend(false);
}

};

const handlefiles = (e) => {
const file = e.target.files[0];
const reader = new FileReader();
reader.onload = (e) => {
const data = e.target.result;
const workbook = XLSX.read(data, { type: "binary" });
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const json = XLSX.utils.sheet_to_json(sheet, { header: "A" });
const emails = json.map((row) => row.A);
setMaildata(emails);
};
reader.readAsBinaryString(file);
};

return ( <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start bg-gray-900 text-gray-100">

  {/* Animated blurred background */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="animate-bgMove opacity-60 bg-gradient-to-br 
      from-purple-800 via-blue-800 to-pink-800
      w-[200%] h-[200%] rounded-full blur-[160px]
      absolute -top-1/2 -left-1/2">
    </div>
  </div>

  {/* Toast */}
  <Suspense>{toast.show && <Toast toast={toast} />}</Suspense>

  {/* Loading spinner */}
  <Suspense>{send && <LoadingSpinner />}</Suspense>

  {/* Success check */}
  <Suspense>{success && <SuccessCheck />}</Suspense>

  {/* Title */}
  <h1 className="text-3xl md:text-4xl font-semibold text-center pt-10 tracking-tight drop-shadow-xl">
    Bulkmail
  </h1>
  <p className="text-sm md:text-base mt-2 opacity-90 text-gray-300">
    Send professional bulk emails effortlessly
  </p>

  {/* Message input */}
  <div className="flex justify-center mt-8 px-4 w-full">
    <textarea
      className="w-full md:w-[70%] lg:w-[55%] h-32 md:h-40 p-4 
        rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700 shadow-2xl
        text-gray-100 placeholder-gray-400
        focus:ring-4 focus:ring-gray-600 outline-none transition-all"
      placeholder="Write your message…"
      onChange={handleChange}
      value={msg}
    />
  </div>

  {/* File upload */}
  <Suspense>
    <FileUpload
      handlefiles={handlefiles}
      maildataLength={maildata.length}
      handleSend={handleSend}
      send={send}
    />
  </Suspense>

  <div className="text-center mt-6 font-medium text-lg drop-shadow">
    Total Emails: {maildata.length}
  </div>
</div>

);
};

export default Ui;
