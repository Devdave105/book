// ===== Portfolio Management Module =====

// Portfolio data structure
let currentPortfolio = {
    id: '',
    userId: '',
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    skills: [],
    projects: [],
    sections: ['about', 'projects', 'skills', 'contact'],
    accentColor: '#2563EB',
    createdAt: '',
    updatedAt: ''
};

// Initialize portfolio on page load
document.addEventListener('DOMContentLoaded', function() {
    const isDashboard = document.querySelector('.dashboard-page');
    
    if (isDashboard) {
        initDashboard();
    } else {
        initInteractiveDemo();
    }
});

// ===== Interactive Demo (Homepage) =====
function initInteractiveDemo() {
    const demoNameInput = document.getElementById('demoName');
    const demoTitleInput = document.getElementById('demoTitle');
    const demoBioInput = document.getElementById('demoBio');
    const colorRadios = document.querySelectorAll('input[name="demoColor"]');
    const demoResetBtn = document.getElementById('demoReset');

    if (!demoNameInput) return;

    // Update preview on input change
    demoNameInput.addEventListener('input', function() {
        document.getElementById('previewName').textContent = this.value || 'Alex Johnson';
    });

    demoTitleInput.addEventListener('input', function() {
        document.getElementById('previewTitle').textContent = this.value || 'Creative Designer & Developer';
    });

    demoBioInput.addEventListener('input', function() {
        document.getElementById('previewBio').textContent = this.value || 'Passionate about creating beautiful and functional digital experiences...';
    });

    // Color change
    colorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const previewCard = document.querySelector('.portfolio-card');
            document.documentElement.style.setProperty('--demo-accent', this.value);
            updateDemoAccentColor(this.value);
        });
    });

    // Reset demo
    if (demoResetBtn) {
        demoResetBtn.addEventListener('click', function() {
            demoNameInput.value = 'Alex Johnson';
            demoTitleInput.value = 'Creative Designer & Developer';
            demoBioInput.value = 'Passionate about creating beautiful and functional digital experiences. With 5+ years of experience in design and development, I help brands achieve their goals.';
            document.querySelector('input[name="demoColor"][value="#2563EB"]').checked = true;
            
            document.getElementById('previewName').textContent = 'Alex Johnson';
            document.getElementById('previewTitle').textContent = 'Creative Designer & Developer';
            document.getElementById('previewBio').textContent = 'Passionate about creating beautiful and functional digital experiences. With 5+ years of experience in design and development, I help brands achieve their goals.';
            updateDemoAccentColor('#2563EB');
        });
    }
}

function updateDemoAccentColor(color) {
    const previewCard = document.querySelector('.portfolio-card');
    if (previewCard) {
        previewCard.style.borderColor = color;
        const avatar = previewCard.querySelector('.portfolio-avatar');
        if (avatar) {
            avatar.style.background = `linear-gradient(135deg, ${color}, ${adjustColor(color, -20)})`;
        }
    }
}

function adjustColor(color, percent) {
    // Simple color adjustment for demo
    return color; // Keep it simple for demo
}

// ===== Dashboard Initialization =====
function initDashboard() {
    checkDashboardAuth();
    loadPortfolioData();
    setupDashboardListeners();
    renderPortfolioSections();
    updateLivePreview();
}

function checkDashboardAuth() {
    const session = getCurrentUser();
    if (!session) {
        window.location.href = 'login.html';
        return;
    }
}

