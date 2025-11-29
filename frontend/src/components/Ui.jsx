import React, { useState, Suspense } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

// Lazy-load heavy UI parts
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

const handleSend = () => {
setSend(true);
axios.post("http://localhost:2643/sendmail", { msg, maildata })
.then((res) => {
setSuccess(true);
setTimeout(() => setSuccess(false), 1200);
showToast("Mail sent successfully!", "success");
console.log(res);

})
.catch((error) => {
showToast("Error occurred while sending mail", "error");
console.log(error);
})
.finally(() => setSend(false));
};

const handlefiles = (e) => {
const file = e.target.files[0];
const reader = new FileReader();
reader.onload = (e) => {
const data = e.target.result;
const workbook = XLSX.read(data, { type: "binary" });
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const maildata = XLSX.utils.sheet_to_json(sheet, { header: "A" });
const Totalemails = maildata.map((e) => e.A);
setMaildata(Totalemails);
};
reader.readAsBinaryString(file);
};

return ( <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start">

```
  {/* 🔥 ANIMATED BLURRED BACKGROUND */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="animate-bgMove opacity-60 bg-gradient-to-br 
      from-purple-500 via-blue-500 to-pink-500 
      w-[200%] h-[200%] rounded-full blur-[160px]
      absolute -top-1/2 -left-1/2">
    </div>
  </div>

  {/* Lazy-loaded Toast */}
  <Suspense>{toast.show && <Toast toast={toast} />}</Suspense>

  {/* Lazy-loaded Loading Spinner */}
  <Suspense>{send && <LoadingSpinner />}</Suspense>

  {/* Lazy-loaded Success Checkmark */}
  <Suspense>{success && <SuccessCheck />}</Suspense>

  {/* TITLE */}
  <h1 className="text-3xl md:text-4xl font-semibold text-center pt-10 text-gray-50 tracking-tight drop-shadow-xl">
    Bulkmail
  </h1>
  <p className="text-sm md:text-base text-gray-200 mt-2 opacity-90">
    Send professional bulk emails effortlessly
  </p>

  {/* MESSAGE INPUT */}
  <div className="flex justify-center mt-8 px-4 w-full">
    <textarea
      className="w-full md:w-[70%] lg:w-[55%] h-32 md:h-40 p-4 
        rounded-2xl bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl
        text-black placeholder-gray-500
        focus:ring-4 focus:ring-white/40 outline-none transition-all"
      placeholder="Write your message…"
      onChange={handleChange}
      value={msg}
    />
  </div>

  {/* Lazy-loaded File Upload Box */}
  <Suspense>
    <FileUpload handlefiles={handlefiles} maildataLength={maildata.length} handleSend={handleSend} send={send} />
  </Suspense>

  <div className="text-center mt-6 text-white font-medium text-lg drop-shadow">
    Total Emails: {maildata.length}
  </div>
</div>

);
};

export default Ui;
