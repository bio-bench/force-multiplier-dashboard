// Set current timestamp and initialize filters
document.addEventListener('DOMContentLoaded', function() {
    const timestampElement = document.getElementById('timestamp');
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    timestampElement.textContent = now.toLocaleDateString('en-US', options);
    
    // Initialize filter functionality
    initializeFilters();
});

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Project data
const projects = {
    'protein-ligand': {
        title: 'Protein–Ligand Predictor',
        status: 'Scale',
        owner: 'AIML Lead, London',
        currentPhase: 'Proof-of-Concept complete',
        phase2Goal: 'Embed predictor into hit triage pipeline by Q2',
        primaryKPI: '↓ 20% wet-lab validation cost per hit',
        secondaryKPI: '↑ 15% recall vs. baseline predictor',
        biologicalTranslation: 'In vitro validation underway — 30% hit rate vs predicted',
        blockers: 'Dataset harmonization (Boston ↔ SF), compute queue (Tel Aviv)',
        dependencies: 'Data ingestion pipeline v2, compute credits (Cerebras)',
        timeline: 'Kickoff: Oct 2025 → Deliverable: Mar 2026',
        automations: 'Weekly LLM-generated Jira digest + Slack KPI summaries',
        nextSteps: '1) Resolve dataset harmonization, 2) Pilot predictor in Boston pipeline',
        impact: 'High',
        resources: 'Moderate'
    },
    'multi-omics': {
        title: 'Multi-Omics Data Harmonization',
        status: 'Hold',
        owner: 'Data Engineering Lead, Boston',
        currentPhase: 'Pilot pipeline across 2 therapeutic areas',
        phase2Goal: 'Scale ingestion + QC across all AIML sites',
        primaryKPI: '95% dataset QC pass rate',
        secondaryKPI: '↓ Manual curation time by 40%',
        biologicalTranslation: 'Cross-lab reproducibility validated (80% concordance)',
        blockers: 'Legacy format incompatibility (Tel Aviv)',
        dependencies: 'Secure compute environment approval (London)',
        timeline: 'Kickoff: Nov 2025 → Deliverable: Apr 2026',
        automations: 'Automated data lineage reports + Slack anomaly alerts',
        nextSteps: '1) Resolve format conversion, 2) Expand to 2 additional TA datasets',
        impact: 'Medium',
        resources: 'High'
    },
    'generative-molecule': {
        title: 'Generative Molecule Design (GAN Models)',
        status: 'Deprioritize',
        owner: 'Research Scientist, Tel Aviv',
        currentPhase: 'In-silico model benchmarked',
        phase2Goal: 'Validate top 50 candidates in vitro',
        primaryKPI: '≥ 25% candidate survival post in vitro screen',
        secondaryKPI: 'Novelty score (Tanimoto < 0.6 to known compounds)',
        biologicalTranslation: 'In vitro validation pending (Q1 2026)',
        blockers: 'Wet-lab slot availability, compound synthesis bottleneck',
        dependencies: 'Supplier contracts, synthesis pipeline capacity',
        timeline: 'Kickoff: Dec 2025 → Deliverable: Jun 2026',
        automations: 'Weekly GAN training metrics → auto-report',
        nextSteps: '1) Prioritize candidate list, 2) Secure synthesis capacity',
        impact: 'Uncertain',
        resources: 'Very High'
    },
    'drug-discovery-ai': {
        title: 'Drug Discovery AI Pipeline',
        status: 'Scale',
        owner: 'Senior ML Engineer, San Francisco',
        currentPhase: 'Production deployment complete',
        phase2Goal: 'Expand to 3 additional therapeutic areas',
        primaryKPI: '↑ 40% screening efficiency vs manual methods',
        secondaryKPI: '85% prediction accuracy on validation set',
        biologicalTranslation: 'Validated across 2 TAs with 85% accuracy',
        blockers: 'GPU compute capacity, data privacy compliance',
        dependencies: 'Cloud infrastructure scaling, regulatory approval',
        timeline: 'Kickoff: Jan 2026 → Deliverable: Jul 2026',
        automations: 'Real-time performance monitoring + automated retraining',
        nextSteps: '1) Scale infrastructure, 2) Onboard new TA datasets',
        impact: 'High',
        resources: 'Moderate'
    },
    'clinical-trial-optimizer': {
        title: 'Clinical Trial Optimizer',
        status: 'Hold',
        owner: 'Clinical Data Scientist, Boston',
        currentPhase: 'Model validation in progress',
        phase2Goal: 'Deploy across 5 active trials',
        primaryKPI: '↑ 25% enrollment efficiency',
        secondaryKPI: '↓ 30% patient dropout rate',
        biologicalTranslation: 'Pilot trial shows 20% improvement in enrollment',
        blockers: 'Regulatory approval, data sharing agreements',
        dependencies: 'Clinical trial management system integration',
        timeline: 'Kickoff: Feb 2026 → Deliverable: Aug 2026',
        automations: 'Daily enrollment predictions + risk alerts',
        nextSteps: '1) Complete regulatory review, 2) Finalize integration specs',
        impact: 'Medium',
        resources: 'High'
    },
    'quantum-chemistry': {
        title: 'Quantum Chemistry Simulator',
        status: 'Deprioritize',
        owner: 'Quantum Computing Researcher, Tel Aviv',
        currentPhase: 'Theoretical framework development',
        phase2Goal: 'Validate against experimental data',
        primaryKPI: '95% accuracy vs experimental results',
        secondaryKPI: '10x speedup vs classical methods',
        biologicalTranslation: 'No experimental validation yet',
        blockers: 'Quantum hardware limitations, algorithm complexity',
        dependencies: 'Quantum computer access, experimental data partnerships',
        timeline: 'Kickoff: Mar 2026 → Deliverable: Dec 2026',
        automations: 'Automated benchmarking against classical methods',
        nextSteps: '1) Secure quantum hardware access, 2) Establish data partnerships',
        impact: 'Uncertain',
        resources: 'Very High'
    }
};

