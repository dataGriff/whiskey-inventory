import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithTrigger = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalWithTrigger title="Example Modal">
      <p>This is the modal content. You can put any React components here.</p>
      <p>Press ESC or click outside to close.</p>
    </ModalWithTrigger>
  ),
};

export const WithForm: Story = {
  render: () => (
    <ModalWithTrigger title="Add New Item">
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label>Name:</label>
          <input type="text" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" style={{ width: '100%', padding: '8px' }} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </ModalWithTrigger>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ModalWithTrigger title="Terms and Conditions">
      <div style={{ maxHeight: '400px', overflow: 'auto' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            This is paragraph {i + 1} of the long content. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
          </p>
        ))}
      </div>
    </ModalWithTrigger>
  ),
};

export const NarrowModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Narrow Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirmation"
          width="400px"
        >
          <p>Are you sure you want to delete this item?</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <Button variant="danger">Delete</Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};
