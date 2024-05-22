export const UserService = {
    getUsersData() {
        return [
            {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                createdAt: '2024-05-10T08:00:00Z',
                updatedAt: '2024-05-10T08:00:00Z',
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: 'password456',
                createdAt: '2024-05-11T08:00:00Z',
                updatedAt: '2024-05-11T08:00:00Z',
            },
        ]

    
    
    },
    getUsers() {
        return Promise.resolve(this.getUsersData());
    },

}