import { Timestamp } from 'firebase/firestore';

export interface SinglePoll {
    id: string
    question: string;
    options: { text: string; votesReceived: number }[];
    voteCount: number;
    createdAt: Timestamp;
    duration: string;
}