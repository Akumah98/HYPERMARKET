import { Product } from '../../catalog/services/catalogService';

export function deductStockFEFO(product: Product, quantityToDeduct: number): Product {
  const newProduct = { ...product };
  
  if ((newProduct as any).batches && (newProduct as any).batches.length > 0) {
    let qtyToDeduct = quantityToDeduct;
    const newBatches = (newProduct as any).batches.map((b: any) => ({ ...b }));
    
    // Sort by expiry date (FEFO)
    newBatches.sort((a: any, b: any) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
    
    for (const batch of newBatches) {
      if (qtyToDeduct <= 0) break;
      if (batch.quantity >= qtyToDeduct) {
        batch.quantity -= qtyToDeduct;
        qtyToDeduct = 0;
      } else {
        qtyToDeduct -= batch.quantity;
        batch.quantity = 0;
      }
    }
    
    (newProduct as any).batches = newBatches.filter((b: any) => b.quantity > 0);
  } else if (newProduct.stock !== undefined) {
    newProduct.stock = Math.max(0, newProduct.stock - quantityToDeduct);
  }
  
  return newProduct;
}
