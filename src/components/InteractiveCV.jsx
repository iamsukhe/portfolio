import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveCV() {
  const [activeSection, setActiveSection] = useState("info");
  const [likes, setLikes] = useState(1200);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const sections = {
    info: {
      title: "INFORMATION",
      color: "#00ff88",
      content: (
        <div className="section-content">
          <DataField label="NAME" value="SUKHVINDER SINGH" />
          <DataField label="TITLE" value="Software Development Engineer" />
          <DataField label="EMAIL" value="sukhe353@gmail.com" />
          <DataField label="MOBILE" value="+44 7901 859302" />
          <DataField
            label="LOCATION"
            value={["Basildon", "SS16 4NT", "Essex", "United Kingdom"]}
          />
          <DataField label="EXPERIENCE" value="3+ years" />
          <DataField
            label="EDUCATION"
            value="MSc Advanced Computer Science (Distinction)"
          />
        </div>
      ),
    },
    profile: {
      title: "PROFILE",
      color: "#00d4ff",
      content: (
        <div className="section-content">
          <div className="profile-text">
            Results-driven Software Development Engineer with over 3 years of
            professional experience in designing, developing, and deploying
            scalable backend systems. Proficient in building robust RESTful
            APIs, optimizing distributed systems, and implementing microservices
            architectures using Python and Node.js. Skilled in database design
            and management with PostgreSQL, MongoDB, and Redis caching for
            performance enhancement. Adept at leveraging Agile methodologies for
            collaborative software delivery. I have completed my MSc in Advanced
            Computer Science with Distinction, specializing in AI/ML
            integration, prompt engineering, and backend system scalability. I
            am passionate about driving automation, improving system throughput,
            and applying machine learning techniques to solve real-world
            problems.
          </div>
        </div>
      ),
    },
    experience: {
      title: "WORK EXPERIENCE",
      color: "#ff00ff",
      content: (
        <div className="section-content">
          <Experience
            company="Suraasa"
            location="Gurugram, India"
            role="Software Development Engineer"
            duration="May 2022 – August 2024"
            achievements={[
              "Engineered and scaled backend systems for the International Teaching Olympiad, serving over 20,000 concurrent users",
              "Developed scalable REST APIs in Node.js and Python, enabling seamless data flow across microservices",
              "Integrated Redis caching for Authentication, reducing API response times by 30%, and optimized system throughput under peak load",
              "Led the end-to-end design and development of a credential management system, including database architecture, project workflow, and implementation",
              "Implemented a centralized authentication package in TypeScript with token-based security and Single Sign-On (SSO)",
              "Created a reusable package that accepts JSON input and automatically generates TypeScript and Python code",
              "Developed a user profile feature leveraging generative AI to automatically generate users' resumes",
              "Collaborated with front-end teams using Agile methodology to align backend APIs with UI/UX consistency",
            ]}
          />
          <Experience
            company="Suraasa"
            location="Gurugram, India"
            role="Backend Intern"
            duration="April 2022 – May 2022"
            achievements={[
              "Trained in Node.js, Python, and Adonis.js; delivered a self-initiated backend module for organizational use",
              "Contributed to building a transaction management system within the finance module, integrating Stripe and Razorpay",
              "Implemented taxation logic and payment splitting functionality to support complex financial workflows",
              "Utilized Git for source control and streamlined team collaboration via pull requests and issue tracking",
            ]}
          />
          <Experience
            company="Hybrowlabs Technologies"
            location="Pune, India"
            role="Web Development Intern"
            duration="June 2021 – January 2022"
            achievements={[
              "Collaborated with the team to implement front-end components, ensuring cross-browser compatibility",
              "Developed responsive web pages using HTML, CSS, and JavaScript, enhancing user experience and accessibility",
              "Gained hands-on experience in debugging and troubleshooting UI/UX issues across various platforms",
            ]}
          />
        </div>
      ),
    },
    education: {
      title: "EDUCATION",
      color: "#ffaa00",
      content: (
        <div className="section-content">
          <Education
            institution="University of Essex"
            degree="MSc Advanced Computer Science"
            achievement="Distinction"
            duration="September 2024 – October 2025"
          />
          <Education
            institution="University of Delhi"
            degree="BSc (Honours) Electronic Science"
            achievement="7.418/10 CGPA"
            duration="July 2019 - May 2022"
          />
          <Education
            institution="Bhai Joga Singh Public School"
            degree="Senior Secondary (XII-Science)"
            achievement="88.7%"
            duration="2018-19"
          />
        </div>
      ),
    },
    skills: {
      title: "KEY SKILLS",
      color: "#ff4466",
      content: (
        <div className="section-content">
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
            title="Databases"
            skills={["PostgreSQL", "MongoDB", "Redis"]}
          />
          <SkillCategory
            title="Testing & Tools"
            skills={["Cypress", "Mocha", "Git"]}
          />
          <SkillCategory
            title="AI/ML Tools"
            skills={[
              "Deep Learning",
              "CNNs",
              "TensorFlow",
              "Keras",
              "Scikit-learn",
              "Feature Engineering",
            ]}
          />
          <SkillCategory
            title="Additional Skills"
            skills={[
              "API Development",
              "Backend Optimization",
              "Agile Methodology",
              "Leadership",
              "Problem-Solving",
            ]}
          />
        </div>
      ),
    },
    projects: {
      title: "PROJECTS",
      color: "#8844ff",
      content: (
        <div className="section-content">
          <Project
            name="AI Emotion Recognition & Attention Detection"
            type="Academic Group Project"
            description="Developed an AI-driven emotion recognition and attention detection tool for neuromarketing. The system uses deep learning and affective computing techniques to analyze consumer emotions and attention using multimodal data sources such as facial expressions, heart rate, EEG, eye-tracking, and galvanic conductance."
            tags={[
              "AI/ML",
              "Deep Learning",
              "Multimodal Processing",
              "TensorFlow",
            ]}
          />
          <Project
            name="Web 3 Metaverse Platform"
            type="Dissertation Project"
            description="Leading the development of a Web 3 Metaverse platform for autistic children (aged 7-12), focused on creating virtual spaces that accommodate sensory needs and support alternative communication methods. The platform includes customizable avatars, interactive tools promoting social skills, and safe virtual environments."
            tags={["A-Frame", "Three.js", "Web3", "Agile", "Accessibility"]}
          />
        </div>
      ),
    },
    links: {
      title: "CONNECT",
      color: "#00ffdd",
      content: (
        <div className="tag-grid">
          <MediaLink
            icon="🔗"
            text="LinkedIn"
            url="https://www.linkedin.com/in/sukhvinder-singh-4029a8190/"
          />
          <MediaLink
            icon="💻"
            text="GitHub"
            url="https://github.com/iamsukhe"
          />
          <MediaLink
            icon="🎯"
            text="LeetCode"
            url="https://leetcode.com/u/iamsukhe/"
          />
        </div>
      ),
    },
    interests: {
      title: "INTERESTS",
      color: "#ff6699",
      content: (
        <div className="tag-grid">
          {[
            "Cricket",
            "Cycling",
            "Competitive Programming",
            "JavaScript",
            "Python Techniques",
            "Fitness",
            "Outdoor Exploration",
          ].map((interest) => (
            <Tag key={interest} text={interest} />
          ))}
        </div>
      ),
    },
    writing: {
      title: "WRITING",
      color: "#ffdd00",
      content: (
        <div className="section-content">
          <Writing
            title="How JavaScript Code is executed?"
            url="https://medium.com/@sukhe353/how-javascript-code-is-executed-9aa754826852"
            date="Jun 1, 2023"
            readTime="5 min read"
            thumbnail="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*srBDNUvp-aUrL31QrSZ5lg.png"
          />
        </div>
      ),
    },
  };

  const navItems = Object.keys(sections);

  return (
    <div className="cv-container">
      <motion.div
        className="header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="profile-image">
          <div className="profile-initials">SS</div>
        </div>
        <div className="header-content">
          <motion.div
            className="header-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            SUKHVINDER SINGH
          </motion.div>
          <motion.div
            className="header-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Software Development Engineer
          </motion.div>
          <motion.div
            className="header-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Backend Systems · RESTful APIs · Microservices · AI/ML Integration ·
            MSc Advanced Computer Science with Distinction
          </motion.div>
        </div>
      </motion.div>

      <nav className="navigation">
        {navItems.map((item, index) => (
          <motion.button
            key={item}
            className={`nav-button ${activeSection === item ? "active" : ""}`}
            onClick={() => setActiveSection(item)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            {sections[item].title}
          </motion.button>
        ))}
      </nav>

      <div className="content-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="section-header"
              style={{ color: sections[activeSection].color }}
            >
              {sections[activeSection].title}
            </div>
            {sections[activeSection].content}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.button
        className={`like-button ${hasLiked ? "liked" : ""}`}
        onClick={handleLike}
        whileTap={{ scale: 0.9 }}
      >
        <div className="like-icon">👍</div>
        <div className="like-count">{likes.toLocaleString()}</div>
      </motion.button>
    </div>
  );
}

// Helper Components
function DataField({ label, value }) {
  return (
    <div className="data-field">
      <span className="data-label">{label}:</span>
      {Array.isArray(value) ? (
        <div className="data-value array">
          {value.map((v, i) => (
            <span key={i}>
              {v}
              {i < value.length - 1 ? " · " : ""}
            </span>
          ))}
        </div>
      ) : (
        <span className="data-value">{value}</span>
      )}
    </div>
  );
}

function Experience({ company, location, role, duration, achievements }) {
  return (
    <motion.div
      className="experience-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="experience-header">
        <div>
          <div className="experience-title">{company}</div>
          <div className="experience-role">{role}</div>
          <div className="experience-location">{location}</div>
        </div>
        <div className="experience-duration">{duration}</div>
      </div>
      <ul className="achievement-list">
        {achievements.map((achievement, index) => (
          <li key={index} className="achievement-item">
            {achievement}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Education({ institution, degree, achievement, duration }) {
  return (
    <motion.div
      className="education-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="education-header">
        <div>
          <div className="education-title">{institution}</div>
          <div className="education-degree">{degree}</div>
          <div className="education-achievement">
            Achievement: {achievement}
          </div>
        </div>
        <div className="education-duration">{duration}</div>
      </div>
    </motion.div>
  );
}

function Project({ name, type, description, tags }) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="project-header">
        <div className="project-title">{name}</div>
      </div>
      <div className="project-type">{type}</div>
      <div className="project-description">{description}</div>
      <div className="project-tags">
        {tags.map((tag, index) => (
          <span key={index} className="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function SkillCategory({ title, skills }) {
  return (
    <div className="skill-category">
      <div className="skill-category-title">{title}</div>
      <div className="tag-grid">
        {skills.map((skill, index) => (
          <Tag key={index} text={skill} />
        ))}
      </div>
    </div>
  );
}

function Tag({ text }) {
  return (
    <motion.div
      className="tag"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.div>
  );
}

function MediaLink({ icon, text, url }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="media-link"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <span className="media-icon">{icon}</span>
      <span>{text}</span>
    </motion.a>
  );
}

function Writing({ title, url, date, readTime, thumbnail }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="writing-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      style={{ textDecoration: "none" }}
    >
      <div style={{ overflow: "hidden" }}>
        <img src={thumbnail} alt={title} className="writing-thumbnail" />
      </div>
      <div className="writing-content">
        <div className="writing-title">{title}</div>
        <div className="writing-meta">
          <span className="writing-date">{date}</span>
          <span className="writing-read-time">{readTime}</span>
        </div>
      </div>
    </motion.a>
  );
}
