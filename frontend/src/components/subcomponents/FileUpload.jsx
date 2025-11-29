import React from "react";

const FileUpload = ({ handlefiles, maildataLength, handleSend, send }) => {
return ( <div className="mx-auto w-[90%] md:w-[60%] lg:w-[40%] mt-10 p-10 
   rounded-3xl border border-white/30 bg-white/20 backdrop-blur-xl
   shadow-xl flex flex-col items-center justify-center gap-3 
   hover:shadow-2xl transition-all">

```
  <p className="text-white font-medium mb-2 drop-shadow">Upload Excel file</p>
  <input type="file" onChange={handlefiles} className="text-white" />

  <div className="text-center mt-8">
    <button
      className="bg-white/90 text-black py-3 px-8 rounded-full shadow-xl 
        hover:bg-white active:scale-95 backdrop-blur-xl transition-all"
      onClick={handleSend}
      disabled={maildataLength === 0 || send}
    >
      {send ? "Sending..." : "Send Email"}
    </button>
  </div>
</div>


);
};

export default FileUpload;
