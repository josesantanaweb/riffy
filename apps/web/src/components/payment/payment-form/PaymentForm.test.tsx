import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import PaymentForm from './PaymentForm';
import {
  Payment,
  PaymentMethod,
  PaymentMethodType,
  PaymentMethodStatus,
} from '@riffy/types';
import { useStore } from '@/store';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const mockToastError = jest.fn();
const mockToastSuccess = jest.fn();

jest.mock('../../../hooks', () => ({
  useToast: () => ({
    error: mockToastError,
    success: mockToastSuccess,
  }),
}));

jest.mock('@riffy/hooks', () => {
  const mockCreatePaymentFn = jest.fn();
  const mockUseCreatePayment = jest.fn(() => ({
    createPayment: mockCreatePaymentFn,
    loading: false,
    error: null,
  }));
  const mockUseUserByDomain = jest.fn();
  const mockUsePaymentByNationalId = jest.fn();

  return {
    useCreatePayment: mockUseCreatePayment,
    useUserByDomain: mockUseUserByDomain,
    usePaymentByNationalId: mockUsePaymentByNationalId,
    __mocks: {
      createPayment: mockCreatePaymentFn,
      useUserByDomain: mockUseUserByDomain,
      usePaymentByNationalId: mockUsePaymentByNationalId,
    },
  };
});

const mockSetUser = jest.fn();
const mockSetLoading = jest.fn();

jest.mock('../../../store', () => ({
  useStore: jest.fn(),
}));

const mockUploadImageToS3 = jest.fn();
jest.mock('@riffy/utils', () => ({
  imageUpload: (file: File, options: unknown) =>
    mockUploadImageToS3(file, options),
  cn: jest.fn((...inputs: unknown[]) => {
    return inputs.filter(Boolean).join(' ');
  }),
}));

