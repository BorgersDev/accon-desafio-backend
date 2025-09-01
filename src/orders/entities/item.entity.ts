import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { ItemOption } from './item-option.entity';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ nullable: true })
  external_code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  unit: string;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'numeric', nullable: true })
  unit_price: number;

  @Column({ type: 'numeric', nullable: true })
  total_price: number;

  @Column({ nullable: true })
  currency: string;

  @OneToMany(() => ItemOption, (option) => option.item, { cascade: true })
  options: ItemOption[];
}
