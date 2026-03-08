// Electronic Voting Machine (EVM) Application
// Secure voting system with cryptographic integrity and audit trail

class EVMSystem {
    constructor() {
        this.currentUser = null;
        this.selectedCandidate = null;
        this.auditLog = [];
        this.votes = [];
        this.systemConfig = {
            voting_enabled: true,
            election_name: "2025 Municipal Election",
            election_date: "2025-09-10",
            total_registered_voters: 150000,
            polling_start: "06:00",
            polling_end: "20:00"
        };
        this.candidates = [
            {
                candidate_id: "564600A97",
                name: "James Bond",
                party: "Star Alliance",
                vote_count: 0,
                color: "#2E86AB"
            },
            {
                candidate_id: "UY4564231", 
                name: "Charlotte Smith",
                party: "Congress",
                vote_count: 0,
                color: "#A23B72"
            },
            {
                candidate_id: "8675431AS",
                name: "William Johnson",
                party: "People's Democratic Front",
                vote_count: 0,
                color: "#F18F01"
            },
            {
                candidate_id: "43563232AG",
                name: "Emily Davis",
                party: "Order of the Phoenix",
                vote_count: 0,
                color: "#C73E1D"
            }
        ];
        this.voters = [
            {
                voter_id: "397754521",
                username: "kireeti",
                password: "kireeti123",
                name: "Kireeti Acharya",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: false,
                role: "voter"
            },
            {
                voter_id: "765674423", 
                username: "suman",
                password: "suman123",
                name: "Suman Mondal",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: false,
                role: "voter"
            },
                        {
                voter_id: "397752351",
                username: "vikas",
                password: "vikas123",
                name: "Vikas Reddy",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: false,
                role: "voter"
            },
            {
                voter_id: "762345523", 
                username: "varun",
                password: "varun123",
                name: "Varun Reddy",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: false,
                role: "voter"
            },
                        {
                voter_id: "564524521",
                username: "ananya",
                password: "ananya123",
                name: "Ananya Gupta",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: false,
                role: "voter"
            },
            {
                voter_id: "7546374323", 
                username: "shashank",
                password: "shashank123",
                name: "Shashank",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: false,
                role: "voter"
            },
                        {
                voter_id: "452344521",
                username: "vaibhavi",
                password: "vaibhavi123",
                name: "Vaibhavi",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: false,
                role: "voter"
            },
            {
                voter_id: "3243643423", 
                username: "nandini",
                password: "nandini123",
                name: "Nandini",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: false,
                role: "voter"
            },
                        {
                voter_id: "3345463661",
                username: "harika",
                password: "harika123",
                name: "Harika",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: false,
                role: "voter"
            },
            {
                voter_id: "3425242342", 
                username: "vaishnavi",
                password: "vaishnavi123",
                name: "Vaishnavi",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: false,
                role: "voter"
            },
            {
                voter_id: "admin101",
                username: "admin",
                password: "admin999",
                name: "Election Administrator",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: true,
                role: "admin"
            },
            {
                voter_id: "auditor420",
                username: "auditor",
                password: "audit999", 
                name: "System Auditor",
                registered: true,
                has_voted: false,
                last_vote_hash: null,
                biometric_verified: true,
                role: "auditor"
            }
        ];
        this.chart = null;
        this.generatedOTP = null;
        this.biometricVerified = false;
        
        this.init();
        this.initializeAuditLog();
        this.startRealTimeUpdates();
    }

    init() {
        console.log('Initializing EVM System...');
        
        // Initialize event listeners
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Initialize views based on current user
        this.showView('loginView');
        
        // Pre-populate username and password fields for demo
        setTimeout(() => {
            const usernameField = document.getElementById('username');
            const passwordField = document.getElementById('password');
            if (usernameField && passwordField) {
                usernameField.value = '';
                passwordField.value = '';
                console.log('Demo credentials pre-filled');
            }
        }, 100);
    }

    initializeAuditLog() {
        this.addAuditEntry('system', 'System initialized', { timestamp: Date.now() });
    }

    startRealTimeUpdates() {
        // Simulate real-time updates every 5 seconds
        setInterval(() => {
            if (this.currentUser && this.currentUser.role === 'admin') {
                this.updateDashboard();
            }
        }, 5000);
    }

