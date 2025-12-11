import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WhiskeysService } from '../generated';
import type { WhiskeyCreate } from '../generated';

export default function WhiskeyCreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<WhiskeyCreate>({
    name: '',
    distillery: '',
    region: '',
    age: undefined,
    abv: undefined,
    size_ml: undefined,
    quantity: 1,
    purchaseDate: undefined,
    priceCents: undefined,
    notes: '',
    imageUrl: '',
    tags: [],
    rating: undefined,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Clean up the form data - remove empty strings
      const submitData: WhiskeyCreate = { ...formData };
      
      const created = await WhiskeysService.createWhiskey(submitData);
      navigate(`/whiskeys/${created.id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create whiskey';
      setError(errorMessage);
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof WhiskeyCreate, value: WhiskeyCreate[keyof WhiskeyCreate]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/whiskeys">← Back to List</Link>
      </div>

      <h1>Add New Whiskey</h1>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '5px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Distillery
          </label>
          <input
            type="text"
            value={formData.distillery}
            onChange={(e) => handleChange('distillery', e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Region
          </label>
          <input
            type="text"
            value={formData.region}
            onChange={(e) => handleChange('region', e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Age (years)
            </label>
            <input
              type="number"
              value={formData.age || ''}
              onChange={(e) => handleChange('age', e.target.value ? parseInt(e.target.value) : undefined)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              ABV (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.abv || ''}
              onChange={(e) => handleChange('abv', e.target.value ? parseFloat(e.target.value) : undefined)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Size (ml)
            </label>
            <input
              type="number"
              value={formData.size_ml || ''}
              onChange={(e) => handleChange('size_ml', e.target.value ? parseInt(e.target.value) : undefined)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Quantity
            </label>
            <input
              type="number"
              value={formData.quantity || 1}
              onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Purchase Date
            </label>
            <input
              type="date"
              value={formData.purchaseDate || ''}
              onChange={(e) => handleChange('purchaseDate', e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.priceCents ? formData.priceCents / 100 : ''}
              onChange={(e) =>
                handleChange('priceCents', e.target.value ? Math.round(parseFloat(e.target.value) * 100) : undefined)
              }
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Rating (0-5)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating || ''}
            onChange={(e) => handleChange('rating', e.target.value ? parseFloat(e.target.value) : undefined)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Image URL
          </label>
          <input
            type="url"
            value={formData.imageUrl || ''}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={formData.tags?.join(', ') || ''}
            onChange={(e) =>
              handleChange(
                'tags',
                e.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter((t) => t)
              )
            }
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Notes
          </label>
          <textarea
            value={formData.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={4}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '10px 20px',
              backgroundColor: submitting ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Creating...' : 'Create Whiskey'}
          </button>
          <Link to="/whiskeys">
            <button
              type="button"
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
