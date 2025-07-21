import React, { useState, useEffect } from "react";
import styles from "./PdpPage.css";
import { useProduct } from "vtex.product-context";
// import { getValuesByNameforSkuSpecifications } from '../../utils/helper';

const PdpPage = () => {
  const productContextValue = useProduct();

  console.log("productContextValue==", productContextValue);

  const [selectedOption, setSelectedOption] = useState("");
  const [sidebarItems, setSidebarItems] = useState([]);
  const [optionData, setOptionData] = useState({});

  useEffect(() => {
    const assemblies = productContextValue?.assemblyOptions?.items ?? {};
    const keys = Object.keys(assemblies);

    setSidebarItems(keys);
    setOptionData(assemblies);

    if (keys.length > 0) {
      setSelectedOption(keys[0]);
    }

    console.log("Assembly Option Keys:", keys);
    console.log("Assembly Items Map:", assemblies);
  }, [productContextValue]);

  const productName = productContextValue?.product?.productName;
  const productPrice = productContextValue?.selectedItem?.sellers?.[0]?.commertialOffer?.Price;

  return (
    <>
      <div className={styles.pdpRightCol}>
        <div className={styles.productTitle}>
          <h1>{productName}</h1>
        </div>
        <div className={styles.productPrice}>
          <p>{productPrice ? `$${productPrice}` : "$0.00"}</p>
        </div>

        <div className={styles.selectOptionContainer}>
          {/* Sidebar Items */}
          <div className={styles.sidebar}>
            {sidebarItems.map((item, index) => {
              // Extract a clean label from the VTEX key
              const label = item
                .split(".")
                .pop()
                .split("_")[0]
                .split("-")[0]
                .trim();

              return (
                <div
                  key={index}
                  className={
                    item === selectedOption
                      ? `${styles.sidebarItem} ${styles.active}`
                      : styles.sidebarItem
                  }
                  onClick={() => setSelectedOption(item)}
                >
                  {label}
                </div>
              );
            })}
          </div>

          {/* Grid Items */}
          <div className={styles.gridContainer}>
            {(optionData[selectedOption] || []).map((option, index) => (
              <div key={index} className={styles.gridItem}>
                {option.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PdpPage;
