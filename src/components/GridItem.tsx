import { useState } from 'react';

const GridItem = ({ img, isFirst, onCheckboxChange, selected, isHovered, setHoveredItemId, selectedItems }: 
  {
    img: any; isFirst: boolean; onCheckboxChange: (id: number, isChecked: boolean) => void; 
    selected: boolean; isHovered: boolean; 
    setHoveredItemId: (id: number | null) => void;
    selectedItems:any;
 }) => {
  console.log('ishover', isHovered);
  console.log('selected', selected);

  const featureItemClass = isFirst ? "gallery__item--1" : "";
  const { id, image } = img;
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onCheckboxChange(id, !isChecked);
  };

  return (
    <div className = {`card shadow-sm rounded-3 overflow-hidden dragHandle 
    ${featureItemClass} ${selected ? 'selected' : ''}`}
      onMouseEnter = {() => setHoveredItemId(id)} // Set hovered item ID on mouse enter
      onMouseLeave={() => setHoveredItemId(null)} // Clear hovered item ID on mouse leave
    >
      <figure
        className={`card-body relative`}
      >
        <img
          className="gallery__img"
          src={image}
          alt="image"
        />
        {isHovered && (
          <div className={`overlay checkbox-lg check__position`}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={toggleCheckbox}
                className='check-input'
              />
          </div>
        )}
        {selectedItems?.includes(id) && (
          <div className={`overlay checkbox-lg check__position`}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={toggleCheckbox}
              className='check-input'
            />
          </div>
        )}
      </figure>
    </div>
  );
};

export default GridItem;
