from config import *
import services.roupa as roupa_service

'''
--------------
LISTAR ROUPAS
--------------
'''

@app.route('/roupas', methods=['GET'])
def retornar_roupas():
    roupas = roupa_service.retornar_roupas()

    return jsonify({
        "resultado": "ok",
        "detalhes": [roupa.json() for roupa in roupas]
    })

'''
--------------
INCLUIR ROUPA
--------------
'''

@app.route('/roupa', methods=['POST'])
@jwt_required()
def criar_roupa():
    # ler os dados recebidos em JSON
    dados = request.get_json()

    if not dados:
        return jsonify({
            "resultado": "erro",
            "detalhes": "Envie os dados da roupa em formato JSON"
        }), 400

    campos_obrigatorios = [
        'cod_barras',
        'nome',
        'tamanho',
        'preco',
        'genero',
        'tecido',
        'marca'
    ]

    for campo in campos_obrigatorios:
        if campo not in dados or dados[campo] is None or dados[campo] == '':
            return jsonify({
                "resultado": "erro",
                "detalhes": f"O campo {campo} é obrigatório"
            }), 400

    roupa = roupa_service.criar_roupa(dados)

    return jsonify({
        "resultado": "ok",
        "detalhes": roupa.json()
    }), 201
