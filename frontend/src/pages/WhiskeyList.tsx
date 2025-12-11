import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { WhiskeysService } from '../generated';
import type { Whiskey } from '../generated';

export default function WhiskeyList() {
  const [whiskeys, setWhiskeys] = useState<Whiskey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    WhiskeysService.listWhiskeys()
      .then((response) => {
        setWhiskeys(response.items || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading whiskeys...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Whiskey Inventory</h1>
        <Link to="/whiskeys/new">
          <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Add New Whiskey</button>
        </Link>
      </div>
      
      {whiskeys.length === 0 ? (
        <p>No whiskeys in inventory.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {whiskeys.map((whiskey) => (
            <div
              key={whiskey.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h2>
                <Link to={`/whiskeys/${whiskey.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                  {whiskey.name}
                </Link>
              </h2>
              <p><strong>Distillery:</strong> {whiskey.distillery || 'N/A'}</p>
              <p><strong>Region:</strong> {whiskey.region || 'N/A'}</p>
              {whiskey.age && <p><strong>Age:</strong> {whiskey.age} years</p>}
              {whiskey.abv && <p><strong>ABV:</strong> {whiskey.abv}%</p>}
              <p><strong>Quantity:</strong> {whiskey.quantity}</p>
              {whiskey.rating && <p><strong>Rating:</strong> {whiskey.rating}/5</p>}
              {whiskey.tags && whiskey.tags.length > 0 && (
                <p><strong>Tags:</strong> {whiskey.tags.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
