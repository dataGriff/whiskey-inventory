import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toaster } from '../components/Toaster';
import type { Toast } from '../components/Toaster';
import { Button } from '../components/Button';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

const ToasterDemo = ({ position }: { position?: any }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: Toast['type'], message: string) => {
    const newToast: Toast = {
      id: Date.now().toString(),
      type,
      message,
      duration: 5000,
    };
    setToasts([...toasts, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(toasts.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <Button onClick={() => addToast('success', 'Success! Operation completed.')}>
          Show Success
        </Button>
        <Button onClick={() => addToast('error', 'Error! Something went wrong.')}>
          Show Error
        </Button>
        <Button onClick={() => addToast('warning', 'Warning! Please check your input.')}>
          Show Warning
        </Button>
        <Button onClick={() => addToast('info', 'Info: New update available.')}>
          Show Info
        </Button>
      </div>
      <p>Click the buttons to show different types of toasts.</p>
      <Toaster toasts={toasts} onRemove={removeToast} position={position} />
    </div>
  );
};

export const Default: Story = {
  render: () => <ToasterDemo />,
};

export const TopLeft: Story = {
  render: () => <ToasterDemo position="top-left" />,
};

export const BottomRight: Story = {
  render: () => <ToasterDemo position="bottom-right" />,
};

export const BottomLeft: Story = {
  render: () => <ToasterDemo position="bottom-left" />,
};

export const SuccessToast: Story = {
  render: () => {
    const [toasts] = useState<Toast[]>([
      {
        id: '1',
        type: 'success',
        message: 'Whiskey successfully added to inventory!',
        duration: 10000,
      },
    ]);
    return <Toaster toasts={toasts} onRemove={() => {}} />;
  },
};

export const ErrorToast: Story = {
  render: () => {
    const [toasts] = useState<Toast[]>([
      {
        id: '1',
        type: 'error',
        message: 'Failed to save whiskey. Please try again.',
        duration: 10000,
      },
    ]);
    return <Toaster toasts={toasts} onRemove={() => {}} />;
  },
};

export const MultipleToasts: Story = {
  render: () => {
    const [toasts] = useState<Toast[]>([
      {
        id: '1',
        type: 'success',
        message: 'Whiskey added successfully!',
        duration: 10000,
      },
      {
        id: '2',
        type: 'info',
        message: 'Remember to update the price.',
        duration: 10000,
      },
      {
        id: '3',
        type: 'warning',
        message: 'Low stock warning for this item.',
        duration: 10000,
      },
    ]);
    return <Toaster toasts={toasts} onRemove={() => {}} />;
  },
};
