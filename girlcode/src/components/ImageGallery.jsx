export default function ImageGallery({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="image-gallery">
      {images.map((img, index) => (
        <img key={index} src={img} alt={`Product ${index + 1}`} className="gallery-image" />
      ))}
    </div>
  );
}
