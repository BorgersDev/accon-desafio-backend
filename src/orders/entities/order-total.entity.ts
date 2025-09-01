import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_total')
export class OrderTotal {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @OneToOne(() => Order, (order) => order.total)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'numeric', nullable: true })
  subtotal: number;

  @Column({ type: 'numeric', nullable: true })
  delivery_fee: number;

  @Column({ type: 'numeric', nullable: true })
  other_fees: number;

  @Column({ type: 'numeric', nullable: true })
  discount: number;

  @Column({ type: 'numeric', nullable: true })
  order_amount: number;

  @Column({ nullable: true })
  currency: string;
}
