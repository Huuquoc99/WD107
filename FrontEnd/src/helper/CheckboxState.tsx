import { useState } from "react";
import { Products } from "../interfaces/products";


const useCheckboxStates = () => {
  const [isActive, setIsActive] = useState(false);
  const [isHotDeal, setIsHotDeal] = useState(false);
  const [isGoodDeal, setIsGoodDeal] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isShowHome, setIsShowHome] = useState(false);

  const createNewProduct = (product: Products) => {
    return {
      ...product,
      is_active: isActive ? 1 : 0,
      is_hot_deal: isHotDeal ? 1 : 0,
      is_good_deal: isGoodDeal ? 1 : 0,
      is_new: isNew ? 1 : 0,
      is_show_home: isShowHome ? 1 : 0,
    };
  };

  return {
    isActive,
    setIsActive,
    isHotDeal,
    setIsHotDeal,
    isGoodDeal,
    setIsGoodDeal,
    isNew,
    setIsNew,
    isShowHome,
    setIsShowHome,
    createNewProduct,
  };
};

export default useCheckboxStates;