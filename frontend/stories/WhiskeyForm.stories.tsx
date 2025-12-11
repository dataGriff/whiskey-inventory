import type { Meta, StoryObj } from '@storybook/react';
import { WhiskeyForm } from '../components/WhiskeyForm';
import type { WhiskeyCreate } from '../types/whiskey';

const meta: Meta<typeof WhiskeyForm> = {
  title: 'Whiskey/WhiskeyForm',
  component: WhiskeyForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WhiskeyForm>;

const handleSubmit = (data: WhiskeyCreate) => {
  console.log('Form submitted:', data);
  alert(`Submitted: ${JSON.stringify(data, null, 2)}`);
};

const handleCancel = () => {
  console.log('Form cancelled');
  alert('Form cancelled');
};

export const Empty: Story = {
  args: {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  },
};

export const CreateMode: Story = {
  args: {
    initialData: {},
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  },
};

export const EditMode: Story = {
  args: {
    initialData: {
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
    },
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  },
};

export const PartialData: Story = {
  args: {
    initialData: {
      name: 'Incomplete Whiskey',
      distillery: 'Some Distillery',
      quantity: 1,
    },
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  },
};

export const Loading: Story = {
  args: {
    initialData: {
      name: 'Glen Example 12',
      distillery: 'Glen Example Distillery',
    },
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    loading: true,
  },
};

export const WithError: Story = {
  args: {
    initialData: {
      name: 'Glen Example 12',
    },
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    error: 'Failed to save whiskey. The server returned an error. Please try again.',
  },
};

export const ValidationError: Story = {
  args: {
    initialData: {
      name: '',
    },
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const submitButton = canvas.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      submitButton.click();
    }
  },
};

export const WithoutCancel: Story = {
  args: {
    initialData: {
      name: 'Glen Example 12',
    },
    onSubmit: handleSubmit,
  },
};

export const CompleteFormFilled: Story = {
  args: {
    initialData: {
      name: 'Lagavulin 16',
      distillery: 'Lagavulin Distillery',
      region: 'Islay',
      age: 16,
      abv: 43,
      size_ml: 700,
      quantity: 2,
      purchaseDate: '2024-09-15',
      priceCents: 8999,
      notes: 'Intense peat smoke, rich and complex with hints of sherry and seaweed',
      imageUrl: 'https://example.com/images/lagavulin-16.jpg',
      tags: ['islay', 'peated', 'single-malt', 'sherry-cask'],
      rating: 4.7,
    },
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  },
};

export const MinimalRequired: Story = {
  args: {
    initialData: {
      name: 'Simple Whiskey',
    },
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  },
};
