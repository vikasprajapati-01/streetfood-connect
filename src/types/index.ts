export type UserRole = 'vendor' | 'supplier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber: string;
  address: Address;
  createdAt: string;
}

export interface Vendor extends User {
  role: 'vendor';
  businessName: string;
  foodType: string[];
  avgDailyCustomers: number;
}

export interface Supplier extends User {
  role: 'supplier';
  businessName: string;
  description: string;
  categories: string[];
  rating: number;
  reviewCount: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  landmark?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  minimumOrderQuantity: number;
  stock: number;
  image: string;
  supplierId: string;
  supplierName: string;
  rating: number;
  reviewCount: number;
}

export interface Order {
  id: string;
  vendorId: string;
  supplierId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  deliveryAddress: Address;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export interface GroupBuy {
  id: string;
  initiatorId: string;
  productId: string;
  productName: string;
  supplierId: string;
  supplierName: string;
  targetQuantity: number;
  currentQuantity: number;
  unitPrice: number;
  discountedUnitPrice: number;
  deadline: string;
  status: 'active' | 'completed' | 'failed';
  participants: GroupBuyParticipant[];
  createdAt: string;
}

export interface GroupBuyParticipant {
  vendorId: string;
  vendorName: string;
  quantity: number;
  joinedAt: string;
}

export interface Review {
  id: string;
  vendorId: string;
  vendorName: string;
  supplierId?: string;
  productId?: string;
  rating: number;
  comment: string;
  createdAt: string;
}