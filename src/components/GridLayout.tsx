import { useState } from 'react'
import GridAddItem from './GridAddItem'
import GridItem from './GridItem'
import { ReactSortable } from 'react-sortablejs';
import { images, ImageProps } from './dataSource'; 
const GridLayout = () => {
    const [imageData, setImageData] = useState<ImageProps[]>(images);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [hoveredItemId, setHoveredItemId] = useState<number| null>(null); // Track which item is hovered
    // Function to update the selected items
    const handleCheckboxChange = (id: number, isChecked: boolean) => {
        if (isChecked) {
            setSelectedItems([...selectedItems, id]);
        } else {
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        }
    };

    // Function to delete selected items
    const handleDelete = () => {
        const updatedImageData = imageData.filter((item) => !selectedItems.includes(item.id));
        setImageData(updatedImageData);
        setSelectedItems([]); // Clear selected items after deletion
    };
    // Drag and Drop Handler
    const onDragDropEnds = (oldIndex:any, newIndex:any) => {
        console.log('Drag and drop other tasks');
        console.log(oldIndex, newIndex);
    };
  return (
      <div className="border rounded-3 p-3 shadow">
        {/* count and delete text */}
        {
            selectedItems?.length !==0 ?
            <div className='d-flex justify-content-between mx-2'>
                <div className='d-flex align-items-center'>
                    <div className='checkbox-lg'>
                        <input
                            type="checkbox"
                            checked={true}
                            className='check-input'
                        /> 
                    </div>
                    <div className='count__number'>
                        {selectedItems.length} Files Selected
                    </div>
                </div>
                <p className='delete__text' onClick={handleDelete}>Delete Files</p>
            </div>:
            <h1>Gallery</h1>
        }
          {imageData.length === 0 ? (
              <GridAddItem />
          ) : (
            // sortable image gallery component
              <ReactSortable
                list={imageData}
                setList={(newlist) => setImageData(newlist)}
                  ghostClass="dropArea"
                  handle=".dragHandle"
                  preventOnFilter={true}
                  className="grid-container"
                  onEnd={({ oldIndex, newIndex }) => onDragDropEnds(oldIndex, newIndex)}
              >
                  <>
                    {imageData.map((img:any, index: number) => (
                        <GridItem 
                            key={img.id} 
                            img={img} 
                            isFirst={index === 0} 
                            onCheckboxChange={handleCheckboxChange}
                            selected={selectedItems.includes(img.id)} // Check if the item is in the selectedItems array
                            isHovered={hoveredItemId === img.id} // Pass the hover state
                            setHoveredItemId={setHoveredItemId} // Pass the setter function
                            selectedItems={selectedItems} // Pass the setter function
                        />
                    ))}
                    <GridAddItem />
                  </>
              </ReactSortable>
          )}
      </div>
  )
}

export default GridLayout