    // Cryptographic helper functions
    generateHash(data) {
        // Simulate SHA-256 hash generation
        let hash = 0;
        const str = JSON.stringify(data) + Date.now();
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16).padStart(16, '0');
    }

    generateSignature(data, privateKey = 'server_private_key') {
        // Simulate ECDSA signature
        const dataStr = JSON.stringify(data);
        return this.generateHash(dataStr + privateKey);
    }

    verifySignature(data, signature, publicKey = 'server_public_key') {
        // Simulate signature verification
        const expectedSig = this.generateSignature(data, 'server_private_key');
        return signature === expectedSig;
    }

    // Authentication functions
    generateOTP() {
        console.log('Generating OTP...');
        
        // Generate 6-digit OTP
        this.generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Generated OTP:', this.generatedOTP);
        
        // Get DOM elements
        const otpDisplay = document.getElementById('otpDisplay');
        const otpField = document.getElementById('otp');
        
        if (otpDisplay) {
            otpDisplay.innerHTML = `<strong>Generated OTP: ${this.generatedOTP}</strong><br><small>Auto-filled in field above</small>`;
            otpDisplay.style.display = 'block';
        }
        
        if (otpField) {
            // Clear and set the OTP value
            otpField.value = '';
            setTimeout(() => {
                otpField.value = this.generatedOTP;
                console.log('OTP auto-filled:', otpField.value);
            }, 100);
        }
        
        // Auto-clear OTP after 2 minutes
        setTimeout(() => {
            this.generatedOTP = null;
            if (otpDisplay) {
                otpDisplay.style.display = 'none';
            }
            if (otpField) {
                otpField.value = '';
            }
        }, 120000);

        this.addAuditEntry('auth', 'OTP generated', { timestamp: Date.now() });
        this.showAlert('OTP generated and auto-filled', 'success');
    }

    simulateBiometric() {
        console.log('Starting biometric verification...');
        
        const btn = document.getElementById('biometricBtn');
        const status = document.getElementById('biometricStatus');
        
        if (!btn) {
            console.error('Biometric button not found');
            return;
        }
        
        btn.innerHTML = '<span class="spinner"></span>Scanning...';
        btn.disabled = true;
        
        setTimeout(() => {
            this.biometricVerified = true;
            btn.innerHTML = '<span class="biometric-icon">✅</span>Verified';
            btn.classList.add('verified');
            btn.disabled = false;
            
            if (status) {
                status.innerHTML = '<span class="status status--success">Biometric Verified</span>';
            }
            
            this.addAuditEntry('auth', 'Biometric verification completed', { 
                success: true, 
                timestamp: Date.now() 
            });
            
            this.showAlert('Biometric verification successful', 'success');
            console.log('Biometric verification completed');
        }, 2000);
    }

    handleLogin() {
        console.log('Handling login...');
        
        const username = document.getElementById('username')?.value?.trim() || '';
        const password = document.getElementById('password')?.value?.trim() || '';
        const otp = document.getElementById('otp')?.value?.trim() || '';

        console.log('Login data:', { 
            username: username, 
            password: password ? '[PROVIDED]' : '[EMPTY]', 
            otp: otp ? '[PROVIDED]' : '[EMPTY]',
            generatedOTP: this.generatedOTP ? '[EXISTS]' : '[NULL]',
            biometricVerified: this.biometricVerified 
        });

        // Validate inputs
        if (!username || !password) {
            this.showAlert('Please enter username and password', 'error');
            return;
        }

        // Find user
        const user = this.voters.find(v => v.username === username && v.password === password);
        
        if (!user) {
            this.showAlert('Invalid username or password', 'error');
            this.addAuditEntry('auth', 'Login failed - invalid credentials', { 
                username, 
                timestamp: Date.now() 
            });
            return;
        }

        // Verify OTP
        if (!this.generatedOTP) {
            this.showAlert('Please generate an OTP first', 'warning');
            return;
        }

        if (!otp) {
            this.showAlert('Please enter the OTP', 'warning');
            return;
        }

        if (otp !== this.generatedOTP) {
            this.showAlert(`Invalid OTP. Expected: ${this.generatedOTP}, Got: ${otp}`, 'error');
            this.addAuditEntry('auth', 'Login failed - invalid OTP', { 
                username, 
                expected: this.generatedOTP,
                provided: otp,
                timestamp: Date.now() 
            });
            return;
        }

        // Verify biometric
        if (!this.biometricVerified) {
            this.showAlert('Please complete biometric verification first', 'warning');
            return;
        }

        // Successful login
        console.log('Login successful for user:', user.name);
        this.currentUser = { ...user };
        this.showAlert(`Welcome, ${user.name}!`, 'success');
        this.addAuditEntry('auth', 'Successful login', { 
            user_id: user.voter_id, 
            username: user.username,
            role: user.role,
            timestamp: Date.now() 
        });

        // Update header
        const userInfo = document.getElementById('userInfo');
        const userName = document.getElementById('userName');
        const userRole = document.getElementById('userRole');
        
        if (userInfo) userInfo.style.display = 'flex';
        if (userName) userName.textContent = user.name;
        if (userRole) userRole.textContent = user.role.toUpperCase();

        // Clear sensitive data
        this.generatedOTP = null;
        this.biometricVerified = false;

        // Navigate based on role
        setTimeout(() => {
            this.navigateByRole();
        }, 1000);
    }

    navigateByRole() {
        const role = this.currentUser.role;
        console.log('Navigating for role:', role);
        
        switch (role) {
            case 'voter':
                if (this.currentUser.has_voted) {
                    this.showAlert('You have already voted in this election', 'info');
                    this.showVoteStatus();
                } else {
                    this.showView('votingView');
                    this.initializeVotingInterface();
                }
                break;
            case 'admin':
                this.showView('adminView');
                this.initializeAdminDashboard();
                break;
            case 'auditor':
                this.showView('auditView');
                this.initializeAuditDashboard();
                break;
        }
    }

    showVoteStatus() {
        const votingView = document.getElementById('votingView');
        if (votingView) {
            const statusHtml = `
                <div class="container">
                    <div class="voting-container">
                        <div class="card">
                            <div class="card__body text-center">
                                <h2>✅ Vote Already Recorded</h2>
                                <p>Your vote has been securely recorded for the ${this.systemConfig.election_name}.</p>
                                <p><strong>Vote Hash:</strong> <code>${this.currentUser.last_vote_hash || 'N/A'}</code></p>
                                <div class="status status--success">Vote Verified</div>
                                <button class="btn btn--outline mt-8" onclick="logout()">Return to Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            votingView.innerHTML = statusHtml;
            this.showView('votingView');
        }
    }

    // Voting functions
    initializeVotingInterface() {
        console.log('Initializing voting interface...');
        const grid = document.getElementById('candidatesGrid');
        if (!grid) {
            console.error('Candidates grid not found');
            return;
        }
        
        grid.innerHTML = '';

        this.candidates.forEach((candidate, index) => {
            const card = document.createElement('div');
            card.className = 'candidate-card';
            card.setAttribute('data-candidate-id', candidate.candidate_id);
            card.onclick = () => this.selectCandidate(candidate.candidate_id);
            
            card.innerHTML = `
                <div class="candidate-number">Candidate ${index + 1}</div>
                <div class="candidate-name">${candidate.name}</div>
                <div class="candidate-party">${candidate.party}</div>
            `;
            
            grid.appendChild(card);
        });
        
        console.log('Voting interface initialized with', this.candidates.length, 'candidates');
    }

    selectCandidate(candidateId) {
        console.log('Selecting candidate:', candidateId);
        
        // Clear previous selection
        document.querySelectorAll('.candidate-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Select new candidate
        const selectedCard = document.querySelector(`[data-candidate-id="${candidateId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        this.selectedCandidate = candidateId;
        
        // Show voting actions
        const votingActions = document.getElementById('votingActions');
        if (votingActions) {
            votingActions.style.display = 'flex';
        }
        
        const candidate = this.candidates.find(c => c.candidate_id === candidateId);
        this.showAlert(`Selected: ${candidate.name}`, 'info');
    }

    resetVote() {
        console.log('Resetting vote selection');
        document.querySelectorAll('.candidate-card').forEach(card => {
            card.classList.remove('selected');
        });
        this.selectedCandidate = null;
        
        const votingActions = document.getElementById('votingActions');
        if (votingActions) {
            votingActions.style.display = 'none';
        }
        
        this.showAlert('Vote selection cleared', 'info');
    }

    submitVote() {
        console.log('Submitting vote for candidate:', this.selectedCandidate);
        
        if (!this.selectedCandidate) {
            this.showAlert('Please select a candidate', 'warning');
            return;
        }

        // Check if user already voted
        if (this.currentUser.has_voted) {
            this.showAlert('You have already voted', 'error');
            return;
        }

        const candidate = this.candidates.find(c => c.candidate_id === this.selectedCandidate);
        
        // Show confirmation modal
        const modal = document.getElementById('voteModal');
        const selectedDiv = document.getElementById('selectedCandidate');
        
        if (modal && selectedDiv) {
            selectedDiv.innerHTML = `
                <div class="candidate-name">${candidate.name}</div>
                <div class="candidate-party">${candidate.party}</div>
            `;
            
            modal.classList.remove('hidden');
        }
    }

    confirmVote() {
        console.log('Confirming vote...');
        this.closeVoteModal();
        
        const candidate = this.candidates.find(c => c.candidate_id === this.selectedCandidate);
        
        // Generate blinded token for anonymity
        const blindedToken = this.generateHash({
            voter_session: this.currentUser.voter_id,
            timestamp: Date.now(),
            random: Math.random()
        });

        // Create vote record
        const voteRecord = {
            vote_hash: this.generateHash({
                blinded_token: blindedToken,
                candidate_id: this.selectedCandidate,
                timestamp: Date.now()
            }),
            blinded_token: blindedToken,
            candidate_id: this.selectedCandidate,
            timestamp: Date.now(),
            prev_hash: this.getLastVoteHash(),
            signature: null,
            server_signed: false
        };

        // Sign the vote record
        voteRecord.signature = this.generateSignature(voteRecord);
        voteRecord.server_signed = true;

        // Atomic operation: check and record vote
        if (this.currentUser.has_voted) {
            this.showAlert('Vote already recorded', 'error');
            return;
        }

        // Record vote
        this.votes.push(voteRecord);
        this.currentUser.has_voted = true;
        this.currentUser.last_vote_hash = voteRecord.vote_hash;
        
        // Update candidate count
        candidate.vote_count++;

        // Update the voters array to reflect the vote
        const voterIndex = this.voters.findIndex(v => v.voter_id === this.currentUser.voter_id);
        if (voterIndex !== -1) {
            this.voters[voterIndex].has_voted = true;
            this.voters[voterIndex].last_vote_hash = voteRecord.vote_hash;
        }

        // Add to audit log
        this.addAuditEntry('vote', 'Vote recorded', {
            vote_hash: voteRecord.vote_hash,
            timestamp: voteRecord.timestamp,
            blinded_token: blindedToken
        });

        // Show VVPAT receipt
        this.showVVPATReceipt(voteRecord, candidate);
        
        this.showAlert('Vote recorded successfully!', 'success');
        console.log('Vote confirmed and recorded');
    }

    getLastVoteHash() {
        if (this.votes.length === 0) {
            return '0000000000000000'; // Genesis hash
        }
        return this.votes[this.votes.length - 1].vote_hash;
    }

    showVVPATReceipt(voteRecord, candidate) {
        const modal = document.getElementById('receiptModal');
        const receipt = document.getElementById('vvpatReceipt');
        
        if (!modal || !receipt) return;
        
        const receiptContent = `
            <h4>🗳️ VOTE VERIFICATION RECEIPT</h4>
            <div class="receipt-row">
                <span>Election:</span>
                <span>${this.systemConfig.election_name}</span>
            </div>
            <div class="receipt-row">
                <span>Date:</span>
                <span>${new Date().toLocaleDateString()}</span>
            </div>
            <div class="receipt-row">
                <span>Time:</span>
                <span>${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="receipt-row">
                <span>Candidate:</span>
                <span>${candidate.name}</span>
            </div>
            <div class="receipt-row">
                <span>Party:</span>
                <span>${candidate.party}</span>
            </div>
            <div class="receipt-row">
                <span>Vote Hash:</span>
                <span>${voteRecord.vote_hash}</span>
            </div>
            <div class="receipt-row">
                <span>Signature:</span>
                <span>${voteRecord.signature.substring(0, 16)}...</span>
            </div>
            <br>
            <div style="text-align: center; font-size: 10px;">
                ⚠️ KEEP THIS RECEIPT FOR YOUR RECORDS<br>
                This receipt verifies your vote was recorded<br>
                but does not reveal your choice to others.
            </div>
        `;
        
        receipt.innerHTML = receiptContent;
        modal.classList.remove('hidden');
    }

    // Admin Dashboard functions
    initializeAdminDashboard() {
        console.log('Initializing admin dashboard...');
        this.updateDashboardStats();
        this.initializeTallyChart();
        this.updateActivityFeed();
    }

    updateDashboardStats() {
        const totalVotes = this.votes.length;
        const turnout = ((totalVotes / this.systemConfig.total_registered_voters) * 100).toFixed(2);
        
        const totalVotesEl = document.getElementById('totalVotes');
        const voterTurnoutEl = document.getElementById('voterTurnout');
        const systemStatusEl = document.getElementById('systemStatus');
        const alertCountEl = document.getElementById('alertCount');
        
        if (totalVotesEl) totalVotesEl.textContent = totalVotes;
        if (voterTurnoutEl) voterTurnoutEl.textContent = `${turnout}%`;
        if (systemStatusEl) {
            systemStatusEl.textContent = this.systemConfig.voting_enabled ? 'Online' : 'Offline';
            systemStatusEl.className = this.systemConfig.voting_enabled ? 'status status--success' : 'status status--error';
        }
        if (alertCountEl) alertCountEl.textContent = '0';
    }

    initializeTallyChart() {
        const ctx = document.getElementById('tallyChart');
        if (!ctx) {
            console.error('Tally chart canvas not found');
            return;
        }
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        this.chart = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: this.candidates.map(c => c.name),
                datasets: [{
                    label: 'Votes',
                    data: this.candidates.map(c => c.vote_count),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                    borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        
        console.log('Tally chart initialized');
    }

    updateDashboard() {
        this.updateDashboardStats();
        if (this.chart) {
            this.chart.data.datasets[0].data = this.candidates.map(c => c.vote_count);
            this.chart.update();
        }
        this.updateActivityFeed();
    }

    updateActivityFeed() {
        const feed = document.getElementById('activityFeed');
        if (!feed) return;
        
        const recentEntries = this.auditLog.slice(-10).reverse();
        
        feed.innerHTML = recentEntries.map(entry => `
            <div class="activity-item">
                <div class="activity-text">${entry.action}</div>
                <div class="activity-time">${new Date(entry.timestamp).toLocaleTimeString()}</div>
            </div>
        `).join('');
    }

    toggleVoting() {
        this.systemConfig.voting_enabled = !this.systemConfig.voting_enabled;
        const btn = document.getElementById('startVotingBtn');
        const text = document.getElementById('votingToggleText');
        
        if (btn && text) {
            if (this.systemConfig.voting_enabled) {
                btn.className = 'btn btn--error';
                text.textContent = 'Stop Voting';
            } else {
                btn.className = 'btn btn--success';
                text.textContent = 'Start Voting';
            }
        }
        
        this.addAuditEntry('admin', `Voting ${this.systemConfig.voting_enabled ? 'enabled' : 'disabled'}`, {
            admin_id: this.currentUser.voter_id,
            timestamp: Date.now()
        });
        
        this.showAlert(`Voting ${this.systemConfig.voting_enabled ? 'enabled' : 'disabled'}`, 'info');
        this.updateDashboardStats();
    }

    exportResults() {
        const results = {
            election: this.systemConfig.election_name,
            date: new Date().toISOString(),
            candidates: this.candidates.map(c => ({
                name: c.name,
                party: c.party,
                votes: c.vote_count
            })),
            total_votes: this.votes.length,
            turnout: ((this.votes.length / this.systemConfig.total_registered_voters) * 100).toFixed(2) + '%'
        };
        
        const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'election_results.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showAlert('Results exported successfully', 'success');
        this.addAuditEntry('admin', 'Results exported', {
            admin_id: this.currentUser.voter_id,
            timestamp: Date.now()
        });
    }

    // Audit functions
    initializeAuditDashboard() {
        console.log('Initializing audit dashboard...');
        this.updateAuditStats();
        this.displayAuditLog();
    }

    updateAuditStats() {
        const auditRecordCountEl = document.getElementById('auditRecordCount');
        const hashChainStatusEl = document.getElementById('hashChainStatus');
        const voteIntegrityEl = document.getElementById('voteIntegrity');
        
        if (auditRecordCountEl) auditRecordCountEl.textContent = this.auditLog.length;
        
        const isChainValid = this.verifyHashChain();
        if (hashChainStatusEl) {
            hashChainStatusEl.textContent = isChainValid ? 'Intact' : 'Compromised';
            hashChainStatusEl.className = isChainValid ? 'status status--success' : 'status status--error';
        }
        
        const isIntegrityValid = this.verifyVoteIntegrity();
        if (voteIntegrityEl) {
            voteIntegrityEl.textContent = isIntegrityValid ? 'Verified' : 'Failed';
            voteIntegrityEl.className = isIntegrityValid ? 'status status--success' : 'status status--error';
        }
    }

    displayAuditLog(filter = '') {
        const logContainer = document.getElementById('auditLog');
        if (!logContainer) return;
        
        let entries = this.auditLog;
        
        if (filter) {
            entries = entries.filter(entry => 
                entry.category.toLowerCase().includes(filter.toLowerCase()) ||
                entry.action.toLowerCase().includes(filter.toLowerCase())
            );
        }
        
        logContainer.innerHTML = entries.slice().reverse().map(entry => `
            <div class="audit-entry">
                <span class="audit-timestamp">[${new Date(entry.timestamp).toLocaleString()}]</span>
                <span class="audit-action">${entry.action}</span>
                <span class="audit-category">(${entry.category})</span>
                <br>
                <div class="audit-hash">Hash: ${entry.hash}</div>
                ${entry.prev_hash ? `<div class="audit-hash">Prev: ${entry.prev_hash}</div>` : ''}
            </div>
        `).join('');
    }

    addAuditEntry(category, action, details = {}) {
        const entry = {
            log_id: this.generateHash({ timestamp: Date.now(), action }),
            timestamp: Date.now(),
            category,
            action,
            user_id: this.currentUser ? this.currentUser.voter_id : 'system',
            details,
            prev_hash: this.getLastAuditHash(),
            hash: null
        };
        
        entry.hash = this.generateHash(entry);
        this.auditLog.push(entry);
    }

    getLastAuditHash() {
        if (this.auditLog.length === 0) {
            return '0000000000000000';
        }
        return this.auditLog[this.auditLog.length - 1].hash;
    }

    verifyHashChain() {
        for (let i = 1; i < this.auditLog.length; i++) {
            const current = this.auditLog[i];
            const previous = this.auditLog[i - 1];
            
            if (current.prev_hash !== previous.hash) {
                return false;
            }
        }
        return true;
    }

    verifyVoteIntegrity() {
        return this.votes.every(vote => {
            const expectedSig = this.generateSignature(vote);
            return vote.signature === expectedSig;
        });
    }

    filterAuditLog() {
        const filter = document.getElementById('auditFilter')?.value || '';
        this.displayAuditLog(filter);
    }

    exportAuditLog() {
        const auditData = {
            election: this.systemConfig.election_name,
            export_date: new Date().toISOString(),
            hash_chain_integrity: this.verifyHashChain(),
            vote_integrity: this.verifyVoteIntegrity(),
            audit_log: this.auditLog
        };
        
        const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'audit_log.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showAlert('Audit log exported successfully', 'success');
        this.addAuditEntry('audit', 'Audit log exported', {
            auditor_id: this.currentUser.voter_id,
            timestamp: Date.now()
        });
    }

    // UI Helper functions
    showView(viewId) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
        }
    }

    showAlert(message, type = 'info') {
        const container = document.getElementById('alertContainer');
        if (!container) return;
        
        const alert = document.createElement('div');
        alert.className = `alert alert--${type}`;
        alert.textContent = message;
        
        container.appendChild(alert);
        
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }

    closeVoteModal() {
        const modal = document.getElementById('voteModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    closeReceiptModal() {
        const modal = document.getElementById('receiptModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    printReceipt() {
        window.print();
        this.addAuditEntry('vote', 'VVPAT receipt printed', {
            voter_session: this.currentUser.voter_id,
            timestamp: Date.now()
        });
    }

    logout() {
        if (this.currentUser) {
            this.addAuditEntry('auth', 'User logout', {
                user_id: this.currentUser.voter_id,
                timestamp: Date.now()
            });
        }
        
        this.currentUser = null;
        this.selectedCandidate = null;
        this.generatedOTP = null;
        this.biometricVerified = false;
        
        // Reset UI
        const userInfo = document.getElementById('userInfo');
        const loginForm = document.getElementById('loginForm');
        const otpDisplay = document.getElementById('otpDisplay');
        const biometricBtn = document.getElementById('biometricBtn');
        const biometricStatus = document.getElementById('biometricStatus');
        
        if (userInfo) userInfo.style.display = 'none';
        if (loginForm) loginForm.reset();
        if (otpDisplay) otpDisplay.style.display = 'none';
        if (biometricBtn) {
            biometricBtn.innerHTML = '<span class="biometric-icon">👆</span>Verify Fingerprint';
            biometricBtn.classList.remove('verified');
            biometricBtn.disabled = false;
        }
        if (biometricStatus) biometricStatus.innerHTML = '';
        
        // Pre-populate demo credentials
        setTimeout(() => {
            const usernameField = document.getElementById('username');
            const passwordField = document.getElementById('password');
            if (usernameField) usernameField.value = '';
            if (passwordField) passwordField.value = '';
        }, 100);
        
        this.showView('loginView');
        this.showAlert('Logged out successfully', 'info');
        console.log('User logged out');
    }
}

// Global functions for HTML onclick handlers
let evmSystem;

function generateOTP() {
    if (evmSystem) {
        evmSystem.generateOTP();
    }
}

function simulateBiometric() {
    if (evmSystem) {
        evmSystem.simulateBiometric();
    }
}

function logout() {
    if (evmSystem) {
        evmSystem.logout();
    }
}

function resetVote() {
    if (evmSystem) {
        evmSystem.resetVote();
    }
}

function submitVote() {
    if (evmSystem) {
        evmSystem.submitVote();
    }
}

function confirmVote() {
    if (evmSystem) {
        evmSystem.confirmVote();
    }
}

function closeVoteModal() {
    if (evmSystem) {
        evmSystem.closeVoteModal();
    }
}

function closeReceiptModal() {
    if (evmSystem) {
        evmSystem.closeReceiptModal();
    }
}

function printReceipt() {
    if (evmSystem) {
        evmSystem.printReceipt();
    }
}

function toggleVoting() {
    if (evmSystem) {
        evmSystem.toggleVoting();
    }
}

function exportResults() {
    if (evmSystem) {
        evmSystem.exportResults();
    }
}

function verifyHashChain() {
    if (evmSystem) {
        const isValid = evmSystem.verifyHashChain();
        evmSystem.showAlert(`Hash chain is ${isValid ? 'intact' : 'compromised'}`, isValid ? 'success' : 'error');
        evmSystem.addAuditEntry('audit', 'Hash chain verification performed', {
            result: isValid,
            auditor_id: evmSystem.currentUser.voter_id,
            timestamp: Date.now()
        });
    }
}

function exportAuditLog() {
    if (evmSystem) {
        evmSystem.exportAuditLog();
    }
}

function filterAuditLog() {
    if (evmSystem) {
        evmSystem.filterAuditLog();
    }
}

// Initialize the system when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing EVM System...');
    evmSystem = new EVMSystem();
    console.log('EVM System initialized successfully');
});