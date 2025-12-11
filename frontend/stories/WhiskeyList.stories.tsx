import type { Meta, StoryObj } from '@storybook/react';
import { WhiskeyListItem } from '../components/WhiskeyListItem';
import type { Whiskey } from '../types/whiskey';

const sampleWhiskeys: Whiskey[] = [
  {
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
  },
  {
    id: 'a2f3b4c5-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
    name: 'Lagavulin 16',
    distillery: 'Lagavulin Distillery',
    region: 'Islay',
    age: 16,
    abv: 43,
    size_ml: 700,
    quantity: 2,
    purchaseDate: '2024-09-15',
    priceCents: 8999,
    notes: 'Intense peat smoke, rich',
    tags: ['islay', 'peated'],
    rating: 4.7,
    createdAt: '2024-09-15T10:00:00Z',
    updatedAt: '2024-09-15T10:00:00Z',
  },
  {
    id: 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
    name: 'Talisker 10',
    distillery: 'Talisker Distillery',
    region: 'Islands',
    age: 10,
    abv: 45.8,
    size_ml: 700,
    quantity: 1,
    purchaseDate: '2024-10-01',
    priceCents: 5499,
    notes: 'Maritime, peppery',
    tags: ['islands', 'peated'],
    rating: 4.3,
    createdAt: '2024-10-01T14:00:00Z',
    updatedAt: '2024-10-01T14:00:00Z',
  },
];

const WhiskeyListComponent = ({
  whiskeys,
  loading = false,
  emptyMessage = 'No whiskeys in inventory',
}: {
  whiskeys: Whiskey[];
  loading?: boolean;
  emptyMessage?: string;
}) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
        Loading whiskeys...
      </div>
    );
  }

  if (whiskeys.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff' }}>
      <thead>
        <tr>
          {[
            'Name',
            'Distillery',
            'Region',
            'Age',
            'ABV',
            'Qty',
            'Price',
            'Rating',
            'Tags',
          ].map((header) => (
            <th
              key={header}
              style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '2px solid #dee2e6',
                backgroundColor: '#f8f9fa',
                fontWeight: 600,
                fontSize: '14px',
                color: '#495057',
              }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {whiskeys.map((whiskey) => (
          <WhiskeyListItem
            key={whiskey.id}
            whiskey={whiskey}
            onClick={(id) => console.log('Clicked whiskey:', id)}
          />
        ))}
      </tbody>
    </table>
  );
};

const meta: Meta<typeof WhiskeyListComponent> = {
  title: 'Whiskey/WhiskeyList',
  component: WhiskeyListComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WhiskeyListComponent>;

export const Filled: Story = {
  args: {
    whiskeys: sampleWhiskeys,
  },
};

export const Empty: Story = {
  args: {
    whiskeys: [],
    emptyMessage: 'No whiskeys found. Add your first whiskey to get started!',
  },
};

export const Loading: Story = {
  args: {
    whiskeys: [],
    loading: true,
  },
};

export const SingleItem: Story = {
  args: {
    whiskeys: [sampleWhiskeys[0]],
  },
};

export const LargeList: Story = {
  args: {
    whiskeys: [
      ...sampleWhiskeys,
      {
        id: 'd4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
        name: 'Ardbeg 10',
        distillery: 'Ardbeg Distillery',
        region: 'Islay',
        age: 10,
        abv: 46,
        size_ml: 700,
        quantity: 2,
        priceCents: 6499,
        tags: ['islay', 'peated', 'non-chill-filtered'],
        rating: 4.5,
        createdAt: '2024-11-01T12:00:00Z',
        updatedAt: '2024-11-01T12:00:00Z',
      },
      {
        id: 'e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
        name: 'Macallan 12 Sherry Oak',
        distillery: 'Macallan Distillery',
        region: 'Speyside',
        age: 12,
        abv: 40,
        size_ml: 700,
        quantity: 1,
        priceCents: 7999,
        tags: ['speyside', 'sherry-cask'],
        rating: 4.4,
        createdAt: '2024-11-05T12:00:00Z',
        updatedAt: '2024-11-05T12:00:00Z',
      },
    ],
  },
};
