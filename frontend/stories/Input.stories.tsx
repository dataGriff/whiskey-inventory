import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'date', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'your.email@example.com',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'text',
    value: 'short',
    error: 'Password must be at least 8 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit',
    disabled: true,
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '12',
  },
};

export const DateInput: Story = {
  args: {
    label: 'Purchase Date',
    type: 'date',
  },
};

export const URLInput: Story = {
  args: {
    label: 'Image URL',
    type: 'url',
    placeholder: 'https://example.com/image.jpg',
  },
};

export const Filled: Story = {
  args: {
    label: 'Whiskey Name',
    value: 'Glenfiddich 12 Year Old',
  },
};

export const Empty: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Add your tasting notes here',
  },
};
