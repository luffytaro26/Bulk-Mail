import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const Ui = () => {
    const [msg, setMsg] = useState("");
    const [maildata, setMaildata] = useState([]);
    const [send, setSend] = useState(false);
    const [success, setSuccess] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "" }); // styled toast state
    // Function to show styled toast notifications
    const showToast = (message, type) => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 2500);
    };

    const handleChange = (e) => setMsg(e.target.value);

   const handleSend = () => {
    setSend(true);

    axios.post("http://localhost:2643/sendmail", {
        msg,
        maildata,
    })
    .then((res) => {
        console.log(res.data);

        setSuccess(true);
        setTimeout(() => setSuccess(false), 1200);
        showToast("Mail sent successfully!", "success");
    })
    .catch((error) => {
        showToast("Error occurred while sending mail", "error");
        console.log(error);
    })
    .finally(() => {
        setSend(false);
    });
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

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start">

            {/* 🔥 ANIMATED BLURRED BACKGROUND */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="animate-bgMove opacity-60 bg-gradient-to-br 
                    from-purple-500 via-blue-500 to-pink-500 
                    w-[200%] h-[200%] rounded-full blur-[160px]
                    absolute -top-1/2 -left-1/2">
                </div>
            </div>

            {/* TOAST */}
            {toast.show && (
                <div
                    className={`fixed top-6 right-6 z-[999] px-5 py-3 rounded-2xl shadow-xl backdrop-blur-xl text-white
                    animate-slideToast
                    ${toast.type === "success" ? "bg-green-600/80" : "bg-red-600/80"}`}
                >
                    {toast.message}
                </div>
            )}

            {/* LOADING SPINNER */}
            {send && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="animate-bounceIn">
                        <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                    </div>
                </div>
            )}

            {/* SUCCESS CHECKMARK */}
            {success && (
                <div className="fixed inset-0 flex justify-center items-center z-50 animate-fadeIn">
                    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-full shadow-xl animate-checkPop">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-14 h-14 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            )}

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
                ></textarea>
            </div>

            {/* FILE UPLOAD BOX */}
            <div className="mx-auto w-[90%] md:w-[60%] lg:w-[40%] mt-10 p-10 
                rounded-3xl border border-white/30 bg-white/20 backdrop-blur-xl
                shadow-xl flex flex-col items-center justify-center gap-3 
                hover:shadow-2xl transition-all">
                
                <p className="text-white font-medium mb-2 drop-shadow">Upload Excel file</p>
                <input type="file" onChange={handlefiles} className="text-white" />
            </div>

            <div className="text-center mt-6 text-white font-medium text-lg drop-shadow">
                Total Emails: {maildata.length}
            </div>

            {/* BUTTON */}
            <div className="text-center mt-8 pb-20">
                <button
                    className="bg-white/90 text-black py-3 px-8 rounded-full shadow-xl 
                    hover:bg-white active:scale-95 backdrop-blur-xl transition-all"
                    onClick={handleSend}
                    disabled={maildata.length === 0}
                >
                    {send ? "Sending..." : "Send Email"}
                </button>
            </div>
        </div>
    );
};

export default Ui;
