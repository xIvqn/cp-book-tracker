import { Section } from './section.model'

export interface Chapter {
    title: string;
    sections: Section[];
    id: string;
    total: number;
    solved: number;
}