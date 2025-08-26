import { Button } from '@/components/ui/button';
import { IconArrowBack } from '@/icons';

export default function PayPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-[400px] mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <button className="text-white">
            <IconArrowBack size={22} />
          </button>
          <span className="text-white font-semibold text-lg">Atras</span>
        </div>
        <div className="text-white font-bold text-2xl mb-6">Datos del pago</div>
        <form className="flex flex-col gap-3">
          <input
            className="bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none"
            placeholder="Nombre y apellido*"
          />
          <input
            className="bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none"
            placeholder="Correo electronico"
          />
          <input
            className="bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none"
            placeholder="Cedula"
          />
          <input
            className="bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none"
            placeholder="Telefono"
          />
          <select className="bg-gray-800 rounded-lg px-4 py-3 text-white outline-none appearance-none">
            <option>Estado</option>
          </select>
          <select className="bg-gray-800 rounded-lg px-4 py-3 text-white outline-none appearance-none">
            <option>Pago movil</option>
          </select>
          <div className="bg-gradient-to-r from-primary-1/10 to-primary-2/10 rounded-lg px-4 py-3 text-white flex flex-col gap-1">
            <span className="font-semibold">Banco de Venezuela</span>
            <span className="text-sm text-gray-300">
              C.I 222.222.222{' '}
              <span className="inline-block ml-1 cursor-pointer">📋</span>
            </span>
            <span className="text-sm text-gray-300">
              Tlf: 04240000000{' '}
              <span className="inline-block ml-1 cursor-pointer">📋</span>
            </span>
          </div>
          <button
            type="button"
            className="bg-gray-800 rounded-lg px-4 py-3 text-gray-400 flex items-center gap-2"
          >
            <span className="inline-block">⬆️</span> Subir comprobante
          </button>
        </form>
        <div className="border-t border-tertiary-1 mt-6 pt-4 flex flex-col gap-2 text-white">
          <div className="flex justify-between text-sm">
            <span>Tickets seleccionados</span>
            <span>2</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Precio por ticket</span>
            <span>Bs 100,00</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Total a pagar</span>
            <span className="text-primary-1">Bs 200,00</span>
          </div>
        </div>
        <Button
          variant="filled"
          size="md"
          className="w-full mt-6"
          label="COMPRAR"
        />
      </div>
    </div>
  );
}
