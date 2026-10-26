import TabelaDeRoupas from '../components/TabelaDeRoupas';

export default function Listar_Roupas() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center py-12 px-6 bg-white sm:items-start">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
          Roupas
        </h1>

        <TabelaDeRoupas />
      </main>
    </div>
  );
}