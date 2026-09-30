import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, BrainCircuit, Check, ChevronRight, Code2, Database, Download, ExternalLink, Github, GraduationCap, Mail, Menu, Sparkles, X } from 'lucide-react';
import './styles.css';

const profile = {
  name: 'Madesh P',
  role: 'Aspiring Data Scientist',
  kicker: 'Machine Learning Enthusiast • B.Tech AI & DS Student',
  email: 'madeshpalanivel.p@gmail.com',
  phone: '+91 9042827952',
  github: 'https://github.com/madesh2910',
  linkedin: 'https://www.linkedin.com/in/madesh-palanivel-067708378?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
};

const projects = [
  {
    title: 'Loan Approval Prediction', category: 'Machine Learning', number: '01',
    description: 'An end-to-end machine learning workflow for predicting loan approval from applicant information, covering preprocessing, EDA, feature engineering, model training and evaluation.',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Joblib'],
    github: 'https://github.com/madesh2910/Loan-Approval-Prediction',
    demo: 'https://loan-approval-prediction-vvwulrbi66iaapus4gourt.streamlit.app/',
  },
  {
    title: 'AI Exam Evaluator', category: 'Generative AI • NLP', number: '02',
    description: 'An AI-based student-answer evaluation system using semantic similarity, Sentence Transformers and Google Gemini API, delivered through a Streamlit application.',
    tech: ['Generative AI', 'Gemini API', 'NLP', 'Sentence Transformers', 'Scikit-learn', 'Streamlit'],
    github: 'https://github.com/madesh2910/AI-Answer-Evaluator',
    demo: 'https://ai-answer-evaluator-cvvvuc3hgahqnvuung2tw7.streamlit.app/',
  },
  {
    title: 'Intelligent PDF Question Answering System', category: 'RAG • Document AI', number: '03',
    description: 'A RAG-based application for asking questions over PDF content using embeddings, FAISS semantic search and context-aware LLM responses.',
    tech: ['RAG', 'FAISS', 'Embeddings', 'Hugging Face', 'Streamlit'],
    github: 'https://github.com/madesh2910/Intelligent-PDF-QA',
    demo: 'https://intelligent-pdf-app-6sfpy892guww9e76shwhqt.streamlit.app/',
  },
];

const skills = {
  'Programming': ['Python', 'SQL'],
  'Data & ML': ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'TensorFlow', 'Seaborn', 'Joblib'],
  'Databases': ['MySQL', 'MongoDB'],
  'Developer Tools': ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook'],
};

const certifications = [
  'Data Analysis Using Python — Marcello Tech',
  'Skill Certification on Python — HackerRank',
  'Statistics for Data Science — SimpliLearn',
  'Machine Learning for Natural Language Processing — AWS Academy Graduate',
  'Data Science & AI Advanced — Udemy',
];

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let visible = true;
    let width = 0, height = 0;
    const count = window.matchMedia('(max-width: 700px)').matches ? 18 : 34;
    const nodes = Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .00025, vy: (Math.random() - .5) * .00025 }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      width = canvas.clientWidth; height = canvas.clientHeight;
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const tick = () => {
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        ctx.beginPath(); ctx.arc(n.x * width, n.y * height, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(130,156,255,.7)'; ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = (a.x - b.x) * width, dy = (a.y - b.y) * height, d = Math.hypot(dx, dy);
        if (d < 150) { ctx.beginPath(); ctx.moveTo(a.x * width, a.y * height); ctx.lineTo(b.x * width, b.y * height); ctx.strokeStyle = `rgba(130,156,255,${(1 - d / 150) * .13})`; ctx.stroke(); }
      }
      raf = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { cancelAnimationFrame(raf); tick(); } else cancelAnimationFrame(raf); }, { threshold: .05 });
    observer.observe(canvas); resize(); window.addEventListener('resize', resize); tick();
    return () => { cancelAnimationFrame(raf); observer.disconnect(); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="neural" aria-hidden="true" />;
}