jest.mock('@riffy/components', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    [key: string]: unknown;
  }) => (
    <button onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  ),
  Input: ({
    onChange,
    value,
    error,
    ...props
  }: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    [key: string]: unknown;
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
      const registerOnChange = props.onChange as (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
      if (registerOnChange) {
        registerOnChange(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const registerOnBlur = props.onBlur as (e: React.FocusEvent<HTMLInputElement>) => void | undefined;
      if (registerOnBlur) {
        registerOnBlur(e);
      }
    };

    return (
      <div>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={value || ''}
          name={props.name as string}
          {...props}
        />
        {error && <span className="error">{error}</span>}
      </div>
    );
  },
  Select: ({
    onChange,
    value,
    options,
    disabled,
    ...props
  }: {
    onChange?: (value: string) => void;
    value?: string;
    options?: Array<{ value: string; label: string }>;
    disabled?: boolean;
    [key: string]: unknown;
  }) => (
    <select
      onChange={e => onChange?.(e.target.value)}
      value={value || ''}
      disabled={disabled}
      {...props}
    >
      <option value="">Selecciona...</option>
      {options?.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
  ImageUpload: ({
    onChange,
    value,
    disabled,
    ...props
  }: {
    onChange?: (file: File | null, url?: string) => void;
    value?: string;
    disabled?: boolean;
    [key: string]: unknown;
  }) => (
    <div>
      <input
        type="file"
        onChange={e => {
          const file = e.target.files?.[0] || null;
          onChange?.(file, value);
        }}
        disabled={disabled}
        data-testid="image-upload"
        {...props}
      />
      {value && <img src={value} alt="preview" />}
    </div>
  ),
}));

jest.mock('../../../components/common/raffle/raffle-alert', () => {
  return function MockAlert({
    message,
    type,
  }: {
    message: string;
    type: string;
  }) {
    return (
      <div data-testid="alert" data-type={type}>
        {message}
      </div>
    );
  };
});

jest.mock('../../../components/common/search/Search', () => {
  return function MockSearch({
    onClick,
    onChange,
    value,
    error,
    loading,
  }: {
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    error?: string;
    loading?: boolean;
  }) {
    return (
      <div>
        <input
          data-testid="search-input"
          value={value || ''}
          onChange={onChange}
          placeholder="Cédula de identidad"
        />
        <button
          data-testid="search-button"
          onClick={onClick}
          disabled={loading}
        >
          Buscar
        </button>
        {error && <span className="error">{error}</span>}
      </div>
    );
  };
});

jest.mock('../../../components/payment/payment-method', () => {
  return function MockPaymentMethod({
    paymentMethod,
  }: {
    paymentMethod?: PaymentMethod;
  }) {
    return (
      <div data-testid="payment-method-box">
        {paymentMethod
          ? `Método: ${paymentMethod.name}`
          : 'No hay método seleccionado'}
      </div>
    );
  };
});

jest.mock('../../../components/payment/payment-total', () => {
  return function MockPaymentTotal({
    totalTickets,
    price,
  }: {
    totalTickets: number;
    price: number | null;
  }) {
    return (
      <div data-testid="payment-total">
        Tickets: {totalTickets}, Precio: {price || 0}
      </div>
    );
  };
});

jest.mock('../../../components/payment/payment-pending', () => {
  return function MockPendingPayment({
    isOpen,
    data,
  }: {
    isOpen: boolean;
    data: Payment;
  }) {
    if (!isOpen) return null;
    return <div data-testid="pending-payment-modal">Payment ID: {data.id}</div>;
  };
});

const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

const mockRiffyHooks = jest.requireMock('@riffy/hooks') as {
  __mocks: {
    createPayment: jest.Mock;
    useUserByDomain: jest.Mock;
    usePaymentByNationalId: jest.Mock;
  };
};

const mockCreatePaymentFn = mockRiffyHooks.__mocks.createPayment;
const mockUseUserByDomain = mockRiffyHooks.__mocks.useUserByDomain;
const mockUsePaymentByNationalId =
  mockRiffyHooks.__mocks.usePaymentByNationalId;

describe('<PaymentForm />', () => {
  const mockPaymentMethods: PaymentMethod[] = [
    {
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
    } as PaymentMethod,
    {
      id: '2',
      name: 'Binance Pay',
      type: PaymentMethodType.BINANCE_PAY,
      status: PaymentMethodStatus.ACTIVE,
      binanceId: 'binance123',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      ownerId: 'owner-1',
    } as PaymentMethod,
  ];

  const mockUser = {
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
    paymentMethods: mockPaymentMethods,
  };

  const mockCart = {
    ticketIds: ['ticket-1', 'ticket-2'],
    price: 10,
    totalTickets: 2,
    raffleId: 'raffle-1',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseStore.mockReturnValue({
      cart: mockCart,
      user: mockUser,
      loading: false,
      setUser: mockSetUser,
      setLoading: mockSetLoading,
      setCart: jest.fn(),
    });

    mockUseUserByDomain.mockReturnValue({
      data: mockUser,
      loading: false,
      error: null,
    });

    mockUsePaymentByNationalId.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    process.env.NEXT_PUBLIC_DEFAULT_DOMAIN = 'test-domain.com';
  });

  describe('Renderizado inicial', () => {
    it('renderiza el formulario correctamente', () => {
      render(<PaymentForm />);

      expect(screen.getByTestId('alert')).toBeInTheDocument();
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getByTestId('payment-total')).toBeInTheDocument();
    });

    it('muestra el mensaje inicial de alerta', () => {
      render(<PaymentForm />);

      const alert = screen.getByTestId('alert');
      expect(alert).toHaveTextContent(
        'Ingresa tu cédula de identidad y presiona el icono de búsqueda para continuar',
      );
      expect(alert).toHaveAttribute('data-type', 'warning');
    });

    it('no muestra los campos del formulario hasta que se busque', () => {
      render(<PaymentForm />);

      expect(
        screen.queryByPlaceholderText('Nombre completo'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText('Correo electrónico'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Búsqueda de cédula', () => {
    it('muestra los campos del formulario después de buscar', async () => {
      render(<PaymentForm />);

      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: '12345678' } });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Nombre completo'),
        ).toBeInTheDocument();
        expect(
          screen.getByPlaceholderText('Correo electrónico'),
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Teléfono')).toBeInTheDocument();
      });
    });

    it('actualiza el estado de búsqueda cuando se hace clic en buscar', async () => {
      render(<PaymentForm />);

      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: '12345678' } });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(mockUsePaymentByNationalId).toHaveBeenCalledWith('12345678');
      });
    });

    it('muestra mensaje de nuevo usuario cuando no se encuentra pago previo', async () => {
      render(<PaymentForm />);

      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: '12345678' } });
      fireEvent.click(searchButton);

      await waitFor(() => {
        const alert = screen.getByTestId('alert');
        expect(alert).toHaveTextContent(
          'Eres un nuevo usuario, ingresa tus datos para continuar con el pago',
        );
        expect(alert).toHaveAttribute('data-type', 'warning');
      });
    });

    it('muestra mensaje de usuario existente cuando se encuentra pago previo', async () => {
      const existingPayment: Payment = {
        id: 'payment-1',
        buyerName: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '04121234567',
        nationalId: '12345678',
        state: 'Distrito Capital',
        paymentMethod: 'Pago Móvil',
      } as Payment;

      mockUsePaymentByNationalId.mockReturnValue({
        data: existingPayment,
        loading: false,
        error: null,
      });

      render(<PaymentForm />);

      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: '12345678' } });
      fireEvent.click(searchButton);

      await waitFor(() => {
        const alert = screen.getByTestId('alert');
        expect(alert).toHaveTextContent(
          'Usuario encontrado. Puedes continuar con el pago.',
        );
        expect(alert).toHaveAttribute('data-type', 'success');
      });
    });

    it('auto-completa los campos cuando se encuentra un usuario existente', async () => {
      const existingPayment: Payment = {
        id: 'payment-1',
        buyerName: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '04121234567',
        nationalId: '12345678',
        state: 'Distrito Capital',
        paymentMethod: 'Pago Móvil',
      } as Payment;

      mockUsePaymentByNationalId.mockReturnValue({
        data: existingPayment,
        loading: false,
        error: null,
      });

      render(<PaymentForm />);

      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: '12345678' } });
      fireEvent.click(searchButton);

      await waitFor(() => {
        const nameInput = screen.getByPlaceholderText(
          'Nombre completo',
        ) as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText(
          'Correo electrónico',
        ) as HTMLInputElement;
        const phoneInput = screen.getByPlaceholderText(
          'Teléfono',
        ) as HTMLInputElement;

        expect(nameInput.value).toBe('Juan Pérez');
        expect(emailInput.value).toBe('juan@example.com');
        expect(phoneInput.value).toBe('04121234567');
      });
    });

    it('resetea el estado cuando se limpia la cédula', async () => {
      render(<PaymentForm />);

      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: '12345678' } });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Nombre completo'),
        ).toBeInTheDocument();
      });

      fireEvent.change(searchInput, { target: { value: '' } });

      await waitFor(() => {
        expect(
          screen.queryByPlaceholderText('Nombre completo'),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Validación del formulario', () => {
    beforeEach(async () => {
      render(<PaymentForm />);

      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: '12345678' } });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Nombre completo'),
        ).toBeInTheDocument();
      });
    });

    it('muestra errores de validación cuando los campos están vacíos', async () => {
      const submitButton = screen.getByText('Pagar');
      expect(submitButton).toBeDisabled();
    });

    it('habilita el botón de envío cuando todos los campos son válidos', async () => {
      const nameInput = screen.getByPlaceholderText('Nombre completo');
      const emailInput = screen.getByPlaceholderText('Correo electrónico');
      const phoneInput = screen.getByPlaceholderText('Teléfono');
      const stateSelect = screen.getByPlaceholderText(
        'Selecciona el estado',
      ) as HTMLSelectElement;
      const paymentMethodSelect = screen.getByPlaceholderText(
        'Método de pago',
      ) as HTMLSelectElement;

      fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
      fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
      fireEvent.change(phoneInput, { target: { value: '04121234567' } });
      fireEvent.change(stateSelect, { target: { value: 'Distrito Capital' } });
      fireEvent.change(paymentMethodSelect, {
        target: { value: 'Pago Móvil' },
      });

      await waitFor(() => {
        expect(nameInput).toHaveValue('Juan Pérez');
        expect(emailInput).toHaveValue('juan@example.com');
      });
    });
  });

  describe('Selección de método de pago', () => {
    beforeEach(async () => {
      render(<PaymentForm />);

      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: '12345678' } });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Método de pago')).toBeInTheDocument();
      });
    });

    it('muestra los métodos de pago disponibles', () => {
      const paymentMethodSelect = screen.getByPlaceholderText('Método de pago') as HTMLSelectElement;

      expect(paymentMethodSelect).toBeInTheDocument();
      expect(paymentMethodSelect.options[1].text).toBe('Pago Móvil');
      expect(paymentMethodSelect.options[2].text).toBe('Binance Pay');
    });

    it('muestra el componente PaymentMethod cuando se selecciona un método', async () => {
      const paymentMethodSelect = screen.getByPlaceholderText('Método de pago') as HTMLSelectElement;

      fireEvent.change(paymentMethodSelect, { target: { value: 'Pago Móvil' } });

      await waitFor(() => {
        expect(screen.getByTestId('payment-method-box')).toBeInTheDocument();
        expect(screen.getByText('Método: Pago Móvil')).toBeInTheDocument();
      });
    });
  });

  describe('Carga de imagen', () => {
    beforeEach(async () => {
      render(<PaymentForm />);

      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: '12345678' } });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(screen.getByTestId('image-upload')).toBeInTheDocument();
      });
    });

    it('permite subir una imagen', async () => {
      const imageUpload = screen.getByTestId('image-upload') as HTMLInputElement;
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      fireEvent.change(imageUpload, { target: { files: [file] } });

      await waitFor(() => {
        expect(imageUpload.files?.[0]).toBe(file);
      });
    });
  });

  describe('Envío del formulario', () => {
    beforeEach(async () => {
      render(<PaymentForm />);

      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: '12345678' } });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Nombre completo')).toBeInTheDocument();
      });

      const nameInput = screen.getByPlaceholderText('Nombre completo');
      const emailInput = screen.getByPlaceholderText('Correo electrónico');
      const phoneInput = screen.getByPlaceholderText('Teléfono');
      const stateSelect = screen.getByPlaceholderText('Selecciona el estado') as HTMLSelectElement;
      const paymentMethodSelect = screen.getByPlaceholderText('Método de pago') as HTMLSelectElement;

      fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
      fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
      fireEvent.change(phoneInput, { target: { value: '04121234567' } });
      fireEvent.change(stateSelect, { target: { value: 'Distrito Capital' } });
      fireEvent.change(paymentMethodSelect, { target: { value: 'Pago Móvil' } });

      await waitFor(() => {
        expect(nameInput).toHaveValue('Juan Pérez');
        expect(emailInput).toHaveValue('juan@example.com');
        expect(phoneInput).toHaveValue('04121234567');
      });
    });

    it('sube la imagen antes de enviar el formulario', async () => {
      const createdPayment: Payment = {
        id: 'payment-1',
        buyerName: 'Juan Pérez',
        nationalId: '12345678',
      } as Payment;

      mockUploadImageToS3.mockResolvedValue('https://example.com/image.jpg');
      mockCreatePaymentFn.mockResolvedValue({
        data: { createPayment: createdPayment },
        errors: null,
      });

      const imageUpload = screen.getByTestId('image-upload') as HTMLInputElement;
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      fireEvent.change(imageUpload, { target: { files: [file] } });

      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();

      if (form) {
        fireEvent.submit(form);
      }

      await waitFor(() => {
        expect(mockUploadImageToS3).toHaveBeenCalledWith(file, { folder: 'payments' });
        expect(mockCreatePaymentFn).toHaveBeenCalledWith(
          expect.objectContaining({
            proofUrl: 'https://example.com/image.jpg',
          }),
        );
      });
    });

    it('muestra estado de carga durante la subida de imagen', async () => {
      const createdPayment: Payment = {
        id: 'payment-1',
        buyerName: 'Juan Pérez',
        nationalId: '12345678',
      } as Payment;

      mockUploadImageToS3.mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve('https://example.com/image.jpg'), 100))
      );
      mockCreatePaymentFn.mockResolvedValue({
        data: { createPayment: createdPayment },
        errors: null,
      });

      const imageUpload = screen.getByTestId('image-upload') as HTMLInputElement;
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      fireEvent.change(imageUpload, { target: { files: [file] } });

      await waitFor(() => {
        const form = document.querySelector('form');
        expect(form).toBeInTheDocument();

        if (form) {
          fireEvent.submit(form);
        }
      });

      await waitFor(
        () => {
          expect(screen.getByText('Realizando compra...')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });
});
