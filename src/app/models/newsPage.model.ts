import { News } from './news.model';

export interface newsPage {
    status: string;
    totalResults: number;
    articles: News;
}
