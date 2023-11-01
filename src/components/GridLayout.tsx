import { useState, useEffect } from 'react'
import GridAddItem from './GridAddItem'
import GridItem from './GridItem'
import { ReactSortable } from 'react-sortablejs';
import { images, ImageProps } from './dataSource'; 
const GridLayout = () => {
    const [imageData, setImageData] = useState<ImageProps[]>(images);

    // Drag and Drop Handler
    const onDragDropEnds = (oldIndex:any, newIndex:any) => {
        console.log('Drag and drop other tasks');
        console.log(oldIndex, newIndex);
    };
  return (
      <div className="border rounded-3 p-3 shadow">
          {imageData.length === 0 ? (
              <GridAddItem />
          ) : (
              <ReactSortable
                list={imageData}
                setList={(newlist) => setImageData(newlist)}
                  ghostClass="dropArea"
                  handle=".dragHandle"
                //   filter=".ignoreDrag"
                  preventOnFilter={true}
                  className="grid-container"
                  onEnd={({ oldIndex, newIndex }) => onDragDropEnds(oldIndex, newIndex)}
              >
                  <>
                          {imageData.map((img:any, index: number) => (
                              <GridItem key={img.id} img={img} isFirst={index === 0} />
                      ))}
                      <GridAddItem />
                  </>
              </ReactSortable>
          )}
      </div>
  )
}

export default GridLayout