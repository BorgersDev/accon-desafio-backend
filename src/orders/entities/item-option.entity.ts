import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity('item_option')
export class ItemOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Item, (item) => item.options)
  @JoinColumn({ name: 'item_id' })
  item: Item;

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
  original_price: number | null;

  @Column({ type: 'numeric', nullable: true })
  subtotal_price: number | null;

  @Column({ type: 'numeric', nullable: true })
  total_price: number;

  @Column({ nullable: true })
  currency: string;
}
