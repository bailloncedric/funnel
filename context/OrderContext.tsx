// Fix: Implement the OrderContext to manage application state.
import React, { createContext, useState, Dispatch, SetStateAction } from 'react';
import { Order } from '../types';

interface OrderContextProps {
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
}

const defaultOrderState: Order = {
    mainProduct: false,
    upsellProduct: false,
    downsellProduct: false,
    total: 0,
};

export const OrderContext = createContext<OrderContextProps>({
  order: defaultOrderState,
  setOrder: () => {},
});

export const OrderProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [order, setOrder] = useState<Order>(defaultOrderState);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
