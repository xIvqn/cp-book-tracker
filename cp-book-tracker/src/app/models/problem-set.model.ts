import { Problem } from './problem.model'

export interface ProblemSet {
    title: string;
    problems: Problem[];
    total: number;
    solved: number;
}