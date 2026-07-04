import { useState, useEffect, useCallback } from 'react';
import { vendorService } from '../services/vendorService';
import { Product } from '../../catalog/services/catalogService';

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

  // IoT Sensor State
  const [coldTemp, setColdTemp] = useState(3.8);
  const [coldHumidity, setColdHumidity] = useState(84.5);
  const [generalTemp, setGeneralTemp] = useState(23.2);
  const [generalHumidity, setGeneralHumidity] = useState(52.1);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (role === 'vendor') {
        const data = await vendorService.fetchVendorProducts(1);
        setProducts(data.products || []);
      } else {
        // Load products list for admin via HTTP fetch
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

  // IoT Sensor Simulation Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setColdTemp((t) => +(t + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setColdHumidity((h) => +(h + (Math.random() * 1.0 - 0.5)).toFixed(1));
      setGeneralTemp((t) => +(t + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setGeneralHumidity((h) => +(h + (Math.random() * 0.6 - 0.3)).toFixed(1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Compute batches for FEFO sorting
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
    sensors: {
      cold: { temp: coldTemp, humidity: coldHumidity, status: coldTemp > 5.0 ? 'Warning' : 'OK' },
      general: { temp: generalTemp, humidity: generalHumidity, status: 'OK' },
    },
    refetch: loadData,
  };
}
