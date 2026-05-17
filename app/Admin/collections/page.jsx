
import CollectionList from "./Component/CollectionList";
import CreerCollectionParMarque from "./Component/CreerCollectionForm";
import CollectionParMarque from "./Component/CollectionParMarque";


export default function HomePage() {
  return (
    <main className="pt-20 overflow-y-auto flex-1 bg-blue-100 text-[#15878f]  font-bold mb-4  ">
     <div className="flex justify-center"><h1 className="text-[#15878f]  font-bold mb-4">COLLECTION PAR MARQUE</h1></div>
      <CreerCollectionParMarque/>
      <CollectionList/>
      <CollectionParMarque/>
      

    </main>
  );
}