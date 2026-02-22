import { useRef, useState } from "react";
import Card from "../components/Card";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/FrameWorks";
import ResumeModal from "../components/ResumeModal";

// import { Motion } from "../components/Motion";

const About = () => {
  const grid2Container = useRef();
  const [showResume, setShowResume] = useState(false);
  return (
    <>
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Krishna Mahajan</p>
            <p className="subtext">
              A full-stack developer and B.E. student at TIET, building
              real-time platforms, AI-powered systems, and scalable web apps
              with React, Node.js, Python, and more.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              CODE IS CRAFT
            </p>
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="Full-Stack"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="REST APIs"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="SQL"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="DevOps"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="CI/CD"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/react.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/javascript.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/github.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "30%", left: "10%" }}
              image="assets/logos/sqlite.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "30%", left: "10%" }}
              image="assets/logos/Nodejs.svg"
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-full px-4 py-2">
            <p className="headtext">My Education</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-white font-semibold text-base leading-snug">
                  Thapar Institute of Engineering &amp; Technology
                </p>
                <p className="subtext">B.E. in Electronics and Computer Engineering</p>
                <p className="subtext">CGPA: 7.45 &nbsp;·&nbsp; Sep 2022 – Present &nbsp;·&nbsp; Patiala, Punjab</p>
              </div>
              <div>
                <p className="text-white font-semibold text-base leading-snug">
                  Golden Sr. Sec School
                </p>
                <p className="subtext">Class 12th Non-Medical — 90.2%</p>
                <p className="subtext">Apr 2020 – May 2022 &nbsp;·&nbsp; Gurdaspur, Punjab</p>
              </div>
            </div>
          </div>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
            <button
              onClick={() => setShowResume(true)}
              className="btn w-[12rem] flex items-center justify-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              <img src="assets/arrow-up.svg" className="w-4 h-4" />
              View Resume
            </button>
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Tech Stack</p>
            <p className="subtext">
              I work across the full stack — from React and Node.js on the web
              to Python, Docker, and AWS in the cloud.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
    {showResume && <ResumeModal closeModal={() => setShowResume(false)} />}
  </>
  );
};

export default About;
