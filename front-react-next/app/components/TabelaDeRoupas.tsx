'use client';

import { useEffect, useState } from 'react';

interface Roupa {
  cod_barras: string;
  nome: string;
  tamanho: string;
  preco: number;
  genero: string;
  tecido: string;
  estampa: boolean;
  marca: string;
}

export default function TabelaDeRoupas() {
  const [roupas, setRoupas] = useState<Roupa[]>([]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function buscarRoupas() {
      try {
        const resposta = await fetch(`${apiUrl}/roupas`);
        const resultado = await resposta.json();

        if (!resposta.ok) {
          throw new Error(
            resultado.detalhes || 'Erro ao buscar roupas.'
          );
        }

        setRoupas(resultado.detalhes);
      } catch (erro) {
        console.error(erro);
        setErro('Não foi possível carregar as roupas.');
      } finally {
        setCarregando(false);
      }
    }

    buscarRoupas();
  }, [apiUrl]);

  if (carregando) {
    return <p className="p-4">Carregando roupas...</p>;
  }

  if (erro) {
    return <p className="p-4 text-red-600">{erro}</p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">
        Roupas cadastradas
      </h2>

      {roupas.length === 0 ? (
        <p>Nenhuma roupa cadastrada.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Código</th>
              <th className="border p-2">Nome</th>
              <th className="border p-2">Tamanho</th>
              <th className="border p-2">Preço</th>
              <th className="border p-2">Gênero</th>
              <th className="border p-2">Tecido</th>
              <th className="border p-2">Estampa</th>
              <th className="border p-2">Marca</th>
            </tr>
          </thead>

          <tbody>
            {roupas.map((roupa) => (
              <tr key={roupa.cod_barras}>
                <td className="border p-2">{roupa.cod_barras}</td>
                <td className="border p-2">{roupa.nome}</td>
                <td className="border p-2">{roupa.tamanho}</td>
                <td className="border p-2">
                  {Number(roupa.preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
                <td className="border p-2">{roupa.genero}</td>
                <td className="border p-2">{roupa.tecido}</td>
                <td className="border p-2">
                  {roupa.estampa ? 'Sim' : 'Não'}
                </td>
                <td className="border p-2">{roupa.marca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}