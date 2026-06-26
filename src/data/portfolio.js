// Portfolio Data — Mayank Kumar Dubey

export const personalInfo = {
  name: "Mayank Kumar Dubey",
  title: "Full Stack Web Developer",
  email: "official.mayank502@gmail.com",
  phone: "8700547391",
  phoneCountryCode: "+91",
  linkedin: "https://www.linkedin.com/in/kr-mayankdubey/",
  github: "https://github.com/Mayank-kr-Dubey?tab=repositories",
  profilePhoto: "/images/profile.jpg",
  resumeLink: "/resume.pdf",
  bio: `A motivated and enthusiastic 3rd-year B.E. Computer Science Engineering student with a strong foundation in programming, algorithms, and software development. Passionate about exploring the latest technologies and very eager to learn, adapt, and contribute to innovative solutions in the tech industry.`,
  tagline: "Building the future, one line of code at a time.",
  location: "India",
  university: "Chandigarh University",
};

export const skills = [
  {
    name: "Java",
    category: "language",
    icon: "java",
    color: "#f89820",
    description:
      "Proficient in Java with strong OOP concepts, data structures, and algorithm design. Experience building robust backend systems.",
  },
  {
    name: "Python",
    category: "language",
    icon: "python",
    color: "#3776ab",
    description:
      "Skilled in Python for scripting, automation, data analysis, and building web applications with modern frameworks.",
  },
  {
    name: "C",
    category: "language",
    icon: "c",
    color: "#a8b9cc",
    description:
      "Strong foundation in C programming with understanding of memory management, pointers, and system-level programming.",
  },
  {
    name: "C++",
    category: "language",
    icon: "cpp",
    color: "#00599c",
    description:
      "Experienced in C++ for competitive programming, DSA, and performance-critical applications.",
  },
  {
    name: "MongoDB",
    category: "mern",
    icon: "mongodb",
    color: "#47a248",
    description:
      "Expert in MongoDB for NoSQL database design, aggregation pipelines, and scalable data modeling in MERN stack apps.",
  },
  {
    name: "Express.js",
    category: "mern",
    icon: "express",
    color: "#ffffff",
    description:
      "Proficient in Express.js for building RESTful APIs, middleware architecture, and server-side logic.",
  },
  {
    name: "React",
    category: "mern",
    icon: "react",
    color: "#61dafb",
    description:
      "Advanced React skills including hooks, context API, state management, and building responsive SPAs with modern patterns.",
  },
  {
    name: "Node.js",
    category: "mern",
    icon: "nodejs",
    color: "#339933",
    description:
      "Skilled in Node.js for building scalable server-side applications, real-time systems, and API development.",
  },
  {
    name: "Swift",
    category: "mobile",
    icon: "swift",
    color: "#fa7343",
    description:
      "Experience in Swift for iOS app development, building native mobile applications with modern Apple frameworks.",
  },
  {
    name: "HTML",
    category: "web",
    icon: "html",
    color: "#e34f26",
    description:
      "Expert in semantic HTML5 with focus on accessibility, SEO best practices, and modern web standards.",
  },
  {
    name: "CSS",
    category: "web",
    icon: "css",
    color: "#1572b6",
    description:
      "Advanced CSS skills including Flexbox, Grid, animations, responsive design, and CSS custom properties.",
  },
  {
    name: "JavaScript",
    category: "web",
    icon: "javascript",
    color: "#f7df1e",
    description:
      "Strong command of modern JavaScript (ES6+), DOM manipulation, async programming, and building interactive web features.",
  },
  {
    name: "Digital Marketing",
    category: "soft",
    icon: "marketing",
    color: "#ff6b6b",
    description:
      "Knowledge of SEO, social media marketing, content strategy, and digital brand building.",
  },
  {
    name: "Problem Solving",
    category: "soft",
    icon: "problemsolving",
    color: "#ffd93d",
    description:
      "Strong analytical and problem-solving abilities with experience in competitive programming and hackathons.",
  },
  {
    name: "Team Leadership",
    category: "soft",
    icon: "leadership",
    color: "#6bcb77",
    description:
      "Proven leadership as Team Leader across multiple projects, coordinating teams and driving project success.",
  },
];

