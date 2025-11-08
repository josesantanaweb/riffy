// import { formatCurrency } from './formatCurrency';

// describe('formatCurrency', () => {
//   describe('con moneda USD', () => {
//     it('formatea un valor entero correctamente', () => {
//       const result = formatCurrency(100, 'USD');
//       expect(result).toBe('$100.00');
//     });

//     it('formatea un valor decimal correctamente', () => {
//       const result = formatCurrency(99.99, 'USD');
//       expect(result).toBe('$99.99');
//     });

//     it('formatea un valor con muchos decimales redondeando a 2', () => {
//       const result = formatCurrency(100.999, 'USD');
//       expect(result).toBe('$101.00');
//     });

//     it('formatea el valor cero correctamente', () => {
//       const result = formatCurrency(0, 'USD');
//       expect(result).toBe('$0.00');
//     });

//     it('usa USD por defecto cuando no se especifica la moneda', () => {
//       const result = formatCurrency(100);
//       expect(result).toBe('$100.00');
//     });
//   });

//   describe('con moneda VES', () => {
//     it('formatea un valor entero correctamente', () => {
//       const result = formatCurrency(100, 'VES');
//       expect(result).toMatch(/^Bs\.S\s+100,00$/);
//     });

//     it('formatea un valor decimal correctamente', () => {
//       const result = formatCurrency(99.99, 'VES');
//       expect(result).toMatch(/^Bs\.S\s+99,99$/);
//     });

//     it('formatea el valor cero correctamente', () => {
//       const result = formatCurrency(0, 'VES');
//       expect(result).toMatch(/^Bs\.S\s+0,00$/);
//     });

//     it('formatea valores negativos correctamente', () => {
//       const result = formatCurrency(-50.5, 'VES');
//       expect(result).toMatch(/^Bs\.S-50,50$/);
//     });
//   });
// });

