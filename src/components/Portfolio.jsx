import { useState, useEffect, useRef } from "react";
import AntigravityBackground from "./AntigravityBackground";

// Native IntersectionObserver for scroll animations
function FadeInSection({ children, className = "" }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""} ${className}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle Dark Mode toggling
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // Handle Scroll Spy for Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "experience",
        "stats",
        "projects",
        "open-source",
        "writing",
      ];
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop - 150;
          const height = element.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <div className="portfolio-wrapper">
      <AntigravityBackground />

      {/* MINIMALIST NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">Code. Create. Scale.</div>
          <div className="nav-links">
            {[
              "home",
              "about",
              "experience",
              "stats",
              "projects",
              "open-source",
              "writing",
            ].map((item) => (
              <button
                key={item}
                className={`nav-btn ${activeSection === item ? "active" : ""}`}
                onClick={() => scrollTo(item)}
              >
                {item === "open-source"
                  ? "Open Source"
                  : item === "stats"
                    ? "GitHub Stats"
                    : item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
          <button
            className="theme-toggle pill-btn outline"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-content fade-in-section is-visible">
          <span className="overline">Software Developer</span>
          <h1>Sukhvinder Singh</h1>
          <p className="hero-tagline">
            Software Development Engineer · Backend Systems · AI/ML Integration
          </p>
          <div className="hero-actions">
            <button
              className="pill-btn primary"
              onClick={() => scrollTo("projects")}
            >
              Explore projects
            </button>
            <button
              className="pill-btn secondary"
              onClick={() => scrollTo("about")}
            >
              About me
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT ME */}
      <section id="about" className="section-container">
        <FadeInSection>
          <div className="grid-layout-2col">
            <div className="text-block">
              <span className="overline">About</span>
              <h2 className="section-title">
                Built for scale,
                <br />
                designed for trust.
              </h2>
              <p className="intro-text">
                I'm a results-driven Software Development Engineer with over 2
                years of professional experience in designing, developing, and
                deploying scalable backend systems. Proficient in building
                robust RESTful APIs, optimizing distributed systems, and
                implementing microservices architectures using Python and
                Node.js.
              </p>
              <p className="intro-text" style={{ marginTop: "1rem" }}>
                I have completed my MSc in Advanced Computer Science with
                Distinction, specializing in AI/ML integration, prompt
                engineering, and backend system scalability. I am passionate
                about driving automation, improving system throughput, and
                applying machine learning techniques to solve real-world
                problems.
              </p>
              <p
                className="intro-text"
                style={{ marginTop: "1rem", fontSize: "0.9rem", opacity: 0.8 }}
              >
                <strong>Interests:</strong> Cricket, Cycling, Competitive
                Programming, JavaScript, Python Techniques, Fitness, Outdoor
                Exploration.
              </p>

              {/* SOCIAL ICONS ROW */}
              <div
                className="social-links"
                style={{
                  marginTop: "2.5rem",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <SocialIcon
                  href="mailto:sukhe353@gmail.com"
                  title="Email Me"
                  bgColor="#EA4335"
                  viewBox="0 0 24 24"
                  path="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                />
                <SocialIcon
                  href="https://github.com/iamsukhe"
                  title="GitHub"
                  bgColor="#181717"
                  path="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
                <SocialIcon
                  href="https://www.linkedin.com/in/sukhvinder-singh-4029a8190/"
                  title="LinkedIn"
                  bgColor="#0A66C2"
                  path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
                <SocialIcon
                  href="https://leetcode.com/u/iamsukhe/"
                  title="LeetCode"
                  bgColor="#FFA116"
                  path="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.469 2.376-1.469 3.765s.488 2.783 1.469 3.765l4.332 4.363c.981.982 2.375 1.469 3.764 1.469s2.783-.487 3.765-1.469l2.697-2.607c.514-.514.496-1.365-.039-1.9-.535-.536-1.387-.554-1.901-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"
                />
              </div>
            </div>

            <div className="skills-grid minimal-cards">
              {/* DYNAMIC TECH STACK ICONS */}
              <div
                className="minimal-card"
                style={{ padding: "1.5rem", gridColumn: "1 / -1" }}
              >
                <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
                  Core Tech Stack
                </h4>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src="https://skillicons.dev/icons?i=html,css,js,ts,python,cpp,react,express,django,nodejs,postgres,mongo,redis,docker,nginx,git,cypress,tensorflow&perline=6"
                    alt="Tech Stack Icons"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </div>

              {/* TEXTUAL TAGS FOR DETAIL / ATS */}
              <SkillCategory
                title="Programming Languages"
                skills={[
                  "JavaScript",
                  "TypeScript",
                  "Node.js",
                  "Python",
                  "C++",
                  "HTML",
                  "CSS",
                  "SQL",
                ]}
              />
              <SkillCategory
                title="Frameworks & Libraries"
                skills={[
                  "Express.js",
                  "Django",
                  "Django REST",
                  "React",
                  "AdonisJs",
                  "A-Frame",
                  "Three.js",
                  "Pandas",
                  "NumPy",
                  "TensorFlow",
                ]}
              />
              <SkillCategory
                title="Databases, Tools & DevOps"
                skills={[
                  "PostgreSQL",
                  "MongoDB",
                  "Redis",
                  "Docker",
                  "Nginx",
                  "Cypress",
                  "Mocha",
                  "Git",
                ]}
              />
              <SkillCategory
                title="AI/ML & Additional Skills"
                skills={[
                  "Deep Learning",
                  "CNNs",
                  "Keras",
                  "Scikit-learn",
                  "Multimodal Signal Processing",
                  "API Development",
                  "Backend Optimization",
                  "Agile Methodology",
                ]}
              />
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* EXPERIENCE & EDUCATION */}
      <section id="experience" className="section-container bg-alt">
        <FadeInSection>
          <div className="text-center-block">
            <span className="overline">Experience & Education</span>
            <h2 className="section-title">
              Proven experience,
              <br />
              scalable solutions.
            </h2>
          </div>

          <div className="experience-timeline minimal-cards">
            <h3 style={{ marginBottom: "1rem", marginTop: "2rem" }}>
              Work Experience
            </h3>
            <Experience
              company="Suraasa | Gurugram, India"
              role="Software Development Engineer"
              duration="May 2022 – August 2024"
              achievements={[
                "Engineered and scaled backend systems for the International Teaching Olympiad, serving over 20,000 concurrent users.",
                "Developed scalable REST APIs in Node.js and Python, enabling seamless data flow across microservices.",
                "Integrated Redis caching for Authentication, reducing API response times by 30%, and optimized system throughput under peak load.",
                "Led the end-to-end design and development of a credential management system to store and manage users’ certificates, alongside developing a comprehensive user enrolment system.",
                "Implemented a centralized authentication package in TypeScript with token-based security and Single Sign-On (SSO) for multi-service login.",
                "Created a reusable package that accepts JSON input and automatically generates TypeScript and Python code, enabling a centralized API solution.",
                "Collaborated with front-end teams using Agile methodology to align backend APIs with UI/UX consistency and performance.",
                "Developed a user profile feature leveraging generative AI to automatically generate users’ resumes based on their profile data.",
              ]}
            />
            <Experience
              company="Suraasa | Gurugram, India"
              role="Backend Intern"
              duration="April 2022 – May 2022"
              achievements={[
                "Trained in Node.js, Python, and Adonis.js; delivered a self-initiated backend module for organizational use.",
                "Contributed to building a transaction management system within the finance module, integrating third-party payment gateways such as Stripe and Razorpay.",
                "Implemented taxation logic and payment splitting functionality to support complex financial workflows.",
              ]}
            />
            <Experience
              company="Hybrowlabs Technologies | Gurugram, India"
              role="Web Development Intern"
              duration="June 2021 – January 2022"
              achievements={[
                "Collaborated with the team to implement front-end components, ensuring cross-browser compatibility.",
                "Developed responsive web pages using HTML, CSS, and JavaScript, enhancing user experience and accessibility.",
              ]}
            />

            <h3 style={{ marginBottom: "1rem", marginTop: "3rem" }}>
              Education
            </h3>
            <Experience
              company="University of Essex | Colchester, England"
              role="MSc Advanced Computer Science"
              duration="Graduating November 2025"
              achievements={[
                "Classification: Pass with Distinction",
                "Master’s Dissertation: Achieved Distinction (82/100) in final research project.",
                "Relevant Coursework: Machine Learning, Data Science & Decision Making, Game AI, Intelligent Systems & Robotics, Computer Security.",
              ]}
            />
            <Experience
              company="University of Delhi | Delhi, India"
              role="BSc (Honours) Electronic Science"
              duration="July 2019 - May 2022"
              achievements={[
                "Performance: First Division (7.4/10 CGPA)",
                "Relevant Coursework: Artificial Intelligence, Data Sciences, C Programming & Data Structures, Embedded Systems.",
              ]}
            />
          </div>
        </FadeInSection>
      </section>

      {/* GITHUB STATS SECTION */}
      <section id="stats" className="section-container">
        <FadeInSection>
          <div className="text-center-block">
            <span className="overline">Analytics</span>
            <h2 className="section-title">GitHub Insights.</h2>
          </div>

          <div
            className="github-stats-grid"
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            {/* Fetches directly from your profile: iamsukhe */}
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=iamsukhe&theme=${
                isDarkMode ? "radical" : "default"
              }`}
              alt="Top Languages by Repo"
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=iamsukhe&theme=${
                isDarkMode ? "radical" : "default"
              }`}
              alt="Top Languages by Commit"
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        </FadeInSection>
      </section>

      {/* LIVE PROJECTS */}
      <section id="projects" className="section-container bg-alt">
        <FadeInSection>
          <div className="text-center-block">
            <span className="overline">Projects</span>
            <h2 className="section-title">Architecting the future.</h2>
          </div>

          <div className="projects-grid">
            {/* AI Emotion Recognition */}
            <a
              href="https://github.com/ioanalazea/multimotion"
              target="_blank"
              rel="noopener noreferrer"
              className="project-box"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h4>AI Emotion Recognition & Attention Detection</h4>
              <p className="exp-meta" style={{ marginBottom: "1rem" }}>
                Academic Group Project
              </p>
              <p>
                Developed an AI-driven tool for neuromarketing using deep
                learning and affective computing techniques. Analyzes multimodal
                data (facial expressions, heart rate, EEG, eye-tracking, and
                galvanic conductance) to detect consumer emotions and attention.
              </p>
              <div className="tag-grid" style={{ marginTop: "auto" }}>
                <CustomTag tag="AI/ML" />
                <CustomTag tag="Deep Learning" />
                <CustomTag tag="TensorFlow" />
                <CustomTag tag="Python" />
              </div>
            </a>

            {/* Web 3 Metaverse */}
            <a
              href="https://github.com/iamsukhe/mind-groove"
              target="_blank"
              rel="noopener noreferrer"
              className="project-box"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h4>Web 3 Metaverse Platform (Mind Groove)</h4>
              <p className="exp-meta" style={{ marginBottom: "1rem" }}>
                Dissertation Project
              </p>
              <p>
                A virtual space designed for autistic children (aged 7-12),
                accommodating sensory needs and alternative communication.
                Features customizable avatars, safe virtual environments, and
                interactive tools promoting social skills.
              </p>
              <div className="tag-grid" style={{ marginTop: "auto" }}>
                <CustomTag tag="Web3" />
                <CustomTag tag="Three.js" />
                <CustomTag tag="A-Frame" />
                <CustomTag tag="JavaScript" />
              </div>
            </a>

            {/* Car Price Predictor */}
            <a
              href="https://github.com/iamsukhe/car-prediction"
              target="_blank"
              rel="noopener noreferrer"
              className="project-box"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h4>Car Price Predictor</h4>
              <p className="exp-meta" style={{ marginBottom: "1rem" }}>
                Machine Learning Project
              </p>
              <p>
                Predicts resale prices of used cars using a Scikit-Learn
                pipeline. Features a robust data cleaning workflow and a Linear
                Regression model achieving an R² score of ~0.845.
              </p>
              <div className="tag-grid" style={{ marginTop: "auto" }}>
                <CustomTag tag="Python" />
                <CustomTag tag="Scikit-learn" />
                <CustomTag tag="Pandas" />
                <CustomTag tag="NumPy" />
              </div>
            </a>
          </div>
        </FadeInSection>
      </section>

      {/* OPEN SOURCE CONTRIBUTIONS */}
      <section id="open-source" className="section-container">
        <FadeInSection>
          <div className="text-center-block">
            <span className="overline">Open Source</span>
            <h2 className="section-title">Giving back to the community.</h2>
          </div>

          <div className="projects-grid">
            <OpenSourceCard
              title="Automated HTML Sidebar Generator"
              prNum="39"
              repo="alok722"
              link="https://github.com/alok722/namaste-javascript-notes/pull/39"
              description="Developed an automated Node.js build script that converts Markdown files into styled HTML pages. Engineered an interactive Table of Contents (TOC) sidebar, mobile-responsive overlay, and deep-linking anchors for headings."
              tags={["Node.js", "Build Scripts", "HTML", "CSS"]}
            />

            <OpenSourceCard
              title="Protein Tracker Interactive Filters"
              prNum="27"
              repo="softwarewithnick"
              link="https://github.com/softwarewithnick/protein-drink-tracker/pull/27"
              description="Implemented advanced dietary filters (Vegan, Veg, Meat) and interactive achievement/streak mechanics to boost user retention. Refactored the daily motivation logic and updated the language dictionary."
              tags={["JavaScript", "Frontend Logic", "UI/UX"]}
            />

            <OpenSourceCard
              title="ORM SelectRelatedContract Fix"
              prNum="3"
              repo="chirgjin (Adonis Typings)"
              link="https://github.com/chirgjin/adonisjs-select-related/pull/3"
              description="Refactored internal ORM typing configurations in AdonisJS to correctly interface with the SelectRelatedContract, fixing complex database relation queries and QueryBuilder typing issues."
              tags={["TypeScript", "AdonisJs", "ORM"]}
            />

            <OpenSourceCard
              title="Enum String Serialization Fix"
              prNum="7"
              repo="chirgjin"
              link="https://github.com/chirgjin/adminjs-adonis/pull/7/changes#diff-5a2a2f2ecaf4aa4d0f2090a543a07a505a54b00530f0f81f3da484befee0ac2aR20-R28"
              description="Resolved a frontend-backend communication bug by strictly typing enums to strings in the adapter helpers, ensuring reliable JSON serialization for database communications."
              tags={["TypeScript", "API Integration"]}
            />
          </div>
        </FadeInSection>
      </section>

      {/* WRITING */}
      <section id="writing" className="section-container bg-alt">
        <FadeInSection>
          <div className="text-center-block">
            <span className="overline">Latest Blogs & Publications</span>
            <h2 className="section-title">Sharing the knowledge.</h2>
          </div>

          <div className="writing-container">
            <a
              href="https://medium.com/@sukhe353/how-javascript-code-is-executed-9aa754826852"
              target="_blank"
              rel="noopener noreferrer"
              className="writing-card minimal-card"
            >
              <img
                src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*srBDNUvp-aUrL31QrSZ5lg.png"
                alt="Thumbnail"
                className="writing-img"
              />
              <div className="writing-info">
                <h4>How JavaScript Code is executed?</h4>
                <p>
                  A deep dive into the JS execution context, call stack, and
                  memory heap.
                </p>
                <span className="meta">
                  Published: Jun 1, 2023 · 5 min read
                </span>
              </div>
            </a>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}

