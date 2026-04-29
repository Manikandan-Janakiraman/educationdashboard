const USERS_KEY = 'edudash_users';
const CURRENT_USER_KEY = 'edudash_current_user';

export const authService = {
    login: (email, password) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Don't store password in session
            const { password, ...userWithoutPassword } = user;
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
            return userWithoutPassword;
        }
        return null;
    },

    register: (userData) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const existingUser = users.find(u => u.email === userData.email);

        if (existingUser) {
            throw new Error('User already exists');
        }

        const newUser = { ...userData, id: Date.now().toString() };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        // Auto login after register
        const { password, ...userWithoutPassword } = newUser;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
        return userWithoutPassword;
    },

    logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    }
};
