import { Post } from '../components/post/model/post.model';

export class Problem {
    id: number;
    name: string;
    desc: string;
    difficulty: string;
    posts: Array<Post>;
}