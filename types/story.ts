export type Story = {
    _id: string;
    img: string;
    title: string;
    article: string;
    category: string;
    rate: number;
    ownerId: string;
    date: string;
};

export type StoriesResponse ={
    page: number;
    perPage: number;
    totalStories: number;
    totalPages: number;
    stories: Story[];
};