
const GridItem = ({ img, isFirst }: { img: any, isFirst: boolean}) => {
  const featureItemClass = isFirst ? "gallery__item--1" : "";
  const {id, image } = img;
  return (
      <div className={`grid-items card shadow-sm rounded-3 overflow-hidden dragHandle ${featureItemClass}`}>
          <figure className="card-body">
              <img 
                className="gallery__img"
                src={image}
                alt="image"
                />
          </figure>
      </div>
  )
}

export default GridItem