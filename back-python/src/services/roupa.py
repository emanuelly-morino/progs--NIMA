from config import *
from models.roupa import Roupa


def criar_roupa(data):
    password_bytes = data['senha'].encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    senha_para_salvar = hashed_password.decode('utf-8')

    roupa = Roupa(
        cod_barras=data['cod_barras'],
        nome=data['nome'],
        tamanho=data['tamanho'],
        preco=data['preco'],
        genero=data['genero'],
        tecido=data['tecido'],
        estampa=data.get('estampa', False),
        marca=data['marca']
    )

    db.session.add(roupa)
    db.session.commit()

    return roupa


def retornar_roupas():
    roupas = Roupa.query.all()

    return roupas