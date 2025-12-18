export interface MockUser {
    id: string;
    name: string;
    coins: number;
    streak: number;
    lastLoginDate: string;
    lastSpinDate: string;
    xp: number;
    avatar: string;
}

export interface Challenge {
    id: string;
    creatorId: string;
    creatorName: string;
    topic: string;
    amount: number;
    status: 'open' | 'active' | 'completed';
}

export interface Internship {
    id: string;
    title: string;
    description: string;
    reward: number;
    status: 'open' | 'assigned' | 'completed';
}

export interface Project {
    id: string;
    title: string;
    description: string;
    goal: number;
    raised: number;
    creatorId: string;
    creatorName: string;
}

class MockDbService {
    private readonly KEYS = {
        USER: 'skillswap_user',
        CHALLENGES: 'skillswap_challenges',
        INTERNSHIPS: 'skillswap_internships',
        PROJECTS: 'skillswap_projects',
    };

    constructor() {
        this.initialize();
    }

    private initialize() {
        if (!localStorage.getItem(this.KEYS.CHALLENGES)) {
            localStorage.setItem(this.KEYS.CHALLENGES, JSON.stringify([
                { id: '1', creatorId: 'user_2', creatorName: 'Rahul', topic: 'React.js', amount: 5, status: 'open' },
                { id: '2', creatorId: 'user_3', creatorName: 'Sneha', topic: 'CSS Layouts', amount: 10, status: 'open' },
            ]));
        }

        if (!localStorage.getItem(this.KEYS.INTERNSHIPS)) {
            localStorage.setItem(this.KEYS.INTERNSHIPS, JSON.stringify([
                { id: '1', title: 'Fix CSS on Landing Page', description: 'Fix z-index issues on the hero section', reward: 20, status: 'open' },
                { id: '2', title: 'Optimize React Components', description: 'Reduce re-renders in the Dashboard', reward: 50, status: 'open' },
            ]));
        }

        if (!localStorage.getItem(this.KEYS.PROJECTS)) {
            localStorage.setItem(this.KEYS.PROJECTS, JSON.stringify([
                { id: '1', title: 'EcoTrack App', description: 'Carbon footprint tracker for students', goal: 500, raised: 120, creatorId: 'user_4', creatorName: 'Priya' },
                { id: '2', title: 'VR Learning', description: 'Virtual reality classroom environment', goal: 1000, raised: 450, creatorId: 'user_5', creatorName: 'Arjun' },
            ]));
        }
    }

    getUser(): MockUser | null {
        const data = localStorage.getItem(this.KEYS.USER);
        return data ? JSON.parse(data) : null;
    }

    saveUser(user: Partial<MockUser>) {
        const existing = this.getUser() || {
            id: 'current_user',
            name: 'User',
            coins: 100,
            streak: 0,
            lastLoginDate: '',
            lastSpinDate: '',
            xp: 0,
            avatar: ''
        };
        const updated = { ...existing, ...user };
        localStorage.setItem(this.KEYS.USER, JSON.stringify(updated));
        return updated;
    }

    getChallenges(): Challenge[] {
        return JSON.parse(localStorage.getItem(this.KEYS.CHALLENGES) || '[]');
    }

    addChallenge(challenge: Omit<Challenge, 'id' | 'status'>) {
        const challenges = this.getChallenges();
        const newChallenge: Challenge = {
            ...challenge,
            id: Date.now().toString(),
            status: 'open'
        };
        challenges.push(newChallenge);
        localStorage.setItem(this.KEYS.CHALLENGES, JSON.stringify(challenges));
        return newChallenge;
    }

    removeChallenge(id: string) {
        const challenges = this.getChallenges().filter(c => c.id !== id);
        localStorage.setItem(this.KEYS.CHALLENGES, JSON.stringify(challenges));
    }

    getInternships(): Internship[] {
        return JSON.parse(localStorage.getItem(this.KEYS.INTERNSHIPS) || '[]');
    }

    getProjects(): Project[] {
        return JSON.parse(localStorage.getItem(this.KEYS.PROJECTS) || '[]');
    }

    updateProject(id: string, updates: Partial<Project>) {
        const projects = this.getProjects();
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updates };
            localStorage.setItem(this.KEYS.PROJECTS, JSON.stringify(projects));
            return projects[index];
        }
        return null;
    }
}

export const mockDb = new MockDbService();
