import React, { useEffect, useRef, useState } from "react";
import "./InfiniteScroll.css";

const InfiniteScroll = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [product, setProductData] = useState<any>({});
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(
      `https://dummyjson.com/products?limit=20&skip=${
        pageNumber * 20
      }&select=title,images`
    )
      .then((res) => res.json())
      .then((res) =>
        setProductData((pre: any) => ({
          ...pre,
          products: [...(pre.products || []), ...res.products],
        }))
      )
      .catch((err) => {
        console.log(err);
      });
  }, [pageNumber]);

  const handleScroll = () => {
    let scrollHeight = divRef.current?.scrollHeight;
    let heightFromTop = divRef.current?.scrollTop;
    let leftHeight = divRef.current?.clientHeight;

    if (scrollHeight === Number(heightFromTop) + Number(leftHeight)) {
      setPageNumber((pre) => pre + 1);
    }
  };

  return (
    <div
      onScroll={handleScroll}
      ref={divRef}
      className="infinite-scroll-container"
    >
      {product?.products?.map((item: any, index: number) => (
        <div key={index}>
          {" "}
          {index + 1}. {item?.title}{" "}
        </div>
      ))}
    </div>
  );
};

export default InfiniteScroll;
