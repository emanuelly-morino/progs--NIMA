from config import *

class Roupa(db.Model):
    cod_barras = db.Column(db.String(50), primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    tamanho = db.Column(db.String(10), nullable=False)
    preco = db.Column(db.Float, nullable=False)
    genero = db.Column(db.String(50), nullable=False)
    tecido = db.Column(db.String(100), nullable=False)
    estampa = db.Column(db.Boolean, default=False, nullable=False)
    marca = db.Column(db.String(100), nullable=False)

    def json(self):
        return {
            "cod_barras": self.cod_barras,
            "nome": self.nome,
            "tamanho": self.tamanho,
            "preco": self.preco,
            "genero": self.genero,
            "tecido": self.tecido,
            "estampa": self.estampa,
            "marca": self.marca
        }