import Image from 'next/image';
import Link from 'next/link';

interface RoomCardProps {
  name: string;
  price: number;
  image: string;
  description?: string;
  id?: number;
}

const RoomCard = ({ name, price, image, description, id }: RoomCardProps) => (
  <div id={`room-${id}`} className="flex-shrink-0 w-72 bg-[var(--card)] text-[var(--card-foreground)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative h-48">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2 text-[var(--heading)]">{name}</h3>
      {description && <p className="text-[var(--card-foreground)] mb-3 text-sm">{description}</p>}
      {price > 0 && <p className="text-[var(--muted-foreground)] mb-3">¥{price.toLocaleString()}/泊〜</p>}
      <Link href="/rooms" className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors inline-flex items-center">
        詳細を見る
      </Link>
    </div>
  </div>
);

export default RoomCard; 