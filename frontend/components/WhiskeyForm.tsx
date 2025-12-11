import React, { useState } from 'react';
import type { WhiskeyCreate } from '../types/whiskey';
import { Input } from './Input';
import { Button } from './Button';

export interface WhiskeyFormProps {
  /**
   * Initial form data (for edit mode)
   */
  initialData?: Partial<WhiskeyCreate>;
  /**
   * Submit handler
   */
  onSubmit: (data: WhiskeyCreate) => void;
  /**
   * Cancel handler
   */
  onCancel?: () => void;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Form-level error message
   */
  error?: string;
}

/**
 * WhiskeyForm component for creating and editing whiskey entries
 */
export const WhiskeyForm: React.FC<WhiskeyFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
  error,
}) => {
  const [formData, setFormData] = useState<Partial<WhiskeyCreate>>({
    name: '',
    distillery: '',
    region: '',
    age: undefined,
    abv: undefined,
    size_ml: 700,
    quantity: 1,
    purchaseDate: '',
    priceCents: undefined,
    notes: '',
    imageUrl: '',
    tags: [],
    rating: undefined,
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagsInput, setTagsInput] = useState(
    initialData.tags?.join(', ') || ''
  );

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.abv !== undefined && formData.abv !== null && (formData.abv < 0 || formData.abv > 100)) {
      newErrors.abv = 'ABV must be between 0 and 100';
    }

    if (formData.rating !== undefined && formData.rating !== null && (formData.rating < 0 || formData.rating > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    if (formData.quantity !== undefined && formData.quantity !== null && formData.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const submitData: WhiskeyCreate = {
      name: formData.name!,
      distillery: formData.distillery || undefined,
      region: formData.region || undefined,
      age: formData.age || undefined,
      abv: formData.abv || undefined,
      size_ml: formData.size_ml || undefined,
      quantity: formData.quantity || undefined,
      purchaseDate: formData.purchaseDate || undefined,
      priceCents: formData.priceCents || undefined,
      notes: formData.notes || undefined,
      imageUrl: formData.imageUrl || undefined,
      tags: tags.length > 0 ? tags : undefined,
      rating: formData.rating || undefined,
    };

    onSubmit(submitData);
  };

  const formStyle: React.CSSProperties = {
    maxWidth: '600px',
  };

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  };

  const errorMessageStyle: React.CSSProperties = {
    padding: '12px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    marginBottom: '16px',
    border: '1px solid #f5c6cb',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {error && (
        <div style={errorMessageStyle} role="alert">
          {error}
        </div>
      )}

      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter whiskey name"
        required
        disabled={loading}
        error={errors.name}
      />

      <div style={rowStyle}>
        <Input
          label="Distillery"
          name="distillery"
          value={formData.distillery}
          onChange={(e) =>
            setFormData({ ...formData, distillery: e.target.value })
          }
          placeholder="Distillery name"
          disabled={loading}
        />
        <Input
          label="Region"
          name="region"
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          placeholder="e.g., Speyside"
          disabled={loading}
        />
      </div>

      <div style={rowStyle}>
        <Input
          label="Age (years)"
          name="age"
          type="number"
          value={formData.age || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              age: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          placeholder="Age"
          disabled={loading}
        />
        <Input
          label="ABV (%)"
          name="abv"
          type="number"
          value={formData.abv || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              abv: e.target.value ? parseFloat(e.target.value) : undefined,
            })
          }
          placeholder="Alcohol percentage"
          disabled={loading}
          error={errors.abv}
        />
      </div>

      <div style={rowStyle}>
        <Input
          label="Size (ml)"
          name="size_ml"
          type="number"
          value={formData.size_ml || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              size_ml: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          placeholder="700"
          disabled={loading}
        />
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              quantity: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          placeholder="1"
          disabled={loading}
          error={errors.quantity}
        />
      </div>

      <div style={rowStyle}>
        <Input
          label="Purchase Date"
          name="purchaseDate"
          type="date"
          value={formData.purchaseDate || ''}
          onChange={(e) =>
            setFormData({ ...formData, purchaseDate: e.target.value })
          }
          disabled={loading}
        />
        <Input
          label="Price (cents)"
          name="priceCents"
          type="number"
          value={formData.priceCents || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              priceCents: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          placeholder="4999 (for $49.99)"
          disabled={loading}
        />
      </div>

      <Input
        label="Image URL"
        name="imageUrl"
        type="url"
        value={formData.imageUrl || ''}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        placeholder="https://example.com/image.jpg"
        disabled={loading}
      />

      <Input
        label="Tags"
        name="tags"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="speyside, single-malt (comma separated)"
        disabled={loading}
      />

      <Input
        label="Rating"
        name="rating"
        type="number"
        value={formData.rating || ''}
        onChange={(e) =>
          setFormData({
            ...formData,
            rating: e.target.value ? parseFloat(e.target.value) : undefined,
          })
        }
        placeholder="0-5"
        disabled={loading}
        error={errors.rating}
      />

      <Input
        label="Notes"
        name="notes"
        value={formData.notes || ''}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        placeholder="Tasting notes and observations"
        disabled={loading}
      />

      <div style={buttonGroupStyle}>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Whiskey'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
