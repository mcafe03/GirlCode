import { Link } from "react-router-dom";

export default function Breadcrumbs({ productName }) {
  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link> <span>›</span>
      <Link to="/products">Product</Link> <span>›</span>
      <span>{productName}</span>
    </div>
  );
}