// --- HELPER COMPONENTS --- //

// Reusable Circular Social Icon Helper
function SocialIcon({ href, path, viewBox = "0 0 24 24", bgColor, title }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "42px",
        height: "42px",
        backgroundColor: bgColor,
        color: "#ffffff",
        borderRadius: "50%",
        textDecoration: "none",
        transition: "transform 0.2s ease, opacity 0.2s ease",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.opacity = "0.9";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.opacity = "1";
      }}
    >
      <svg
        viewBox={viewBox}
        width="22"
        height="22"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} />
      </svg>
    </a>
  );
}

function CustomTag({ tag }) {
  const targetSkills = [
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "C++",
    "SQL",
  ];

  const isTarget = targetSkills.includes(tag);

  return (
    <span className={`tag ${isTarget ? "highlighted" : "outline"}`}>{tag}</span>
  );
}

function SkillCategory({ title, skills }) {
  return (
    <div className="minimal-card">
      <h4>{title}</h4>
      <div className="tag-grid">
        {skills.map((s, i) => (
          <span key={i} className={"tag outline"}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Experience({ company, role, duration, achievements }) {
  return (
    <div className="minimal-card exp-item">
      <div className="exp-header">
        <div>
          <h4>{role}</h4>
          <span className="exp-company">{company}</span>
        </div>
        <div className="exp-meta">
          <span>{duration}</span>
        </div>
      </div>

      <div className="exp-achievements">
        {achievements.map((ach, i) => (
          <div key={i} className="achievement-item">
            <p>{ach}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpenSourceCard({ title, repo, prNum, description, tags, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-box"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <h4
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{title}</span>
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "1rem",
            fontWeight: "500",
            marginLeft: "1rem",
          }}
        >
          #{prNum}
        </span>
      </h4>
      <p
        className="exp-company"
        style={{ marginBottom: "1.5rem", fontSize: "0.95rem" }}
      >
        Merged into: {repo}
      </p>
      <p>{description}</p>
      <div className="tag-grid" style={{ marginTop: "auto" }}>
        {tags.map((t, i) => (
          <CustomTag key={i} tag={t} />
        ))}
      </div>
    </a>
  );
}
