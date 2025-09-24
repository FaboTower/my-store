// Simula una API que responde con una promesa
const MOCK_PRODUCTS = [
  { id: 1, title: 'Mouse',    brand: 'Logi',     price: 15990,  stock: 7,  description: 'Mouse inalámbrico',       image: 'https://picsum.photos/seed/mouse/640/400' },
  { id: 2, title: 'Teclado',  brand: 'Keychron', price: 45990,  stock: 3,  description: 'Teclado mecánico 60%',     image: 'https://picsum.photos/seed/keys/640/400' },
  { id: 3, title: 'Monitor',  brand: 'Dell',     price: 129990, stock: 0,  description: '24" IPS 75Hz',             image: 'https://picsum.photos/seed/monitor/640/400' },
  { id: 4, title: 'Audífonos',brand: 'Sony',     price: 69990,  stock: 11, description: 'BT Noise Cancelling',      image: 'https://picsum.photos/seed/phones/640/400' },
  { id: 5, title: 'Webcam',   brand: 'Logi',     price: 29990,  stock: 5,  description: '1080p con autofocus',      image: 'https://picsum.photos/seed/webcam/640/400' },
];

export const Products = {
  all() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PRODUCTS), 500); // simula latencia
    });
  }
};