export interface Author {
    name: string;
    role: string;
    avatar: string; // URL to avatar image
}

export interface BlogTag {
    id: string;
    name: string;
    color: string; // Tailwnd color class e.g. "text-cyan-400"
}

export interface BlogPost {
    id: string;
    slug: string; // URL friendly ID e.g. "python-roadmap-2025"
    title: string;
    excerpt: string; // Short summary for cards
    content: string; // HTML or Markdown content
    coverImage: string; // URL to cover image
    author: Author;
    publishedAt: string; // ISO Date
    readTime: string; // e.g. "5 min read"
    tags: BlogTag[];
    featured?: boolean;
}
