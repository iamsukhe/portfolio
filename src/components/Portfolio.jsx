import { useState, useEffect, useRef } from "react";
import AntigravityBackground from "./AntigravityBackground";

// Native IntersectionObserver
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

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "experience",
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
                I'm a results-driven Software Development Engineer with over 3
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
              <div className="social-links" style={{ marginTop: "2rem" }}>
                <a
                  href="https://github.com/iamsukhe"
                  className="pill-btn outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/sukhvinder-singh-4029a8190/"
                  className="pill-btn outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://leetcode.com/u/iamsukhe/"
                  className="pill-btn outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LeetCode
                </a>
              </div>
            </div>

            <div className="skills-grid minimal-cards">
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
                title="Databases & Tools"
                skills={[
                  "PostgreSQL",
                  "MongoDB",
                  "Redis",
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
                  "Feature Engineering",
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
                "Led the end-to-end design and development of a credential management system, including database architecture, project workflow, and implementation.",
                "Implemented a centralized authentication package in TypeScript with token-based security and Single Sign-On (SSO).",
                "Created a reusable package that accepts JSON input and automatically generates TypeScript and Python code.",
                "Developed a user profile feature leveraging generative AI to automatically generate users' resumes.",
                "Collaborated with front-end teams using Agile methodology to align backend APIs with UI/UX consistency.",
              ]}
            />
            <Experience
              company="Suraasa | Gurugram, India"
              role="Backend Intern"
              duration="April 2022 – May 2022"
              achievements={[
                "Trained in Node.js, Python, and Adonis.js; delivered a self-initiated backend module for organizational use.",
                "Contributed to building a transaction management system within the finance module, integrating Stripe and Razorpay.",
                "Implemented taxation logic and payment splitting functionality to support complex financial workflows.",
                "Utilized Git for source control and streamlined team collaboration via pull requests and issue tracking.",
              ]}
            />
            <Experience
              company="Hybrowlabs Technologies | Pune, India"
              role="Web Development Intern"
              duration="June 2021 – January 2022"
              achievements={[
                "Collaborated with the team to implement front-end components, ensuring cross-browser compatibility.",
                "Developed responsive web pages using HTML, CSS, and JavaScript, enhancing user experience and accessibility.",
                "Gained hands-on experience in debugging and troubleshooting UI/UX issues across various platforms.",
              ]}
            />

            <h3 style={{ marginBottom: "1rem", marginTop: "3rem" }}>
              Education
            </h3>
            <Experience
              company="University of Essex"
              role="MSc Advanced Computer Science"
              duration="September 2024 – October 2025"
              achievements={[
                "Achievement: Distinction",
                "Specialized in AI/ML integration, prompt engineering, and backend system scalability.",
              ]}
            />
            <Experience
              company="University of Delhi"
              role="BSc (Honours) Electronic Science"
              duration="July 2019 - May 2022"
              achievements={["Achievement: 7.418/10 CGPA"]}
            />
            <Experience
              company="Bhai Joga Singh Public School"
              role="Senior Secondary (XII-Science)"
              duration="2018 - 2019"
              achievements={["Achievement: 88.7%"]}
            />
          </div>
        </FadeInSection>
      </section>

      {/* LIVE PROJECTS */}
      <section id="projects" className="section-container">
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
                learning. Analyzes multimodal data (facial expressions, heart
                rate, EEG) to detect consumer emotions and attention levels.
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
                A virtual space designed for autistic children, focusing on
                sensory needs and alternative communication. Features
                customizable avatars and interactive tools built on Web3
                principles.
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
      <section id="open-source" className="section-container bg-alt">
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
      <section id="writing" className="section-container">
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

function CustomTag({ tag }) {
  // Target skills highlighted in blue with the mirror effect
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

// Open Source Contribution Card Helper (Now fully clickable)
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
