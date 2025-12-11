import React from 'react';
import { Whiskey } from '../types/whiskey';

export interface WhiskeyListItemProps {
  /**
   * Whiskey data to display
   */
  whiskey: Whiskey;
  /**
   * Click handler for the row
   */
  onClick?: (id: string) => void;
}

/**
 * WhiskeyListItem component displays a single whiskey in a table row format
 */
export const WhiskeyListItem: React.FC<WhiskeyListItemProps> = ({
  whiskey,
  onClick,
}) => {
  const rowStyle: React.CSSProperties = {
    borderBottom: '1px solid #dee2e6',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'background-color 0.2s ease',
  };

  const cellStyle: React.CSSProperties = {
    padding: '12px',
    fontSize: '14px',
    color: '#212529',
  };

  const nameCellStyle: React.CSSProperties = {
    ...cellStyle,
    fontWeight: 600,
  };

  const tagStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: '#e9ecef',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    marginRight: '4px',
    color: '#495057',
  };

  const formatPrice = (cents?: number) => {
    if (!cents) return '—';
    return `$${(cents / 100).toFixed(2)}`;
  };

  const formatRating = (rating?: number | null) => {
    if (!rating) return '—';
    return `${rating.toFixed(1)} ⭐`;
  };

  return (
    <tr
      style={rowStyle}
      onClick={() => onClick?.(whiskey.id)}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = '#f8f9fa';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <td style={nameCellStyle}>{whiskey.name}</td>
      <td style={cellStyle}>{whiskey.distillery || '—'}</td>
      <td style={cellStyle}>{whiskey.region || '—'}</td>
      <td style={cellStyle}>{whiskey.age ? `${whiskey.age}y` : '—'}</td>
      <td style={cellStyle}>{whiskey.abv ? `${whiskey.abv}%` : '—'}</td>
      <td style={cellStyle}>{whiskey.quantity || 0}</td>
      <td style={cellStyle}>{formatPrice(whiskey.priceCents)}</td>
      <td style={cellStyle}>{formatRating(whiskey.rating)}</td>
      <td style={cellStyle}>
        {whiskey.tags && whiskey.tags.length > 0 ? (
          whiskey.tags.map((tag, index) => (
            <span key={index} style={tagStyle}>
              {tag}
            </span>
          ))
        ) : (
          '—'
        )}
      </td>
    </tr>
  );
};