// ===== Load Portfolio Data =====
function loadPortfolioData() {
    const session = getCurrentUser();
    if (!session) return;

    const portfolios = JSON.parse(localStorage.getItem('portabuild_portfolios')) || [];
    let portfolio = portfolios.find(p => p.userId === session.id);

    if (!portfolio) {
        // Create new portfolio
        portfolio = {
            id: 'portfolio_' + Date.now(),
            userId: session.id,
            name: session.name,
            title: '',
            bio: '',
            email: session.email || '',
            phone: '',
            location: '',
            linkedin: '',
            github: '',
            website: '',
            skills: [],
            projects: [
                { id: 'proj_1', title: 'Project 1', description: 'Description of your first project', image: '' },
                { id: 'proj_2', title: 'Project 2', description: 'Description of your second project', image: '' }
            ],
            sections: ['about', 'projects', 'skills', 'contact'],
            accentColor: '#2563EB',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        portfolios.push(portfolio);
        localStorage.setItem('portabuild_portfolios', JSON.stringify(portfolios));
    }

    currentPortfolio = portfolio;

    // Populate form with portfolio data
    populatePortfolioForm();
}

// ===== Populate Form =====
function populatePortfolioForm() {
    document.getElementById('portfolioName').value = currentPortfolio.name || '';
    document.getElementById('portfolioTitle').value = currentPortfolio.title || '';
    document.getElementById('portfolioBio').value = currentPortfolio.bio || '';
    document.getElementById('portfolioEmail').value = currentPortfolio.email || '';
    document.getElementById('portfolioPhone').value = currentPortfolio.phone || '';
    document.getElementById('portfolioLocation').value = currentPortfolio.location || '';
    document.getElementById('portfolioLinkedin').value = currentPortfolio.linkedin || '';
    document.getElementById('portfolioGithub').value = currentPortfolio.github || '';
    document.getElementById('portfolioWebsite').value = currentPortfolio.website || '';
    document.getElementById('portfolioSkills').value = currentPortfolio.skills.join(', ') || '';

    // Set accent color
    const accentRadios = document.querySelectorAll('input[name="accentColor"]');
    accentRadios.forEach(radio => {
        if (radio.value === currentPortfolio.accentColor) {
            radio.checked = true;
        }
    });

    // Populate projects
    renderProjectsList();
}

// ===== Render Projects List =====
function renderProjectsList() {
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';

    currentPortfolio.projects.forEach((project, index) => {
        const projectForm = document.createElement('div');
        projectForm.className = 'project-form';
        projectForm.innerHTML = `
            <h4>
                Project ${index + 1}
                <button type="button" class="remove-project-btn" onclick="removeProject('${project.id}')">×</button>
            </h4>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="project-title" value="${project.title}" placeholder="Project title">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="project-description" placeholder="Brief description">${project.description}</textarea>
            </div>
            <div class="form-group">
                <label>Link / URL (optional)</label>
                <input type="url" class="project-link" value="${project.image || ''}" placeholder="https://...">
            </div>
        `;

        projectsList.appendChild(projectForm);

        // Add event listeners
        projectForm.querySelector('.project-title').addEventListener('input', function() {
            project.title = this.value;
            updateLivePreview();
        });

        projectForm.querySelector('.project-description').addEventListener('input', function() {
            project.description = this.value;
            updateLivePreview();
        });

        projectForm.querySelector('.project-link').addEventListener('input', function() {
            project.image = this.value;
        });
    });
}

// ===== Setup Dashboard Listeners =====
function setupDashboardListeners() {
    // Form submission
    const portfolioForm = document.getElementById('portfolioForm');
    if (portfolioForm) {
        portfolioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            savePortfolio();
        });
    }

    // Add project
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            addProject();
        });
    }

    // Add section
    const addSectionBtn = document.getElementById('addSectionBtn');
    if (addSectionBtn) {
        addSectionBtn.addEventListener('click', function() {
            openAddSectionModal();
        });
    }

    // Reset form
    const resetFormBtn = document.getElementById('resetFormBtn');
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', function() {
            populatePortfolioForm();
        });
    }

    // Refresh preview
    const refreshPreviewBtn = document.getElementById('refreshPreviewBtn');
    if (refreshPreviewBtn) {
        refreshPreviewBtn.addEventListener('click', function() {
            updateLivePreview();
        });
    }

    // Publish portfolio
    const publishBtn = document.getElementById('publishBtn');
    if (publishBtn) {
        publishBtn.addEventListener('click', function() {
            publishPortfolio();
        });
    }

    // Export HTML
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportPortfolioHTML();
        });
    }

    // Accent color change
    const colorRadios = document.querySelectorAll('input[name="accentColor"]');
    colorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            currentPortfolio.accentColor = this.value;
            updateLivePreview();
            savePortfolio();
        });
    });

    // Modal cancel
    const cancelSectionBtn = document.getElementById('cancelSectionBtn');
    if (cancelSectionBtn) {
        cancelSectionBtn.addEventListener('click', function() {
            closeAddSectionModal();
        });
    }

    // Section options
    const sectionOptions = document.querySelectorAll('.section-option');
    sectionOptions.forEach(option => {
        option.addEventListener('click', function() {
            const sectionType = this.dataset.type;
            if (!currentPortfolio.sections.includes(sectionType)) {
                currentPortfolio.sections.push(sectionType);
                renderPortfolioSections();
                updateLivePreview();
                closeAddSectionModal();
            }
        });
    });

    // Form input listeners
    const formInputs = document.querySelectorAll('.portfolio-form input, .portfolio-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            const key = this.id.replace('portfolio', '').toLowerCase();
            if (key === 'skills') {
                currentPortfolio.skills = this.value.split(',').map(s => s.trim()).filter(s => s);
            } else {
                currentPortfolio[key] = this.value;
            }
            updateLivePreview();
        });

        // Debounced live preview on input
        input.addEventListener('input', debounce(function() {
            updateLivePreview();
        }, 500));
    });
}

