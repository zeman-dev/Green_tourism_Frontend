'use client';
import css from './TravellersStories.module.css';
import type { Story } from '@/types/story';
import StoryCard from '../StoryCard/StoryCard';
import type { ReactNode } from 'react'

interface StoryListProps {
  stories: Story[];
  children?: ReactNode;

}

export default function TravellersStories({ stories, children }: StoryListProps) {
  return (
    <section className={css.stories}>
    <div className={css.container}>
    <ul className={css.list}>
      {stories.map(story => {
        return (
          <li className={css.listItem} key={story._id}>
            <StoryCard
              story={story}
              authorName={story.ownerId.name}
              savedCount={story.rate}
            />
          </li>
        );
      })}
    </ul>
       {children}
    </div>
    </section>
  );
}
