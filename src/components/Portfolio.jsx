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
                <SocialIcon
                  href="#"
                  title="Twitter / X"
                  bgColor="#1DA1F2"
                  path="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
                <SocialIcon
                  href="#"
                  title="Facebook"
                  bgColor="#1877F2"
                  path="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
                <SocialIcon
                  href="#"
                  title="Instagram"
                  bgColor="#E4405F"
                  path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
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

      {/* EXPERIENCE SUMMARY & BRANDS */}
      <section id="experience" className="section-container bg-alt">
        <FadeInSection>
          <div className="text-center-block">
            <span className="overline">Experience</span>
            <h2 className="section-title">
              Proven experience,
              <br />
              scalable solutions.
            </h2>
          </div>

          <div className="experience-timeline minimal-cards">
            {/* WORK EXPERIENCE SUMMARY */}
            <div
              style={{
                marginTop: "2rem",
                marginBottom: "3rem",
                padding: "0 1rem",
                textAlign: "center",
                maxWidth: "900px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <p
                className="intro-text"
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "var(--text-color)",
                }}
              >
                Over the past 2+ years, I have specialized in building and
                scaling robust backend architectures. During my tenure as a
                Software Development Engineer at Suraasa, I engineered REST APIs
                that handled 20,000+ concurrent users and optimized system
                performance by 30% through strategic Redis caching. I led the
                development of centralized authentication (SSO) and credential
                management systems using Node.js and TypeScript, and even
                integrated generative AI features to automate user resume
                creation.
              </p>
              <p
                className="intro-text"
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "var(--text-color)",
                  marginTop: "1rem",
                }}
              >
                My experience extends to creating complex financial workflows
                and payment gateway integrations, building responsive front-end
                components, and delivering automated API solutions to ensure
                cross-functional team success.
              </p>
            </div>

            {/* BRANDS GRID */}
            <div
              style={{
                textAlign: "center",
                marginTop: "3rem",
                marginBottom: "4rem",
              }}
            >
              <h3
                style={{
                  marginBottom: "2rem",
                  color: "var(--primary-color, inherit)",
                }}
              >
                Brands I Have Worked With!
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1.5rem",
                  alignItems: "center",
                }}
              >
                {/* REPLACE THESE `src` LINKS WITH YOUR ACTUAL BRAND LOGOS 
                  Use transparent PNGs for the best effect. The white background card will make them pop.
                */}
                <BrandLogo src="./src/assets/suraasa.png" alt="Suraasa" />
                <BrandLogo
                  src="./src/assets/hybrowlabs.svg"
                  alt="Hybrowlabs Technologies"
                />
              </div>
            </div>

            <hr
              style={{
                borderTop: "1px solid var(--border-color)",
                opacity: 0.3,
                margin: "2rem 0",
              }}
            />

            {/* EDUCATION */}
            <h3 style={{ marginBottom: "1rem", marginTop: "2rem" }}>
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

// Brand Logo Card Helper
function BrandLogo({ src, alt }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff", // Keeps the card white to match the reference image
        padding: "1.5rem",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100px", // Fixed height to keep the grid uniform
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </div>
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
