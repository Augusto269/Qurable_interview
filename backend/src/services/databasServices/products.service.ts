import { Injectable } from '@nestjs/common';
import { DiscountsInterface } from 'src/schemas/discounts/discounts.schema';

const productsMocked = [
  {
    size: 'M',
    id: 'product1',
    productName: 'T-Shirt',
    amount: 25.0,
    shipping: 5.0,
    type: 'shirt',
  },
  {
    size: 'L',
    id: 'product2',
    productName: 'Jeans',
    amount: 50.0,
    shipping: 7.0,
    type: 'pants',
  },
  {
    size: 'S',
    id: 'product3',
    productName: 'Sneakers',
    amount: 70.0,
    shipping: 10.0,
    type: 'shoes',
  },
];

@Injectable()
export class ProductService {
  constructor() {}
  async calculateTotalAmount(
    products: string[],
    discountDocument: DiscountsInterface,
  ): Promise<number> {
    let totalAmount = 0;
    let totalDiscount = 0; // To accumulate discount values

    for (const id of products) {
      const product = productsMocked.find((p) => p.id === id);

      if (product) {
        totalAmount += product.amount; // Add product amount to total

        // Check if discount can be applied
        if (discountDocument) {
          if (
            discountDocument.type === 'all' ||
            discountDocument.type === product.type
          ) {
            totalDiscount +=
              product.amount * (discountDocument.percentage / 100); // Calculate discount
          }
        }
      } else {
        throw new Error(`Product ${id} not found.`);
      }
    }

    // Calculate the final amount after applying the discount
    const finalAmount = totalAmount - totalDiscount;

    return finalAmount;
  }
}
