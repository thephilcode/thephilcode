import Image from 'next/image';

export default function Icon() {
  return (
    <Image
      src="/admin/icon.svg"
      alt="thephilcode"
      width={24}
      height={24}
      style={{ display: 'block' }}
    />
  )
}
