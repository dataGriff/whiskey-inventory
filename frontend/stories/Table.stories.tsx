import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../components/Table';

interface SampleData {
  id: number;
  name: string;
  email: string;
  role: string;
}

const sampleData: SampleData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

const columns = [
  {
    header: 'ID',
    accessor: (row: SampleData) => row.id,
    width: '80px',
  },
  {
    header: 'Name',
    accessor: (row: SampleData) => row.name,
  },
  {
    header: 'Email',
    accessor: (row: SampleData) => row.email,
  },
  {
    header: 'Role',
    accessor: (row: SampleData) => row.role,
    width: '120px',
  },
];

const meta: Meta<typeof Table<SampleData>> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table<SampleData>>;

export const WithData: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'No users found',
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
  },
};

export const SingleRow: Story = {
  args: {
    columns,
    data: [sampleData[0]],
  },
};

export const ManyRows: Story = {
  args: {
    columns,
    data: [
      ...sampleData,
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin' },
      { id: 6, name: 'Diana Martinez', email: 'diana@example.com', role: 'User' },
    ],
  },
};
