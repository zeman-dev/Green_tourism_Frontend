'use client';
import css from './TravellersStories.module.css';
import type { Story } from '@/types/story';
import StoryCard from '../StoryCard/StoryCard';

interface StoryListProps {
  stories: Story[];
}

export default function TravellersStories({ stories }: StoryListProps) {
  return (
    <section className={css.stories}>
    <div className={css.container}>
    <ul className={css.list}>
      {stories.map(story => {
        return (
          <li className={css.listItem} key={story._id}>
            <StoryCard
              story={story}
              authorName="TEST" /* доробити */
              savedCount={story.rate}
            />
          </li>
        );
      })}
    </ul>
    </div>
    </section>
  );
}
