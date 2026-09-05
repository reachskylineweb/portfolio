/**
 * Reach Skyline - Main Interactive Application Logic
 * Pure Vanilla JavaScript: Modals, Filtering, Video Player, Lightbox, Counters, and Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect & Active Link Highlight
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  let isTicking = false;

  const updateScrollState = () => {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      if (!navbar.classList.contains('scrolled')) navbar.classList.add('scrolled');
    } else {
      if (navbar.classList.contains('scrolled')) navbar.classList.remove('scrolled');
    }

    // Scroll spy with fast break
    let current = '';
    const scrollPos = scrollY + 160;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
        break;
      }
    }

    if (current) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${current}`) {
          if (!link.classList.contains('active')) link.classList.add('active');
        } else {
          if (link.classList.contains('active')) link.classList.remove('active');
        }
      });
    }
    isTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateScrollState);
      isTicking = true;
    }
  }, { passive: true });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Animated Number Counters
  const counterElements = document.querySelectorAll('.counter-val');
  let countersAnimated = false;

  function animateCounters() {
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.ceil(target / 45);

      const updateCount = () => {
        count += step;
        if (count < target) {
          counter.innerText = count + suffix;
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + suffix;
        }
      };

      updateCount();
    });
  }

  const observerOptions = { threshold: 0.3 };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        animateCounters();
        countersAnimated = true;
      }
    });
  }, observerOptions);

  const statsSection = document.getElementById('about');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  // 4. Portfolio Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Project Case Study Modal Data & Handlers (All 15 Official Websites)
  const projectData = {
    healingearth: {
      title: "Healing Earth Ayurveda",
      category: "Healthcare / Ayurvedic Hospital",
      client: "Healing Earth Ayurveda Hospital Bangalore",
      description: "Healing Earth is a multi-speciality Ayurvedic hospital and wellness centre based in Bangalore, India. It blends traditional Ayurvedic treatments with a modern clinical approach, offering holistic care tailored to each person.",
      image: "./assets/site_healingearth.webp",
      url: "https://healingearth.co.in/",
      highlights: [
        "Multi-speciality Ayurvedic treatment suites",
        "Modern clinical diagnosis & traditional therapies",
        "Holistic wellness consultation portal",
        "Core Web Vitals & Local SEO Architecture"
      ]
    },
    supremehospital: {
      title: "Supreme Hospital",
      category: "Healthcare / Tertiary Hospital",
      client: "Supreme Hospital OMR Chennai",
      description: "Supreme Hospital is a premier multi-speciality healthcare institution located on OMR, Chennai, delivering advanced medical, surgical, and emergency care with modern clinical infrastructure.",
      image: "./assets/site_supremehospital.webp",
      url: "https://www.supremehospitals.in/",
      highlights: [
        "Multi-department medical service architecture",
        "Doctor discovery and consultation booking",
        "Emergency and critical care guidance",
        "High-speed mobile performance optimization"
      ]
    },
    brigantine: {
      title: "Brigantine Engineering",
      category: "Engineering / Maritime Industry",
      client: "Brigantine Engineering Australia",
      description: "Brigantine Engineering provides premier maritime, industrial engineering, and container repair services across Australia, delivering technical precision and marine support.",
      image: "./assets/site_brigantine.webp",
      url: "https://www.brigantineengineering.com.au/",
      highlights: [
        "Industrial marine engineering capabilities",
        "Global client & port service network",
        "Technical equipment specification sheets",
        "Corporate B2B inquiry funnels"
      ]
    },
    bilandership: {
      title: "Bilander Ship Management",
      category: "Corporate / Maritime Logistics",
      client: "Bilander Ship Management",
      description: "Bilander Ship Management specializes in comprehensive maritime logistics, commercial vessel management, technical operations, and crew management worldwide.",
      image: "./assets/site_bilander.webp",
      url: "https://bilandershipmanagement.com/",
      highlights: [
        "Global fleet management solutions",
        "Maritime compliance & safety protocols",
        "Crewing & technical vessel operations",
        "International maritime client portal"
      ]
    },
    chennaigem: {
      title: "Chennai GEM Hospital",
      category: "Healthcare / Gastroenterology",
      client: "GEM Hospital Chennai",
      description: "GEM Hospital is India's premier institute for Gastroenterology, Advanced Laparoscopic Surgery, and Robotic Surgery, delivering world-class digestive health care.",
      image: "./assets/site_chennaigem.webp",
      url: "https://chennaigemhospital.in/",
      highlights: [
        "Robotic and laparoscopic surgery specialities",
        "Online appointment booking workflows",
        "Patient testimonials and surgical care guides",
        "High-conversion medical lead capture"
      ]
    },
    madrascoffee: {
      title: "Madras Coffee House",
      category: "Hospitality / Global F&B Chain",
      client: "Madras Coffee House",
      description: "Since 2010, synonymous with authentic South Indian filter coffee with over 160 stores globally, celebrating the rich heritage of Madras in every single cup.",
      image: "./assets/site_madrascoffee.webp",
      url: "https://madrascoffeehouse.com/",
      highlights: [
        "Global presence across 160+ stores",
        "Franchise partner & store locator systems",
        "Rich South Indian cultural brand story",
        "Menu presentation & corporate catering"
      ]
    },
    dmedva: {
      title: "D-Medva",
      category: "Healthcare / Medical Communication",
      client: "D-Medva Healthcare Marketing",
      description: "D-Medva transforms healthcare marketing in India with strategic, creative, and compliant solutions for healthcare providers, doctors, and medical institutions.",
      image: "./assets/site_dmedva.webp",
      url: "https://dmedva.com/",
      highlights: [
        "Medical compliance and ethical marketing",
        "Doctor brand building and reputation management",
        "Multi-speciality clinic growth strategies",
        "Healthcare digital conversion architecture"
      ]
    },
    universeworldrecords: {
      title: "Universe Book of World Records",
      category: "Lifestyle / Global Records",
      client: "Universe Book of World Records",
      description: "Official international platform for documenting, adjudicating, verifying, and publishing extraordinary world records and achievements across the globe.",
      image: "./assets/site_universeworldrecords.webp",
      url: "https://universebookofworldrecords.com/",
      highlights: [
        "Online record application & adjudication portal",
        "Verified global record holders directory",
        "Digital certificate issuance system",
        "Interactive event & record archives"
      ]
    },
    kalalaya: {
      title: "Kalalaya International",
      category: "Arts & Culture / Academy",
      client: "Kalalaya International",
      description: "Kalalaya International is a globally renowned institution promoting traditional Indian classical dance, music, fine arts, and cultural heritage education across borders.",
      image: "./assets/site_kalalaya.webp",
      url: "https://kalalayaintl.com/",
      highlights: [
        "Course curriculum and faculty directories",
        "Global student admission & enrollment",
        "Performance showcase & video archives",
        "Cultural workshop and event management"
      ]
    },
    veeshapes: {
      title: "Vee Shapes Designers",
      category: "Design / Architecture & Interiors",
      client: "Vee Shapes Designers",
      description: "Vee Shapes Designers is an interior design and architectural planning studio specializing in luxury residential, corporate office, and commercial space transformations.",
      image: "./assets/site_veeshapes.webp",
      url: "https://veeshapesdesigners.com/",
      highlights: [
        "Interactive architectural project galleries",
        "3D interior rendering visualization",
        "Design consultation booking funnel",
        "Client material & concept catalogs"
      ]
    },
    sprconsultech: {
      title: "SPR Consultech",
      category: "Corporate / Tech Transformation",
      client: "SPR Consultech",
      description: "SPR Consultech specializes in driving business transformation through innovative technology and customized strategies with a global team of over 400 professionals.",
      image: "./assets/site_sprconsultech.webp",
      url: "https://sprconsultech.com/",
      highlights: [
        "400+ multidisciplinary technology experts",
        "Enterprise cloud & digital transformation",
        "Boutique partnership-driven solutions",
        "Corporate client case studies"
      ]
    },
    kindkidscrew: {
      title: "Kind Kids Crew",
      category: "Non-Profit / Community Service",
      client: "Kind Kids Crew",
      description: "Kind Kids Crew is a non-profit dedicated to instilling kindness and community service in children aged 6+ through random acts of kindness and volunteer programs.",
      image: "./assets/site_kindkidscrew.webp",
      url: "https://www.kindkidscrew.org/",
      highlights: [
        "Youth volunteer program coordination",
        "Community service campaign registration",
        "Non-profit mission and impact storytelling",
        "Donation and event support funnels"
      ]
    },
    bewell: {
      title: "Be Well Hospitals",
      category: "Healthcare / Hospital Chain",
      client: "Be Well Group",
      description: "Be Well Group is redefining healthcare in South India, providing accessible, affordable, and high-quality medical care with transparent pricing and ethical practices.",
      image: "./assets/site_bewell.webp",
      url: "https://www.bewellhospitals.in/",
      highlights: [
        "Multi-location clinic and hospital directory",
        "Transparent treatment package pricing",
        "Specialist doctor consultation scheduling",
        "Patient health records and resources"
      ]
    },
    hercyclopedia: {
      title: "Hercyclopedia",
      category: "Lifestyle / Women Community",
      client: "Hercyclopedia",
      description: "Hercyclopedia is a digital knowledge and community platform dedicated to women's holistic health, wellness, career growth, leadership, and lifestyle empowerment.",
      image: "./assets/site_hercyclopedia.webp",
      url: "https://hercyclopedia.com/",
      highlights: [
        "Expert-curated women's health library",
        "Community forums and discussion groups",
        "Interactive wellness and lifestyle guides",
        "Editorial articles and resource downloads"
      ]
    },
    sprandco: {
      title: "SPR & Co.",
      category: "Corporate / Business Innovation",
      client: "SPR & Co.",
      description: "Founded in 2002, SPR & Co. focuses on business innovation through technology, corporate governance, financial consulting, and industry best practices with 400+ experts.",
      image: "./assets/site_sprandco.webp",
      url: "https://sprandco.com/",
      highlights: [
        "Over two decades of business leadership (Est. 2002)",
        "Strategic financial & corporate advisory",
        "Client performance and profitability solutions",
        "Executive consulting framework"
      ]
    }
  };

  const projectModal = document.getElementById('projectModal');
  const projectModalBody = document.getElementById('projectModalBody');

  window.openProjectModal = function(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    projectModalBody.innerHTML = `
      <div class="case-study-modal-body">
        <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.75rem;">
          <span class="section-tag" style="margin-bottom: 0;">${data.category}</span>
        </div>
        <h2 style="font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin-bottom: 1rem;">${data.title}</h2>
        <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem;">
          ${data.description}
        </p>

        <img src="${data.image}" alt="${data.title}" class="case-study-preview-img" />

        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 2rem;">
          <h4 style="font-size: 1.1rem; color: var(--gold-light); margin-bottom: 1rem;">Key Strategic Deliverables</h4>
          <ul style="list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem;">
            ${data.highlights.map(item => `
              <li style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; color: var(--text-secondary);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ${item}
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <a href="${data.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <span>Visit Live Website</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <button class="btn btn-secondary" onclick="closeAllModals()">Close Case Study</button>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // 6. Video Showcase Catalog & Multi-Video Modal Handlers
  const videoCatalog = {
    v1: {
      category: "GEM Hospital • Medical & Surgical Awareness (2 Videos)",
      title: "Surgery Innovation & Medical Awareness",
      description: "Healthcare films produced for GEM Hospitals highlighting robotic and laparoscopic surgical innovation as well as specialist medical health awareness.",
      videos: [
        {
          id: "X2cSQ4ngkJk",
          title: "Operation Infinity: Redefining the Future of Surgery — GEM Hospital Chennai",
          url: "https://www.youtube.com/watch?v=X2cSQ4ngkJk",
          thumb: "https://img.youtube.com/vi/X2cSQ4ngkJk/hqdefault.jpg"
        },
        {
          id: "S9sqCNEf9qM",
          title: "Understanding Obesity: Science & Simple Lifestyle Fixes | Ft. Dr. Jayanth Leo — GEM Hospital",
          url: "https://www.youtube.com/watch?v=S9sqCNEf9qM",
          thumb: "https://img.youtube.com/vi/S9sqCNEf9qM/hqdefault.jpg"
        }
      ]
    },
    v2: {
      category: "GEM Hospital • Podcast & Robotic Surgery (2 Videos)",
      title: "Doctor Podcast & Robotic Surgery Innovation",
      description: "Medical podcast series and robotic surgical facility walkthroughs produced for GEM Hospital Chennai.",
      videos: [
        {
          id: "Qc8iDEH4SNQ",
          title: "Dr Gem Podcast Season-1 Episode-1 | GEM Hospital Chennai",
          url: "https://www.youtube.com/watch?v=Qc8iDEH4SNQ",
          thumb: "https://img.youtube.com/vi/Qc8iDEH4SNQ/hqdefault.jpg"
        },
        {
          id: "PqOHCmj1AKk",
          title: "Inside Robotic Surgery: How It Works | GEM Hospital Chennai",
          url: "https://www.youtube.com/watch?v=PqOHCmj1AKk",
          thumb: "https://img.youtube.com/vi/PqOHCmj1AKk/hqdefault.jpg"
        }
      ]
    },
    v3: {
      category: "Brand & Agency Story (2 Videos)",
      title: "Brand Transformation & Development Services",
      description: "Reach Skyline brand film showcase spotlighting customer experience, web development services, and strategic brand transformation.",
      videos: [
        {
          id: "ML--jw--ALk",
          title: "Revolutionize Your Customer Experience: The Reach Skyline Approach to Service Excellence",
          url: "https://www.youtube.com/watch?v=ML--jw--ALk",
          thumb: "https://img.youtube.com/vi/ML--jw--ALk/hqdefault.jpg"
        },
        {
          id: "SGhJ3dkgcVM",
          title: "From Strategy to Creativity: How Reach Skyline Transforms Your Brand",
          url: "https://www.youtube.com/watch?v=SGhJ3dkgcVM",
          thumb: "https://img.youtube.com/vi/SGhJ3dkgcVM/hqdefault.jpg"
        }
      ]
    },
    v4: {
      category: "Commercial Film (2 Videos)",
      title: "Digital Sales & Brand Experience",
      description: "High-energy commercial productions spotlighting digital sales funnels and performance metrics analysis.",
      videos: [
        {
          id: "Fzgml5Tc5aE",
          title: "Video 1: Digital Sales & E-Commerce Campaign",
          url: "https://www.youtube.com/watch?v=Fzgml5Tc5aE",
          thumb: "https://img.youtube.com/vi/Fzgml5Tc5aE/hqdefault.jpg"
        },
        {
          id: "tZS_TXeljtA",
          title: "Video 2: Metrics & Growth Analytics Overview",
          url: "https://www.youtube.com/watch?v=tZS_TXeljtA",
          thumb: "https://img.youtube.com/vi/tZS_TXeljtA/hqdefault.jpg"
        }
      ]
    },
    v5: {
      category: "Brand Narrative (2 Videos)",
      title: "Podcast & Creative Excellence",
      description: "Reach Skyline original podcast episodes and thought leadership video series with founders and creators.",
      videos: [
        {
          id: "k44pBI88Clc",
          title: "Video 1: Reach Skyline Podcast — Season 2",
          url: "https://www.youtube.com/watch?v=k44pBI88Clc",
          thumb: "https://img.youtube.com/vi/k44pBI88Clc/hqdefault.jpg"
        },
        {
          id: "wRBWr_kLh5M",
          title: "Video 2: Agency Growth & Creative Conversations",
          url: "https://www.youtube.com/watch?v=wRBWr_kLh5M",
          thumb: "https://img.youtube.com/vi/wRBWr_kLh5M/hqdefault.jpg"
        }
      ]
    },
    v6: {
      category: "Ad Commercial",
      title: "National Campaign Commercial",
      description: "High-impact brand ecosystem film and commercial advertisement engineered for multi-platform distribution.",
      videos: [
        {
          id: "360UMrrKyOM",
          title: "Video 1: D-Medva — Healthcare Marketing Ecosystem Commercial",
          url: "https://www.youtube.com/watch?v=360UMrrKyOM",
          thumb: "https://img.youtube.com/vi/360UMrrKyOM/hqdefault.jpg"
        }
      ]
    }
  };

  const videoModal = document.getElementById('videoModal');
  const videoPlayerContainer = document.getElementById('videoPlayerContainer');

  window.videoCatalog = videoCatalog;

  window.openVideoShowcase = function(showcaseKey) {
    const data = videoCatalog[showcaseKey];
    if (!data) return;

    window.currentShowcaseKey = showcaseKey;
    renderVideoModal(showcaseKey, data.videos[0].id);
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.switchShowcaseVideo = function(showcaseKey, selectedVideoId) {
    renderVideoModal(showcaseKey, selectedVideoId);
  };

  window.renderVideoModal = function(showcaseKey, selectedVideoId) {
    const data = typeof showcaseKey === 'string' ? videoCatalog[showcaseKey] : showcaseKey;
    const currentKey = typeof showcaseKey === 'string' ? showcaseKey : window.currentShowcaseKey || 'v1';
    if (!data) return;

    const activeVid = data.videos.find(v => v.id === selectedVideoId) || data.videos[0];
    
    videoPlayerContainer.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="section-tag" style="margin-bottom: 0.35rem;">${data.category}</span>
        <h3 style="font-size: clamp(1.4rem, 2.5vw, 1.85rem); margin-bottom: 0.4rem;">${data.title}</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.25rem;">${data.description}</p>
      </div>

      <!-- Active Video Thumbnail Player Card (Big Screen) -->
      <div style="margin-bottom: 1.5rem;">
        <div style="position: relative; width: 100%; padding-top: 56.25%; border-radius: 12px; overflow: hidden; background: #000; border: 1px solid var(--border-subtle); cursor: pointer;" onclick="window.open('${activeVid.url}', '_blank')">
          <img src="${activeVid.thumb}" alt="${activeVid.title}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85);" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(7,7,9,0.92) 0%, rgba(7,7,9,0.3) 60%, transparent 100%);"></div>
          
          <!-- Big YouTube Play Button -->
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 72px; height: 72px; border-radius: 50%; background: #ff0000; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(255, 0, 0, 0.5);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
          
          <!-- Bottom Info Bar -->
          <div style="position: absolute; bottom: 1.25rem; left: 1.25rem; right: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <div style="font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: 0.25rem;">${activeVid.title}</div>
              <div style="font-size: 0.8rem; color: #f1f5f9; font-family: var(--font-mono);">Official Client Video • Click to Watch on YouTube</div>
            </div>
            <a href="${activeVid.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" onclick="event.stopPropagation()">
              <span>Watch on YouTube</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Video Selection Tabs & Both YouTube Links -->
      <div style="margin-bottom: 1rem;">
        <h4 style="font-size: 1rem; color: var(--gold-light); margin-bottom: 0.75rem; text-transform: uppercase; font-family: var(--font-mono); letter-spacing: 0.05em;">
          Select Video from this Production (${data.videos.length} ${data.videos.length > 1 ? 'Videos' : 'Video'})
        </h4>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
          ${data.videos.map((vid, idx) => `
            <div style="background: ${vid.id === activeVid.id ? 'rgba(0, 0, 0, 0.04)' : 'var(--bg-surface)'}; border: 1px solid ${vid.id === activeVid.id ? 'var(--gold-primary)' : 'var(--border-subtle)'}; border-radius: 10px; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; transition: all 0.2s ease;">
              <div style="display: flex; gap: 0.75rem; align-items: center; cursor: pointer;" onclick="switchShowcaseVideo('${currentKey}', '${vid.id}')">
                <div style="position: relative; width: 90px; height: 55px; border-radius: 6px; overflow: hidden; flex-shrink: 0; background: #000;">
                  <img src="${vid.thumb}" alt="${vid.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                  <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.35);">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                </div>
                <div style="flex-grow: 1;">
                  <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary); line-height: 1.35; margin-bottom: 0.25rem;">${vid.title}</div>
                  <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">YouTube Link</span>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                <button class="btn btn-sm ${vid.id === activeVid.id ? 'btn-primary' : 'btn-secondary'}" style="flex: 1; font-size: 0.8rem;" onclick="switchShowcaseVideo('${currentKey}', '${vid.id}')">
                  ${vid.id === activeVid.id ? '▶ Selected' : 'Select Video'}
                </button>
                <a href="${vid.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-gold" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;">
                  <span>Watch on YouTube</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  // Backward compatibility alias & Reel/Short Handlers
  window.openVideoModal = function(url, title) {
    if (url.includes('instagram.com/')) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (url.includes('youtube.com/shorts/')) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (url.includes('coyTnw9m3Xk') || url.includes('RsVyecVHpcM')) openVideoShowcase('v1');
    else if (url.includes('dMHPc2zpHGM') || url.includes('Yka3ljsJrQQ')) openVideoShowcase('v2');
    else if (url.includes('ML--jw--ALk') || url.includes('SGhJ3dkgcVM')) openVideoShowcase('v3');
    else if (url.includes('Fzgml5Tc5aE') || url.includes('tZS_TXeljtA')) openVideoShowcase('v4');
    else if (url.includes('k44pBI88Clc') || url.includes('wRBWr_kLh5M')) openVideoShowcase('v5');
    else openVideoShowcase('v6');
  };

  // 7. Image Lightbox
  const imageLightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  window.openLightbox = function(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.innerText = caption || 'Reach Skyline Creative Portfolio';
    imageLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // 8. Contact Modal
  const contactModal = document.getElementById('contactModal');

  window.openContactModal = function(servicePreselect) {
    if (servicePreselect) {
      const selectElem = document.getElementById('contactService');
      if (selectElem) selectElem.value = servicePreselect;
    }
    const formElem = document.getElementById('projectInquiryForm');
    const successElem = document.getElementById('contactFormSuccess');
    if (formElem) formElem.style.display = 'block';
    if (successElem) successElem.style.display = 'none';

    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close Modals Universal
  window.closeAllModals = function() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
    if (videoPlayerContainer) videoPlayerContainer.innerHTML = '';
  };

  // Modal Backdrop Clicks & Escape Key
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Contact Form Submission Handler (Sends to Solutions@reachskyline.com)
  const contactForm = document.getElementById('projectInquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('contactSubmitBtn');
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const service = document.getElementById('contactService').value;
      const message = document.getElementById('contactMessage').value.trim();
      const formSuccess = document.getElementById('contactFormSuccess');

      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending Inquiry...</span><svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle></svg>`;
      }

      const rawSubject = `Project Inquiry: ${service} - ${name}`;
      const rawBody = `Hi Reach Skyline Team,\n\nI would like to discuss a project with Reach Skyline.\n\nName / Organization: ${name}\nEmail: ${email}\nService Interested: ${service}\n\nProject Details & Goals:\n${message}\n\n--\nSent from Reach Skyline Portfolio`;

      const encSubject = encodeURIComponent(rawSubject);
      const encBody = encodeURIComponent(rawBody);

      const mailtoUrl = `mailto:Solutions@reachskyline.com?subject=${encSubject}&body=${encBody}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Solutions@reachskyline.com&su=${encSubject}&body=${encBody}`;

      // Set direct email links
      const gmailBtn = document.getElementById('gmailDirectLink');
      if (gmailBtn) {
        gmailBtn.href = gmailUrl;
      }
      const mailAppBtn = document.getElementById('mailAppDirectLink');
      if (mailAppBtn) {
        mailAppBtn.href = mailtoUrl;
      }

      // Dual delivery: Send via background API with reply-to headers
      try {
        fetch("https://formsubmit.co/ajax/Solutions@reachskyline.com", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _replyto: email,
            service: service,
            message: message,
            _subject: `[Reach Skyline Portfolio] Project Inquiry from ${name} - ${service}`,
            _template: 'table'
          })
        }).catch(() => {});
      } catch (err) {}

      // Automatically launch default email app
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 150);

      // Transition to success & direct dispatch screen
      contactForm.reset();
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }

  // Initialize Ad Posters Mobile Marquee Duplicates
  const adGrid = document.getElementById('adPostersGrid');
  if (adGrid && !adGrid.getAttribute('data-cloned')) {
    adGrid.classList.add('is-all-active');
    adGrid.setAttribute('data-active-client', 'all');
    const originalCards = Array.from(adGrid.querySelectorAll('.ad-poster-card:not([data-ad-clone="true"])'));
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('data-ad-clone', 'true');
      clone.setAttribute('aria-hidden', 'true');
      adGrid.appendChild(clone);
    });
    adGrid.setAttribute('data-cloned', 'true');
  }
});

/**
 * Filter Social Media & Brand Channel Portals by Client
 */
