'use client';
import css from './TravellersStories.module.css';
import type { Story } from '@/types/story';
import StoryCard from '../StoryCard/StoryCard';

interface StoryListProps {
  stories: Story[];
}

export default function TravellersStories({ stories }: StoryListProps) {
  return (
    <ul className={css.list}>
      {stories.map(story => {
        return (
          <li className={css.listItem} key={story._id}>
            <StoryCard
              story={story}
              authorName="" /* доробити */
              savedCount={story.rate}
            />
          </li>
        );
      })}
    </ul>
  );
}
