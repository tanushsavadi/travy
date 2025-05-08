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

  return (
    <div className="inline-block py-1 px-3 rounded-2xl text-white text-sm font-bold" style={{ backgroundColor: tag.color }}>
      {tag.name}
    </div>
  );
};

export default Tag;