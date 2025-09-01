import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Merchant } from './merchant.entity';
import { Customer } from './customer.entity';
import { OrderTotal } from './order-total.entity';
import { PaymentMethod } from './payment-method.entity';
import { Item } from './item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Merchant, (merchant) => merchant.orders, { cascade: true })
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;

  @ManyToOne(() => Customer, (customer) => customer.orders, { cascade: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  type: string;

  @Column({ nullable: true })
  display_id: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ nullable: true })
  order_timing: string;

  @Column({ type: 'timestamp', nullable: true })
  preparation_start: Date;

  @Column({ nullable: true })
  extra_info: string;

  @OneToOne(() => OrderTotal, (total) => total.order, { cascade: true })
  total: OrderTotal;

  @OneToMany(() => PaymentMethod, (payment) => payment.order, { cascade: true })
  payments: PaymentMethod[];

  @OneToMany(() => Item, (item) => item.order, { cascade: true })
  items: Item[];
}
