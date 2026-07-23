import { useState, useEffect, useCallback } from 'react';
import { vendorService } from '../services/vendorService';
import { Product } from '../../catalog/services/catalogService';
import { eventBus } from '../../../utils/eventBus';
import { deductStockFEFO } from '../utils/warehouseUtils';
import { useWarehouseSimulation } from './useWarehouseSimulation';

export interface BatchItem {
  batchNumber: string;
  quantity: number;
  expiryDate: string;
  warehouseZone: string;
  productName: string;
  stock: number;
}

export function useWarehouseData(role: 'vendor' | 'admin' = 'vendor') {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (role === 'vendor') {
        const data = await vendorService.fetchVendorProducts(1);
        setProducts(data.products || []);
      } else {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?limit=100`);
        const json = await response.json();
        setProducts(json.data?.products || []);
      }
    } catch (err) {
      console.log('Failed to load warehouse products:', err);
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Subscribe to real-time order placements to deduct stock dynamically
  useEffect(() => {
    const unsubPlaced = eventBus.on('order.placed', (newOrder) => {
      setProducts((prevProducts) => {
        let updated = false;
        const newProducts = prevProducts.map((p) => {
          const orderedItem = newOrder.items.find((item: any) => item.product === p._id);
          if (!orderedItem) return p;
          updated = true;
          return deductStockFEFO(p, orderedItem.quantity);
        });
        return updated ? newProducts : prevProducts;
      });
    });

    return () => {
      unsubPlaced();
    };
  }, []);

  // Use simulation hook for IoT sensors
  const { sensors } = useWarehouseSimulation();

  // Compute batches for FEFO sorting with real database expiry dates
  const allBatches: BatchItem[] = products
    .flatMap((p) =>
      ((p as any).batches || []).map((b: any) => ({
        batchNumber: b.batchNumber,
        quantity: b.quantity,
        expiryDate: b.expiryDate,
        warehouseZone: b.warehouseZone,
        productName: p.name,
        stock: p.stock,
      }))
    )
    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());

  return {
    products,
    batches: allBatches,
    loading,
    sensors,
    refetch: loadData,
  };
}
