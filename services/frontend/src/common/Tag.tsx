import React from 'react';

export interface TagType {
  name: string;
  color: string; // Hex color code
}

// Predefined tags with their colors
export const PREDEFINED_TAGS: Record<string, TagType> = {
  LYFT: { name: 'Lyft', color: '#FF00BF' },  // Pink
  BUS: { name: 'Bus', color: '#2ECC40' },    // Green
  UBER: { name: 'Uber', color: '#AAAAAA' },  // Light grey
  CARPOOL: { name: 'Carpool', color: '#FF851B' }  // Orange
};

// Tag component props
interface TagProps {
  tag: TagType;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  
  const tagStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '16px', // Pill shape
    backgroundColor: tag.color,
    color: '#fff',
    fontSize: '0.8em',
    fontWeight: 'bold',
  };

  return (
    <div style={tagStyle}>
      {tag.name}
    </div>
  );
};

export default Tag;