// Open project detail page
function openProject(projectId) {
    const project = projects[projectId];
    if (!project) return;

    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${project.title}</h2>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="project-details">
                    <div class="detail-section">
                        <h3>Project Overview</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <span class="label">Owner:</span>
                                <span class="value">${project.owner}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label">Current Phase:</span>
                                <span class="value">${project.currentPhase}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label">Phase 2 Goal:</span>
                                <span class="value">${project.phase2Goal}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label">Status:</span>
                                <span class="value status-${project.status.toLowerCase()}">${project.status}</span>
                            </div>
                        </div>
                    </div>

                    <div class="detail-section">
                        <h3>Key Performance Indicators</h3>
                        <div class="kpi-grid">
                            <div class="kpi-item primary">
                                <span class="kpi-label">Primary KPI:</span>
                                <span class="kpi-value">${project.primaryKPI}</span>
                            </div>
                            <div class="kpi-item secondary">
                                <span class="kpi-label">Secondary KPI:</span>
                                <span class="kpi-value">${project.secondaryKPI}</span>
                            </div>
                        </div>
                    </div>

                    <div class="detail-section">
                        <h3>Biological Translation Check</h3>
                        <p class="translation-text">${project.biologicalTranslation}</p>
                    </div>

                    <div class="detail-section">
                        <h3>Current Status</h3>
                        <div class="status-grid">
                            <div class="status-item">
                                <span class="status-label">Blockers:</span>
                                <span class="status-value">${project.blockers}</span>
                            </div>
                            <div class="status-item">
                                <span class="status-label">Dependencies:</span>
                                <span class="status-value">${project.dependencies}</span>
                            </div>
                            <div class="status-item">
                                <span class="status-label">Timeline:</span>
                                <span class="status-value">${project.timeline}</span>
                            </div>
                        </div>
                    </div>

                    <div class="detail-section">
                        <h3>Automations</h3>
                        <p class="automation-text">${project.automations}</p>
                    </div>

                    <div class="detail-section">
                        <h3>Next Steps (30 days)</h3>
                        <p class="next-steps-text">${project.nextSteps}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }

        .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2d3748;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 2rem;
            color: #a0aec0;
            cursor: pointer;
            padding: 0;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .close-btn:hover {
            color: #4a5568;
        }

        .modal-body {
            padding: 2rem;
        }

        .detail-section {
            margin-bottom: 2rem;
        }

        .detail-section h3 {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e2e8f0;
        }

        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
        }

        .detail-item {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .detail-item .label {
            font-size: 0.85rem;
            color: #718096;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .detail-item .value {
            font-size: 0.95rem;
            color: #4a5568;
            font-weight: 500;
        }

        .status-scale {
            color: #38a169;
            font-weight: 600;
        }

        .status-hold {
            color: #ed8936;
            font-weight: 600;
        }

        .status-deprioritize {
            color: #e53e3e;
            font-weight: 600;
        }

        .kpi-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .kpi-item {
            background: #f7fafc;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #3182ce;
        }

        .kpi-item.secondary {
            border-left-color: #38a169;
        }

        .kpi-label {
            font-size: 0.85rem;
            color: #718096;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
            margin-bottom: 0.5rem;
        }

        .kpi-value {
            font-size: 1rem;
            color: #2d3748;
            font-weight: 600;
        }

        .translation-text, .automation-text, .next-steps-text {
            background: #f7fafc;
            padding: 1rem;
            border-radius: 8px;
            color: #4a5568;
            line-height: 1.6;
        }

        .status-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .status-item {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .status-label {
            font-size: 0.85rem;
            color: #718096;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .status-value {
            font-size: 0.95rem;
            color: #4a5568;
            font-weight: 500;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                margin: 1rem;
            }
            
            .modal-header, .modal-body {
                padding: 1rem;
            }
            
            .detail-grid {
                grid-template-columns: 1fr;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}
