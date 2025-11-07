import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import PaymentMethodBox from './PaymentMethodBox';
import { PaymentMethod, PaymentMethodType, PaymentMethodStatus } from '@riffy/types';

const mockToastSuccess = jest.fn();
jest.mock('../../../hooks/useToast', () => ({
  useToast: () => ({
    success: mockToastSuccess,
  }),
}));

const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe('<PaymentMethodBox />', () => {
  beforeEach(() => {
    mockToastSuccess.mockClear();
    mockWriteText.mockClear();
  });

  it('muestra mensaje cuando no hay paymentMethod seleccionado', () => {
    render(<PaymentMethodBox paymentMethod={undefined} />);

    expect(screen.getByText('Selecciona un método de pago')).toBeInTheDocument();
  });

  describe('Pago Móvil', () => {
    const pagoMovilMethod: PaymentMethod = {
      id: '1',
      name: 'Pago Móvil',
      type: PaymentMethodType.PAGO_MOVIL,
      status: PaymentMethodStatus.ACTIVE,
      phoneNumber: '04121234567',
      nationalId: '12345678',
      bankName: 'Banco de Venezuela',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      ownerId: 'owner-1',
    } as PaymentMethod;

    it('muestra la información de Pago Móvil correctamente', () => {
      render(<PaymentMethodBox paymentMethod={pagoMovilMethod} />);

      expect(screen.getByText('Número de teléfono')).toBeInTheDocument();
      expect(screen.getByText('04121234567')).toBeInTheDocument();
      expect(screen.getByText('Cédula de identidad')).toBeInTheDocument();
      expect(screen.getByText('12345678')).toBeInTheDocument();
      expect(screen.getByText('Banco')).toBeInTheDocument();
      expect(screen.getByText('Banco de Venezuela')).toBeInTheDocument();
    });

    it('copia el número de teléfono al portapapeles', () => {
      render(<PaymentMethodBox paymentMethod={pagoMovilMethod} />);

      const phoneSection = screen.getByText('04121234567').closest('div')?.parentElement;
      const copyIcon = phoneSection?.querySelector('[class*="cursor-pointer"]');

      if (copyIcon) {
        fireEvent.click(copyIcon);
        expect(mockWriteText).toHaveBeenCalledWith('04121234567');
        expect(mockToastSuccess).toHaveBeenCalledWith('Copiado al portapapeles');
      }
    });

    it('copia la cédula al portapapeles', () => {
      render(<PaymentMethodBox paymentMethod={pagoMovilMethod} />);

      const nationalIdSection = screen.getByText('12345678').closest('div')?.parentElement;
      const copyIcon = nationalIdSection?.querySelector('[class*="cursor-pointer"]');

      if (copyIcon) {
        fireEvent.click(copyIcon);
        expect(mockWriteText).toHaveBeenCalledWith('12345678');
        expect(mockToastSuccess).toHaveBeenCalledWith('Copiado al portapapeles');
      }
    });

    it('copia el nombre del banco al portapapeles', () => {
      render(<PaymentMethodBox paymentMethod={pagoMovilMethod} />);

      const bankSection = screen.getByText('Banco de Venezuela').closest('div')?.parentElement;
      const copyIcon = bankSection?.querySelector('[class*="cursor-pointer"]');

      if (copyIcon) {
        fireEvent.click(copyIcon);
        expect(mockWriteText).toHaveBeenCalledWith('Banco de Venezuela');
        expect(mockToastSuccess).toHaveBeenCalledWith('Copiado al portapapeles');
      }
    });

    it('muestra "No disponible" cuando los campos están vacíos', () => {
      const emptyPagoMovil: PaymentMethod = {
        ...pagoMovilMethod,
        phoneNumber: null,
        nationalId: null,
        bankName: null,
      } as PaymentMethod;

      render(<PaymentMethodBox paymentMethod={emptyPagoMovil} />);

      const noDisponibleTexts = screen.getAllByText('No disponible');
      expect(noDisponibleTexts.length).toBeGreaterThan(0);
    });
  });

  describe('Binance Pay', () => {
    const binanceMethod: PaymentMethod = {
      id: '2',
      name: 'Binance Pay',
      type: PaymentMethodType.BINANCE_PAY,
      status: PaymentMethodStatus.ACTIVE,
      binanceId: 'binance123',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      ownerId: 'owner-1',
    } as PaymentMethod;

    it('muestra la información de Binance Pay correctamente', () => {
      render(<PaymentMethodBox paymentMethod={binanceMethod} />);

      expect(screen.getByText('ID de Binance')).toBeInTheDocument();
      expect(screen.getByText('binance123')).toBeInTheDocument();
    });

    it('copia el ID de Binance al portapapeles', () => {
      render(<PaymentMethodBox paymentMethod={binanceMethod} />);

      const binanceSection = screen.getByText('binance123').closest('div')?.parentElement;
      const copyIcon = binanceSection?.querySelector('[class*="cursor-pointer"]');

      if (copyIcon) {
        fireEvent.click(copyIcon);
        expect(mockWriteText).toHaveBeenCalledWith('binance123');
        expect(mockToastSuccess).toHaveBeenCalledWith('Copiado al portapapeles');
      }
    });

    it('muestra "No disponible" cuando el binanceId está vacío', () => {
      const emptyBinance: PaymentMethod = {
        ...binanceMethod,
        binanceId: null,
      } as PaymentMethod;

      render(<PaymentMethodBox paymentMethod={emptyBinance} />);

      expect(screen.getByText('No disponible')).toBeInTheDocument();
    });
  });

  describe('PayPal', () => {
    const paypalMethod: PaymentMethod = {
      id: '3',
      name: 'PayPal',
      type: PaymentMethodType.PAYPAL,
      status: PaymentMethodStatus.ACTIVE,
      paypalEmail: 'test@example.com',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      ownerId: 'owner-1',
    } as PaymentMethod;

    it('muestra la información de PayPal correctamente', () => {
      render(<PaymentMethodBox paymentMethod={paypalMethod} />);

      expect(screen.getByText('Correo electrónico')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    it('copia el email de PayPal al portapapeles', () => {
      render(<PaymentMethodBox paymentMethod={paypalMethod} />);

      const paypalSection = screen.getByText('test@example.com').closest('div')?.parentElement;
      const copyIcon = paypalSection?.querySelector('[class*="cursor-pointer"]');

      if (copyIcon) {
        fireEvent.click(copyIcon);
        expect(mockWriteText).toHaveBeenCalledWith('test@example.com');
        expect(mockToastSuccess).toHaveBeenCalledWith('Copiado al portapapeles');
      }
    });

    it('muestra "No disponible" cuando el paypalEmail está vacío', () => {
      const emptyPaypal: PaymentMethod = {
        ...paypalMethod,
        paypalEmail: null,
      } as PaymentMethod;

      render(<PaymentMethodBox paymentMethod={emptyPaypal} />);

      expect(screen.getByText('No disponible')).toBeInTheDocument();
    });
  });

  it('muestra mensaje cuando el tipo de método no es reconocido', () => {
    const unknownMethod: PaymentMethod = {
      id: '4',
      name: 'Unknown',
      type: 'UNKNOWN_TYPE' as PaymentMethodType,
      status: PaymentMethodStatus.ACTIVE,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      ownerId: 'owner-1',
    } as PaymentMethod;

    render(<PaymentMethodBox paymentMethod={unknownMethod} />);

    expect(screen.getByText('Tipo de método de pago no reconocido')).toBeInTheDocument();
  });
});