function App() {
  const [mobile, setMobile] = useState(false);
  const [palette, setPalette] = useState(false);
  const [activeProject, setActiveProject] = useState<typeof projects[number] | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => { document.documentElement.classList.add('light'); }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette(v => !v); } if (e.key === 'Escape') { setPalette(false); setActiveProject(null); setMobile(false); } };
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler);
  }, []);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobile(false); setPalette(false); };
  const copyEmail = async () => { await navigator.clipboard?.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return <div className="app">
    <header className="nav"><button className="logo" onClick={() => go('home')} aria-label="Go home">MP<span>.</span></button>
      <nav>{['home', 'about', 'skills', 'projects', 'education', 'contact'].map(item => <button key={item} onClick={() => go(item)}>{item}</button>)}</nav>
      <div className="navActions"><button className="shortcut" onClick={() => setPalette(true)}>⌘ K</button><button className="menuBtn" onClick={() => setMobile(v => !v)} aria-label="Open menu">{mobile ? <X/> : <Menu/>}</button></div>
    </header>
    <AnimatePresence>{mobile && <motion.div className="mobileNav" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>{['home','about','skills','projects','education','contact'].map(item => <button key={item} onClick={() => go(item)}>{item}</button>)}</motion.div>}</AnimatePresence>

    <main>
      <section id="home" className="hero"><NeuralCanvas/><div className="heroGlow"/><div className="heroGrid">
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
          <div className="eyebrow"><span className="pulse"/> DATA SCIENCE • MACHINE LEARNING • AI</div>
          <h1>Madesh<br/><em>Palanivel.</em></h1>
          <h2>{profile.role}</h2>
          <p className="heroCopy">{profile.kicker}. Passionate about solving real-world problems through data-driven solutions.</p>
          <div className="heroActions"><button className="primary" onClick={() => go('projects')}>Explore Projects <ArrowUpRight size={17}/></button><a className="outline" href={profile.linkedin} target="_blank" rel="noreferrer">Let's Connect <ExternalLink size={16}/></a><a className="outline" href="/Madesh-P-Resume.pdf" download><Download size={16}/> Download Resume</a></div>
          <div className="heroMeta"><span><Sparkles size={14}/> Python • SQL • ML</span><span><Database size={14}/> Data-driven thinking</span></div>
        </motion.div>
        <motion.div className="portraitFrame" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{duration:.8,delay:.12}}><div className="orbit one"/><div className="orbit two"/><div className="portrait"><img src="/profile.jpeg" alt="Professional portrait of Madesh P"/></div><div className="floatingCard"><BrainCircuit size={17}/><div><b>Data + Intelligence</b><small>Building practical ML systems</small></div></div><div className="sideCode">01<br/><span>ML</span><br/>AI</div></motion.div>
      </div></section>

      <section id="about" className="section"><div className="sectionTitle"><span>01</span><div><p>PROFILE</p><h3>Data, models,<br/><i>real problems.</i></h3></div></div><div className="aboutGrid"><div className="aboutText"><p className="large">Motivated aspiring Data Scientist pursuing B.Tech in Artificial Intelligence and Data Science.</p><p>Hands-on experience with Python, SQL, Machine Learning and Data Analysis, with end-to-end work across preprocessing, exploratory data analysis, feature engineering, model evaluation and deployment.</p><p>Interested in building practical data-driven applications and experimenting with Machine Learning, Generative AI and document intelligence.</p></div><div className="metricGrid"><div><strong>7.29</strong><span>CGPA</span></div><div><strong>100+</strong><span>LeetCode problems</span></div><div><strong>03</strong><span>Featured projects</span></div><div><strong>2027</strong><span>Expected graduation</span></div></div></div></section>

      <section id="skills" className="section"><div className="sectionTitle"><span>02</span><div><p>TOOLKIT</p><h3>Technical<br/><i>stack.</i></h3></div></div><div className="skillGrid">{Object.entries(skills).map(([group, list], i) => <motion.article whileHover={{y:-5}} className="skillCard" key={group}><div className="skillTop"><span>0{i+1}</span>{group === 'Databases' ? <Database/> : group === 'Developer Tools' ? <Code2/> : <BrainCircuit/>}</div><h4>{group}</h4><div className="chips">{list.map(x => <span key={x}>{x}</span>)}</div></motion.article>)}</div></section>

      <section id="projects" className="section"><div className="sectionTitle"><span>03</span><div><p>SELECTED WORK</p><h3>Projects that<br/><i>ship.</i></h3></div></div><div className="projectGrid">{projects.map((p, i) => <motion.article className="projectCard" key={p.title} whileHover={{y:-8}}><div className="projectVisual"><span>{p.number}</span><div className="visualCore">{i===0 ? <Database/> : i===1 ? <BrainCircuit/> : <Code2/>}</div><div className="visualLines"/></div><div className="projectBody"><p className="projectCat">{p.category}</p><h4>{p.title}</h4><p>{p.description}</p><div className="chips">{p.tech.map(t => <span key={t}>{t}</span>)}</div><div className="projectLinks"><a href={p.github} target="_blank" rel="noreferrer"><Github size={15}/> Repository</a><a href={p.demo} target="_blank" rel="noreferrer"><ExternalLink size={15}/> Live demo</a><button onClick={() => setActiveProject(p)}>Details <ChevronRight size={15}/></button></div></div></motion.article>)}</div></section>

      <section id="education" className="section"><div className="sectionTitle"><span>04</span><div><p>BACKGROUND</p><h3>Education &<br/><i>certifications.</i></h3></div></div><div className="educationGrid"><article className="educationCard"><div className="eduIcon"><GraduationCap/></div><p className="projectCat">2023 — 2027</p><h4>B.Tech in Artificial Intelligence and Data Science</h4><p>CARE College of Engineering, Trichy</p><strong>CGPA 7.29</strong><div className="school"><span>2022 — 2023</span><b>Higher Secondary Education</b><small>KVMHS, Kumbakonam • 74%</small></div><div className="school"><span>2020 — 2021</span><b>Secondary Education</b><small>KVMHS, Kumbakonam • All Pass</small></div></article><article className="certCard"><div className="certHead"><Sparkles size={18}/><h4>Certifications</h4></div>{certifications.map(c => <div className="cert" key={c}><Check size={14}/>{c}</div>)}</article></div></section>

      <section id="contact" className="section contact"><div><div className="eyebrow">LET'S CONNECT</div><h3>Have a data<br/><i>problem?</i></h3><p>Let's turn it into something useful.</p></div><div className="contactCard"><button onClick={copyEmail} className="contactRow"><Mail/><span>{profile.email}</span>{copied ? <Check size={15}/> : <ArrowUpRight size={15}/>}</button><a className="contactRow" href={profile.github} target="_blank" rel="noreferrer"><Github/><span>GitHub</span><ExternalLink size={15}/></a><a className="contactRow" href={profile.linkedin} target="_blank" rel="noreferrer"><ExternalLink/><span>LinkedIn</span><ExternalLink size={15}/></a><div className="phone">{profile.phone}</div></div></section>
    </main>
    <footer><b>Madesh P<span>.</span></b><span>Data Science • Machine Learning • AI</span><span>English • Tamil</span><a className="resumeDownload" href="/Madesh-P-Resume.pdf" download><Download size={14}/> Download Resume</a></footer>

    <AnimatePresence>{activeProject && <motion.div className="modalBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setActiveProject(null)}><motion.div className="projectModal" initial={{y:25,scale:.98}} animate={{y:0,scale:1}} exit={{y:15,scale:.98}} onClick={e => e.stopPropagation()}><button className="close" onClick={() => setActiveProject(null)}><X/></button><p className="projectCat">{activeProject.category}</p><h3>{activeProject.title}</h3><p>{activeProject.description}</p><h5>Technologies</h5><div className="chips">{activeProject.tech.map(t => <span key={t}>{t}</span>)}</div><div className="modalActions"><a href={activeProject.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a><a href={activeProject.demo} target="_blank" rel="noreferrer"><ExternalLink size={16}/> Live Demo</a></div></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{palette && <motion.div className="modalBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPalette(false)}><motion.div className="command" initial={{y:-20}} animate={{y:0}} onClick={e => e.stopPropagation()}><div className="commandInput">⌘ K <span>Quick navigation</span></div>{['home','about','skills','projects','education','contact'].map(x => <button key={x} onClick={() => go(x)}>{x}<ChevronRight size={15}/></button>)}</motion.div></motion.div>}</AnimatePresence>
  </div>;
}

createRoot(document.getElementById('root')!).render(<App />);
