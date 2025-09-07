import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="relative w-48 h-48 mx-auto">
            <Image
              src="/home-photo.png"
              alt="Nischal Neupane"
              width={192}
              height={192}
              className="rounded-full border-4 border-terminal-green shadow-lg"
              priority
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-terminal-green terminal-glow">~/</span>
          <span className="text-text-primary">Welcome to</span>
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-terminal-blue terminal-glow">
          Nischal Neupane
        </h2>

        <p className="text-xl text-text-secondary mb-8">
          AI/ML Enthusiast | Data Science Explorer | CSIT Student
        </p>

        <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
          CSIT student from Nepal, passionate about{" "}
          <span className="text-terminal-green">Artificial Intelligence</span>,{" "}
          <span className="text-terminal-blue">Machine Learning</span>, and{" "}
          <span className="text-terminal-purple">Data Science</span>. 
          Building the future with code, one algorithm at a time.
        </p>

        <div className="text-left glass rounded-lg p-6 font-mono text-sm md:text-base max-w-lg mx-auto">
          <div className="text-terminal-green mb-2">nischal@portfolio:~$ cat about.txt</div>
          <div className="text-text-secondary space-y-2">
            <div><span className="text-terminal-blue">Name:</span> Nischal Neupane</div>
            <div><span className="text-terminal-blue">Location:</span> Kathmandu, Nepal</div>
            <div><span className="text-terminal-blue">Education:</span> BSc. CSIT at Vedas College (2023-2027)</div>
            <div><span className="text-terminal-blue">Status:</span> <span className="text-terminal-green">Learning & Building</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