export const projects = [
  {
    id: "guard-her",
    name: "Guard_Her",
    year: 2024,
    techStack: ["MongoDB", "Express.js", "React", "Node.js"],
    role: "Team Leader",
    description:
      "A mobile application designed for the safety of women. Guard_Her provides real-time emergency alerts, location sharing with trusted contacts, and a panic button that instantly notifies authorities and emergency contacts. Built with the MERN stack for a seamless cross-platform experience.",
    features: [
      "Real-time location sharing",
      "Emergency SOS alerts",
      "Trusted contact network",
      "Panic button with instant notifications",
    ],
    github: "https://github.com/Mayank-kr-Dubey?tab=repositories",
    demo: "#",
    color: "#f472b6",
  },
  {
    id: "bid-vault",
    name: "Bid Vault",
    year: 2025,
    techStack: ["MongoDB", "Express.js", "React", "Node.js"],
    role: "Team Leader",
    description:
      "An online auction and real-time bidding platform serving users across India. Bid Vault features live bidding rooms, real-time price updates using WebSockets, secure payment integration, and a comprehensive dashboard for both buyers and sellers.",
    features: [
      "Real-time bidding with WebSockets",
      "Secure payment gateway",
      "User dashboard & analytics",
      "Live auction rooms",
    ],
    github: "https://github.com/Mayank-kr-Dubey?tab=repositories",
    demo: "#",
    color: "#fbbf24",
  },
  {
    id: "the-goalkeepers",
    name: "the Goalkeepers",
    year: 2025,
    techStack: ["Unity", "Blender", "3D Object Modeling"],
    role: "Team Leader",
    description:
      "A storyline-based educational game that teaches sustainable development goals (SDGs) in a gamified way. Players navigate through immersive 3D environments, complete challenges aligned with UN SDGs, and earn rewards for making sustainable choices.",
    features: [
      "Immersive 3D storyline",
      "SDG-aligned challenges",
      "Gamified learning experience",
      "Achievement & reward system",
    ],
    github: "https://github.com/Mayank-kr-Dubey?tab=repositories",
    demo: "#",
    color: "#34d399",
  },
];

export const education = [
  {
    degree: "Bachelor's in Computer Science Engineering",
    institution: "Chandigarh University",
    period: "2023 – 2027",
    score: null,
    icon: "🎓",
    current: true,
  },
  {
    degree: "Intermediate (12th)",
    institution: "Royal Public Sr. Sec. School",
    period: "2022",
    score: "82%",
    icon: "📚",
    current: false,
  },
  {
    degree: "Matriculation (10th)",
    institution: "Royal Public Sr. Sec. School",
    period: "2020",
    score: "91%",
    icon: "📖",
    current: false,
  },
];

export const experience = [
  {
    title: "Cyber Job Simulation",
    company: "Deloitte Australia",
    period: "June 2025",
    description:
      "Completed a comprehensive cybersecurity job simulation, gaining hands-on experience in threat analysis, security protocols, and enterprise-level security practices.",
    icon: "🔒",
  },
  {
    title: "Data Analytics Job Simulation",
    company: "Deloitte Australia",
    period: "June 2025",
    description:
      "Completed data analytics simulation covering data visualization, statistical analysis, and business intelligence insights for real-world scenarios.",
    icon: "📊",
  },
];

export const certifications = [
  {
    name: "Best Performer in Technical Workshop",
    issuer: "Technical Workshop",
    date: "March 2024",
    icon: "🏆",
  },
  {
    name: "Cyber Job Simulation",
    issuer: "Deloitte Australia",
    date: "June 2025",
    icon: "🛡️",
  },
  {
    name: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia",
    date: "June 2025",
    icon: "📈",
  },
  {
    name: "Cloud Computing (Elite + Silver)",
    issuer: "NPTEL",
    date: "2024",
    icon: "☁️",
  },
  {
    name: "Campus Ambassador",
    issuer: "Rinex Company",
    date: "2024",
    icon: "🎯",
  },
  {
    name: "Hackathon Achievements",
    issuer:
      "HackWithUttrakhand, Zinnovatio 1.0, Zinnovatio 2.0, Project Expo 2025",
    date: "2024–2025",
    icon: "💻",
  },
];

export const languages = ["English", "Hindi"];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];
