import { ProblemSet } from './problem-set.model'

export interface Section {
    title: string;
    problemSets: ProblemSet[];
    total: number;
    solved: number;
}