'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormIncluirRoupa() {
  const [cod_barras, setCodBarras] = useState('');
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [preco, setPreco] = useState('');
  const [genero, setGenero] = useState('');
  const [tecido, setTecido] = useState('');
  const [estampa, setEstampa] = useState(false);
  const [marca, setMarca] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const savedToken = localStorage.getItem('token');

    if (!savedToken) {
      router.replace('/form_login');
      return;
    }

    setToken(savedToken);
  }, [router]);

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage('');
    setError('');
    setLoading(true);

    try {
      const resposta = await fetch(`${apiUrl}/roupa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cod_barras,
          nome,
          tamanho,
          preco: Number(preco),
          genero,
          tecido,
          estampa,
          marca,
        }),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        setMessage('Roupa cadastrada com sucesso!');

        setCodBarras('');
        setNome('');
        setTamanho('');
        setPreco('');
        setGenero('');
        setTecido('');
        setEstampa(false);
        setMarca('');
      } else if (resposta.status === 401) {
        setError('Sessão expirada. Faça login novamente.');
        localStorage.removeItem('token');
        router.replace('/form_login');
      } else if (resposta.status === 403) {
        setError('Você não tem permissão para cadastrar roupas.');
      } else {
        setError(
          resultado.detalhes || 'Erro ao cadastrar a roupa.'
        );
      }
    } catch (erro) {
      console.error(erro);
      setError('Não foi possível conectar ao backend.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-12 px-6 sm:px-16 bg-white">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Cadastrar Roupa
        </h1>

        {message && (
          <p className="text-green-600 font-medium mb-4">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 font-medium mb-4">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4 w-full" onSubmit={enviar}>
          <input
            type="text"
            placeholder="Código de barras"
            value={cod_barras}
            onChange={(e) => setCodBarras(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <input
            type="text"
            placeholder="Nome da roupa"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <input
            type="text"
            placeholder="Tamanho (PP, P, M, G...)"
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <input
            type="number"
            placeholder="Preço"
            min="0"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <input
            type="text"
            placeholder="Gênero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <input
            type="text"
            placeholder="Tecido"
            value={tecido}
            onChange={(e) => setTecido(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <label className="flex items-center gap-3 text-gray-700">
            <input
              type="checkbox"
              checked={estampa}
              onChange={(e) => setEstampa(e.target.checked)}
            />
            Possui estampa?
          </label>

          <input
            type="text"
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer bg-blue-600 text-white px-4 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar roupa'}
          </button>
        </form>
      </main>
    </div>
  );
}