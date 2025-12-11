import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { WhiskeysService } from '../generated';
import type { Whiskey } from '../generated';

export default function WhiskeyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [whiskey, setWhiskey] = useState<Whiskey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    WhiskeysService.getWhiskey(id)
      .then((data) => {
        setWhiskey(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!id || !confirm('Are you sure you want to delete this whiskey?')) return;
    
    try {
      await WhiskeysService.deleteWhiskey(id);
      navigate('/whiskeys');
    } catch (err: any) {
      alert('Failed to delete whiskey: ' + err.message);
    }
  };

  if (loading) return <div>Loading whiskey details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!whiskey) return <div>Whiskey not found</div>;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/whiskeys">← Back to List</Link>
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '30px', backgroundColor: '#f9f9f9' }}>
        <h1>{whiskey.name}</h1>
        
        {whiskey.imageUrl && (
          <img
            src={whiskey.imageUrl}
            alt={whiskey.name}
            style={{ maxWidth: '300px', marginBottom: '20px' }}
          />
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '10px', marginBottom: '20px' }}>
          <strong>Distillery:</strong>
          <span>{whiskey.distillery || 'N/A'}</span>

          <strong>Region:</strong>
          <span>{whiskey.region || 'N/A'}</span>

          {whiskey.age && (
            <>
              <strong>Age:</strong>
              <span>{whiskey.age} years</span>
            </>
          )}

          {whiskey.abv && (
            <>
              <strong>ABV:</strong>
              <span>{whiskey.abv}%</span>
            </>
          )}

          {whiskey.size_ml && (
            <>
              <strong>Size:</strong>
              <span>{whiskey.size_ml}ml</span>
            </>
          )}

          <strong>Quantity:</strong>
          <span>{whiskey.quantity}</span>

          {whiskey.purchaseDate && (
            <>
              <strong>Purchase Date:</strong>
              <span>{whiskey.purchaseDate}</span>
            </>
          )}

          {whiskey.priceCents && (
            <>
              <strong>Price:</strong>
              <span>${(whiskey.priceCents / 100).toFixed(2)}</span>
            </>
          )}

          {whiskey.rating && (
            <>
              <strong>Rating:</strong>
              <span>{whiskey.rating}/5</span>
            </>
          )}
        </div>

        {whiskey.notes && (
          <div style={{ marginBottom: '20px' }}>
            <strong>Notes:</strong>
            <p>{whiskey.notes}</p>
          </div>
        )}

        {whiskey.tags && whiskey.tags.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <strong>Tags:</strong>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              {whiskey.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '14px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>
          <p>Created: {new Date(whiskey.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(whiskey.updatedAt).toLocaleString()}</p>
        </div>

        <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
          <button
            onClick={handleDelete}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