function filterSocialClient(clientId, btn) {
  document.querySelectorAll('.client-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const matchingBtn = document.querySelector(`.client-filter-btn[onclick*="'${clientId}'"]`);
    if (matchingBtn) matchingBtn.classList.add('active');
  }

  const cards = document.querySelectorAll('.brand-showcase-card');
  cards.forEach(card => {
    if (clientId === 'all' || card.getAttribute('data-client') === clientId) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

/**
 * Filter Paid Media & Ad Creatives by Client
 * Auto-scroll marquee active ONLY for 'all' on mobile.
 * When individual client selected: static grid without scrolling.
 */
function filterAdClient(clientKey, btn) {
  document.querySelectorAll('.ad-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const matchingBtn = document.querySelector(`.ad-filter-btn[data-target="${clientKey}"]`);
    if (matchingBtn) matchingBtn.classList.add('active');
  }

  const grid = document.getElementById('adPostersGrid');
  if (grid) {
    grid.style.opacity = '0.3';
    grid.setAttribute('data-active-client', clientKey);
    if (clientKey === 'all') {
      grid.classList.add('is-all-active');
    } else {
      grid.classList.remove('is-all-active');
    }
  }

  setTimeout(() => {
    const cards = document.querySelectorAll('.ad-poster-card');
    cards.forEach(card => {
      const isClone = card.getAttribute('data-ad-clone') === 'true';
      if (clientKey === 'all') {
        card.style.display = 'flex';
      } else {
        if (isClone) {
          card.style.display = 'none';
        } else if (card.getAttribute('data-ad-client') === clientKey) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      }
    });
    if (grid) {
      grid.style.opacity = '1';
    }
  }, 150);
}

/**
 * Scroll looping carousel track
 */
function scrollCarousel(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const cardWidth = 300;
  if (direction === 'left') {
    if (track.scrollLeft <= 10) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  } else {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }
}
