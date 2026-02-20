import ItemCard from "./ItemCard";

const ItemsList = ({ items, refresh }) => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} refresh={refresh} />
      ))}
    </div>
  );
};

export default ItemsList;