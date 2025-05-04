import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import "./PaginationScreen";

const PaginationScreen = () => {
  const [product, setProductData] = useState<any>({});
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    fetch(
      `https://dummyjson.com/products?limit=20&skip=${
        pageNumber * 20
      }&select=title,images`
    )
      .then((res) => res.json())
      .then((res) => setProductData(res))
      .catch((err) => {
        console.log(err);
      });
  }, [pageNumber]);
  return (
    <div className="App">
      <div>
        {product?.products?.map((item: any, index: number) => (
          <div key={index}> {item?.title} </div>
        ))}
      </div>
      <Pagination
        setPageNumber={setPageNumber}
        totalItem={product?.total || 0}
        perPage={20}
      />
    </div>
  );
};

export default PaginationScreen;