// ===== Render Portfolio Sections =====
function renderPortfolioSections() {
    const sectionsList = document.getElementById('sectionsList');
    sectionsList.innerHTML = '';

    const sectionLabels = {
        'about': 'About',
        'projects': 'Projects',
        'skills': 'Skills',
        'contact': 'Contact'
    };

    currentPortfolio.sections.forEach((section, index) => {
        const sectionItem = document.createElement('div');
        sectionItem.className = 'section-item';
        sectionItem.draggable = true;
        sectionItem.dataset.section = section;
        sectionItem.innerHTML = `
            <span class="section-item-name">${sectionLabels[section]}</span>
            <div class="section-item-actions">
                <button type="button" class="section-item-btn" onclick="removeSection('${section}')" title="Remove">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;

        // Drag events
        sectionItem.addEventListener('dragstart', handleDragStart);
        sectionItem.addEventListener('dragend', handleDragEnd);
        sectionItem.addEventListener('dragover', handleDragOver);
        sectionItem.addEventListener('drop', handleDrop);

        sectionsList.appendChild(sectionItem);
    });
}

// ===== Drag and Drop =====
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
}

function handleDragEnd(e) {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
    }
}

function handleDragOver(e) {
    e.preventDefault();
    if (draggedElement && draggedElement !== this) {
        const allItems = Array.from(document.querySelectorAll('.section-item'));
        const draggedIndex = allItems.indexOf(draggedElement);
        const targetIndex = allItems.indexOf(this);

        if (draggedIndex < targetIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }

        // Update sections order
        const newOrder = Array.from(document.querySelectorAll('.section-item')).map(item => item.dataset.section);
        currentPortfolio.sections = newOrder;
    }
}

function handleDrop(e) {
    e.preventDefault();
}

// ===== Portfolio Functions =====
function addProject() {
    const newProject = {
        id: 'proj_' + Date.now(),
        title: 'New Project',
        description: 'Project description',
        image: ''
    };

    currentPortfolio.projects.push(newProject);
    renderProjectsList();
    updateLivePreview();
}

function removeProject(projectId) {
    currentPortfolio.projects = currentPortfolio.projects.filter(p => p.id !== projectId);
    renderProjectsList();
    updateLivePreview();
}

function removeSection(section) {
    currentPortfolio.sections = currentPortfolio.sections.filter(s => s !== section);
    renderPortfolioSections();
    updateLivePreview();
}

function openAddSectionModal() {
    const modal = document.getElementById('addSectionModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}

function closeAddSectionModal() {
    const modal = document.getElementById('addSectionModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}

// ===== Save Portfolio =====
function savePortfolio() {
    // Update portfolio data from form
    currentPortfolio.name = document.getElementById('portfolioName').value;
    currentPortfolio.title = document.getElementById('portfolioTitle').value;
    currentPortfolio.bio = document.getElementById('portfolioBio').value;
    currentPortfolio.email = document.getElementById('portfolioEmail').value;
    currentPortfolio.phone = document.getElementById('portfolioPhone').value;
    currentPortfolio.location = document.getElementById('portfolioLocation').value;
    currentPortfolio.linkedin = document.getElementById('portfolioLinkedin').value;
    currentPortfolio.github = document.getElementById('portfolioGithub').value;
    currentPortfolio.website = document.getElementById('portfolioWebsite').value;
    currentPortfolio.skills = document.getElementById('portfolioSkills').value
        .split(',')
        .map(s => s.trim())
        .filter(s => s);
    currentPortfolio.updatedAt = new Date().toISOString();

    // Update projects from form
    document.querySelectorAll('.project-form').forEach((form, index) => {
        if (currentPortfolio.projects[index]) {
            currentPortfolio.projects[index].title = form.querySelector('.project-title').value;
            currentPortfolio.projects[index].description = form.querySelector('.project-description').value;
            currentPortfolio.projects[index].image = form.querySelector('.project-link').value;
        }
    });

    // Save to localStorage
    const portfolios = JSON.parse(localStorage.getItem('portabuild_portfolios')) || [];
    const index = portfolios.findIndex(p => p.id === currentPortfolio.id);

    if (index !== -1) {
        portfolios[index] = currentPortfolio;
    } else {
        portfolios.push(currentPortfolio);
    }

    localStorage.setItem('portabuild_portfolios', JSON.stringify(portfolios));

    // Show success message
    showPortfolioMessage('Portfolio saved successfully!', 'success');
}

// ===== Publish Portfolio =====
function publishPortfolio() {
    savePortfolio();
    currentPortfolio.published = true;
    currentPortfolio.publishedAt = new Date().toISOString();

    const portfolios = JSON.parse(localStorage.getItem('portabuild_portfolios')) || [];
    const index = portfolios.findIndex(p => p.id === currentPortfolio.id);
    if (index !== -1) {
        portfolios[index] = currentPortfolio;
    }

    localStorage.setItem('portabuild_portfolios', JSON.stringify(portfolios));
    showPortfolioMessage('Portfolio published successfully! 🎉', 'success');
}

// ===== Export Portfolio as HTML =====
function exportPortfolioHTML() {
    const portfolioHTML = generatePortfolioHTML();
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(portfolioHTML));
    element.setAttribute('download', `${currentPortfolio.name.replace(/\s/g, '-')}-portfolio.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showPortfolioMessage('Portfolio exported successfully!', 'success');
}

// ===== Generate Portfolio HTML =====
function generatePortfolioHTML() {
    const portfolio = currentPortfolio;
    
    let skillsHTML = '';
    if (portfolio.skills && portfolio.skills.length > 0) {
        skillsHTML = portfolio.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    }

    let projectsHTML = '';
    if (portfolio.projects && portfolio.projects.length > 0) {
        projectsHTML = portfolio.projects.map(project => `
            <div class="project-item">
                <div class="project-placeholder"></div>
                <div>
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                </div>
            </div>
        `).join('');
    }

    let sectionsHTML = '';
    if (portfolio.sections.includes('about')) {
        sectionsHTML += `
            <div class="portfolio-section">
                <h3>About</h3>
                <p>${portfolio.bio || ''}</p>
            </div>
        `;
    }
    if (portfolio.sections.includes('projects') && projectsHTML) {
        sectionsHTML += `
            <div class="portfolio-section">
                <h3>Projects</h3>
                ${projectsHTML}
            </div>
        `;
    }
    if (portfolio.sections.includes('skills') && skillsHTML) {
        sectionsHTML += `
            <div class="portfolio-section">
                <h3>Skills</h3>
                <div class="skills-list">${skillsHTML}</div>
            </div>
        `;
    }
    if (portfolio.sections.includes('contact')) {
        let contactHTML = '<div class="portfolio-section"><h3>Contact</h3>';
        if (portfolio.email) contactHTML += `<p>Email: <a href="mailto:${portfolio.email}">${portfolio.email}</a></p>`;
        if (portfolio.phone) contactHTML += `<p>Phone: ${portfolio.phone}</p>`;
        if (portfolio.location) contactHTML += `<p>Location: ${portfolio.location}</p>`;
        if (portfolio.linkedin || portfolio.github || portfolio.website) {
            contactHTML += '<div class="social-links">';
            if (portfolio.linkedin) contactHTML += `<a href="${portfolio.linkedin}">LinkedIn</a>`;
            if (portfolio.github) contactHTML += `<a href="${portfolio.github}">GitHub</a>`;
            if (portfolio.website) contactHTML += `<a href="${portfolio.website}">Website</a>`;
            contactHTML += '</div>';
        }
        contactHTML += '</div>';
        sectionsHTML += contactHTML;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolio.name} - Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #121212; color: #fff; line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .portfolio-card { background: #1E1E1E; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 1px solid ${portfolio.accentColor}; border-opacity: 0.2; }
        .portfolio-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid ${portfolio.accentColor}; border-bottom-opacity: 0.2; }
        .portfolio-avatar { width: 80px; height: 80px; background: linear-gradient(135deg, ${portfolio.accentColor}, #1d4ed8); border-radius: 50%; }
        h1 { font-size: 2rem; margin-bottom: 0.25rem; }
        .portfolio-title { color: #B0B0B0; font-size: 1.1rem; margin: 0; }
        .portfolio-section { margin-bottom: 2rem; }
        .portfolio-section h3 { font-size: 1.25rem; margin-bottom: 1rem; color: ${portfolio.accentColor}; }
        .project-item { display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #2563EB; border-bottom-opacity: 0.1; }
        .project-placeholder { width: 60px; height: 60px; background: ${portfolio.accentColor}; border-radius: 4px; flex-shrink: 0; }
        .skills-list { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .skill-tag { background: ${portfolio.accentColor}; color: #fff; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500; }
        .social-links { display: flex; gap: 1rem; margin-top: 1rem; }
        .social-links a { color: ${portfolio.accentColor}; text-decoration: none; font-weight: 500; }
        .social-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <div class="portfolio-card">
            <div class="portfolio-header">
                <div class="portfolio-avatar"></div>
                <div>
                    <h1>${portfolio.name}</h1>
                    <p class="portfolio-title">${portfolio.title}</p>
                </div>
            </div>
            ${sectionsHTML}
        </div>
    </div>
</body>
</html>`;
}

// ===== Update Live Preview =====
function updateLivePreview() {
    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;

    let skillsHTML = '';
    if (currentPortfolio.skills && currentPortfolio.skills.length > 0) {
        skillsHTML = `
            <div class="portfolio-section">
                <h3>Skills</h3>
                <div class="skills-list">
                    ${currentPortfolio.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
    }

    let projectsHTML = '';
    if (currentPortfolio.projects && currentPortfolio.projects.length > 0) {
        projectsHTML = `
            <div class="portfolio-section">
                <h3>Featured Projects</h3>
                ${currentPortfolio.projects.map(project => `
                    <div class="project-item">
                        <div class="project-placeholder"></div>
                        <div>
                            <h4>${project.title}</h4>
                            <p>${project.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    const portfolioCardHTML = `
        <div class="portfolio-card" style="border-color: ${currentPortfolio.accentColor};">
            <div class="portfolio-header">
                <div class="portfolio-avatar" style="background: linear-gradient(135deg, ${currentPortfolio.accentColor}, ${adjustColorBrightness(currentPortfolio.accentColor, -20)});"></div>
                <div class="portfolio-info">
                    <h2>${currentPortfolio.name || 'Your Name'}</h2>
                    <p>${currentPortfolio.title || 'Your Professional Title'}</p>
                </div>
            </div>
            ${currentPortfolio.bio ? `<div class="portfolio-bio"><p>${currentPortfolio.bio}</p></div>` : ''}
            ${projectsHTML}
            ${skillsHTML}
            ${currentPortfolio.sections.includes('contact') ? `
                <div class="portfolio-section">
                    <h3>Contact</h3>
                    ${currentPortfolio.email ? `<p>Email: <a href="mailto:${currentPortfolio.email}">${currentPortfolio.email}</a></p>` : ''}
                    ${currentPortfolio.phone ? `<p>Phone: ${currentPortfolio.phone}</p>` : ''}
                    ${currentPortfolio.location ? `<p>Location: ${currentPortfolio.location}</p>` : ''}
                </div>
            ` : ''}
        </div>
    `;

    previewContent.innerHTML = portfolioCardHTML;
}

// ===== Utility Functions =====
function adjustColorBrightness(color, percent) {
    return color; // Simplified for demo
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showPortfolioMessage(message, type) {
    const messageElement = document.querySelector('.editor-panel');
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(255, 107, 107, 0.9)'};
        color: #fff;
        border-radius: 0.5rem;
        z-index: 2000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

console.log('Portfolio management module loaded!');
