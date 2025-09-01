import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('payment_method')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ type: 'numeric', nullable: true })
  value: number;

  @Column({ nullable: true })
  currency: string;
}
