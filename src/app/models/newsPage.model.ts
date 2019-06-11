import { News } from './news.model';

export interface NewsPage {
    status: string;
    totalResults: number;
    articles: News[];
}
