import { motion } from "motion/react";

const ResumeModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm px-4">
      <motion.div
        className="relative w-full max-w-3xl border shadow-xl rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 flex flex-col"
        style={{ height: "85vh" }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h5 className="text-lg font-bold text-white">Krishna Mahajan — Resume</h5>
          <div className="flex items-center gap-3">
            <a
              href="/Krishna_resume.pdf"
              download="Krishna_Mahajan_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <img src="assets/arrow-up.svg" className="w-4 h-4 rotate-180" />
              Download
            </a>
            <button
              onClick={closeModal}
              className="p-2 rounded-lg bg-midnight hover:bg-gray-600 transition-colors"
            >
              <img src="assets/close.svg" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <iframe
          src="/Krishna_resume.pdf"
          className="w-full flex-1 rounded-b-2xl"
          title="Krishna Mahajan Resume"
        />
      </motion.div>
    </div>
  );
};

export default ResumeModal;
