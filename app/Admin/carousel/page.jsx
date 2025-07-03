import UploadCarouselImage from "./components/UpluadCarouselImage";


export default function CarouselAdminPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Admin – Gestion du Carousel</h1>
      <UploadCarouselImage/>
    </div>
  );
}
