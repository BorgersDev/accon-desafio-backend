import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('delivery')
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, (order) => order.delivery)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ nullable: true })
  delivered_by: string;

  @Column({ type: 'timestamp', nullable: true })
  estimated_delivery_date_time: string;

  @Column({ type: 'timestamp', nullable: true })
  delivery_date_time: string;

  @Column({ nullable: true })
  pickup_code: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  reference_point: string;

  @Column({ nullable: true })
  formatted_address: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;
}
