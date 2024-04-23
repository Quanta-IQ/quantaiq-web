export type UserData = {
    id: number;
    avatar: string;
    name: string;
    messages?: Message[];  // Messages are optional and can start empty
};

export const userData: UserData[] = [
    { id: 1, avatar: '/User1.png', name: 'AI Tutor' },
    { id: 2, avatar: '/User2.png', name: 'Andre Birkner' },
    { id: 3, avatar: '/User3.png', name: 'Charles Calapini' }
];


export const loggedInUserData = {
    id: 4,
    avatar: '/LoggedInUser.png',
    name: 'Sean Andres',
};

export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
    id: number;
    avatar: string;
    name: string;
    message: string;
}

export interface User {
    id: number;
    avatar: string;
    messages?: Message[];
    name: string;
}
