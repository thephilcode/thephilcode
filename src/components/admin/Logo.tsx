import Image from 'next/image';

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
      <Image src="/admin/icon.svg" alt="" width={36} height={36} />
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: '#F5F5F3',
          fontSize: '3.125rem',
          fontWeight: 'bold',
          letterSpacing: '0.02em',
        }}
      >
        thephilcode
      </span>
    </div>
  )
}
