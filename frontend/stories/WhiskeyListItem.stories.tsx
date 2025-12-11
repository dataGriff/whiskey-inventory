import type { Meta, StoryObj } from '@storybook/react';
import { WhiskeyListItem } from '../components/WhiskeyListItem';
import type { Whiskey } from '../types/whiskey';

const meta: Meta<typeof WhiskeyListItem> = {
  title: 'Whiskey/WhiskeyListItem',
  component: WhiskeyListItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Distillery</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Region</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Age</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>ABV</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Qty</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Price</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Rating</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Tags</th>
          </tr>
        </thead>
        <tbody>
          <Story />
        </tbody>
      </table>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WhiskeyListItem>;

const completeWhiskey: Whiskey = {
  id: 'b3e1a6a6-1c6b-4c3f-90d1-3f1a6b0a1111',
  name: 'Glen Example 12',
  distillery: 'Glen Example Distillery',
  region: 'Speyside',
  age: 12,
  abv: 43,
  size_ml: 700,
  quantity: 3,
  purchaseDate: '2024-08-01',
  priceCents: 4999,
  notes: 'Light, fruity, honeyed',
  imageUrl: 'https://example.com/images/glen-example-12.jpg',
  tags: ['speyside', 'single-malt'],
  rating: 4.2,
  createdAt: '2024-08-01T12:00:00Z',
  updatedAt: '2024-08-02T09:00:00Z',
};

export const Filled: Story = {
  args: {
    whiskey: completeWhiskey,
    onClick: (id) => console.log('Clicked whiskey:', id),
  },
};

export const MinimalData: Story = {
  args: {
    whiskey: {
      id: 'minimal-1',
      name: 'Basic Whiskey',
      createdAt: '2024-08-01T12:00:00Z',
      updatedAt: '2024-08-01T12:00:00Z',
    },
    onClick: (id) => console.log('Clicked whiskey:', id),
  },
};

export const NoRating: Story = {
  args: {
    whiskey: {
      ...completeWhiskey,
      rating: null,
    },
  },
};

export const NoTags: Story = {
  args: {
    whiskey: {
      ...completeWhiskey,
      tags: [],
    },
  },
};

export const MultipleTags: Story = {
  args: {
    whiskey: {
      ...completeWhiskey,
      tags: ['speyside', 'single-malt', 'non-chill-filtered', 'natural-color', 'award-winner'],
    },
  },
};

export const ExpensiveWhiskey: Story = {
  args: {
    whiskey: {
      id: 'expensive-1',
      name: 'Rare Vintage 25',
      distillery: 'Prestigious Distillery',
      region: 'Islay',
      age: 25,
      abv: 48.5,
      size_ml: 700,
      quantity: 1,
      purchaseDate: '2024-01-15',
      priceCents: 49999,
      tags: ['islay', 'peated', 'limited-edition'],
      rating: 4.9,
      createdAt: '2024-01-15T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z',
    },
  },
};

export const LowStock: Story = {
  args: {
    whiskey: {
      ...completeWhiskey,
      quantity: 0,
    },
  },
};

export const Clickable: Story = {
  args: {
    whiskey: completeWhiskey,
    onClick: (id) => alert(`Clicked whiskey: ${id}`),
  },
};

export const NonClickable: Story = {
  args: {
    whiskey: completeWhiskey,
  },
};
