const Gerador = require('gerador-boletos');
const fs = require('fs');
var path = require('path')

const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
const Produtos = require('./produtos');
const Usuarios = require('./usuarios');
const Compra = require('./compras');
const bcrypt = require('bcryptjs');

const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://teste:teste@todo-s8ayf.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, autoIndex: false });
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '..', 'temp')))

router.post('/gerarBoleto', (req, res) => {
  const init = () => {
    const boleto = createBoleto();

    const dir = '../temp'
    const data = Date.now()

    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const writeStream = fs.createWriteStream(`../temp/${req.body.titulo}_${data}.pdf`);

    new Gerador.boleto.Gerador(boleto).gerarPDF({
      creditos: '',
      stream: writeStream
    }, (err, pdf) => {
      if (err) return console.error(err);

      writeStream.on('finish', () => {
        console.log('written on temp!');
        return res.json({ success: true, path: `${req.body.titulo}_${data}` });
      });
    });
  }

  const createBoleto = () => {
    const Datas = Gerador.boleto.Datas;
    const bancos = Gerador.boleto.bancos;
    const pagador = createPagador();
    const beneficiario = createBeneficiario();
    const instrucoes = createInstrucoes();

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth();
    let yyyy = today.getFullYear();

    return Gerador.boleto.Boleto.novoBoleto()
      .comDatas(Datas.novasDatas()
        .comVencimento(dd + 2, mm, yyyy)
        .comProcessamento(dd, mm, yyyy)
        .comDocumento(dd, mm, yyyy))
      .comBeneficiario(beneficiario)
      .comPagador(pagador)
      .comBanco(new bancos.Bradesco())
      .comValorBoleto(req.body.preco) //Apenas duas casas decimais
      .comNumeroDoDocumento(1001)
      .comEspecieDocumento('DM') //Duplicata de Venda Mercantil
      .comLocaisDePagamento(['Em qualquer banco até o vencimento'])
      .comInstrucoes(instrucoes);
  }

  const createPagador = () => {
    const enderecoPagador = Gerador.boleto.Endereco.novoEndereco()
      .comLogradouro('Rua Pedro Lessa, 15')
      .comBairro('Centro')
      .comCidade('Rio de Janeiro')
      .comUf('RJ')
      .comCep('20030-030')

    return Gerador.boleto.Pagador.novoPagador()
      .comNome(req.body.nome)
      .comRegistroNacional('72285732503')
      .comEndereco(enderecoPagador)
  }

  const createBeneficiario = () => {
    const enderecoBeneficiario = Gerador.boleto.Endereco.novoEndereco()
      .comLogradouro('Rua da Consolação, 1500')
      .comBairro('Consolação')
      .comCidade('São Paulo')
      .comUf('SP')
      .comCep('01301100')

    return Gerador.boleto.Beneficiario.novoBeneficiario()
      .comNome('Happy hardware LTDA')
      .comRegistroNacional('43576788000191')
      .comCarteira('09')
      .comAgencia('0101')
      .comDigitoAgencia('5')
      .comCodigoBeneficiario('0326446')
      .comDigitoCodigoBeneficiario('0')
      .comNossoNumero('00000000061') //11 -digitos // "00000005752"
      .comDigitoNossoNumero('8') // 1 digito // 8
      .comEndereco(enderecoBeneficiario);
  }

  const createInstrucoes = () => {
    const instrucoes = [];
    instrucoes.push(`Não aceitar documento após o vencimento`);
    return instrucoes;
  }

  init();
})

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Produtos.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getProdutos', (req, res) => {
  Produtos.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });

});

router.get('/pesquisar', (req, res) => {
  const regex = new RegExp(escapeRegex(req.query.nome), 'gi');

  Produtos.find({ titulo: regex }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    if (data.length === 0) {
      return res.json({ success: false });
      console.log(data)
    } else {
      return res.json({ success: true, data: data });
    }
  });
});

router.post('/getProdutoEsp', (req, res) => {
  Produtos.find({ tipo: req.body.pord }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/updatePerfil', (req, res) => {
  const { email, nome, cpf, emailAntigo } = req.body;
  Usuarios.findOneAndUpdate({ email: emailAntigo }, { $set: { nome: nome } }, { returnOriginal: false }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post('/putCard', (req, res) => {
  const { formData, email } = req.body;
  Usuarios.findOneAndUpdate({ email: email }, { $set: { cartao: { numero: formData.number, nome: formData.name, cvc: formData.cvc } } }, { returnOriginal: false }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/putProd', (req, res) => {
  let produtos = new Produtos();

  const { titulo, preco, tipo, url } = req.body;

  produtos.titulo = titulo;
  produtos.image = url;
  produtos.preco = preco;
  produtos.tipo = tipo;
  produtos.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// Adicionar Usuario
router.post('/putUser', (req, res) => {
  const { nome, email, senha, senha2 } = req.body;
  let erros = [];

  // Checar campos obrigagatorios
  if (!nome || !email || !senha || !senha2) {
    erros.push({ msg: 'Por favor preencha todos os campos' })
  } else if (senha.length < 6) {
    erros.push({ msg: 'Senha tem que ter no minimo 6 caracteres' })
  }

  // Checar se as duas senhas são iguais
  if (senha !== senha2) {
    erros.push({ msg: 'Senhas diferentes' })
  }

  if (erros.length > 0) {
    return res.json({
      success: false,
      error: erros
    });
  } else {
    // Valudação passou *dab

    Usuarios.findOne({ email: email })
      .then(user => {
        if (user) {  // Se já esse email ja existir no banco de dados
          erros.push({ msg: 'Email já registrado' })

          return res.json({
            success: false,
            error: erros
          });
        } else { // Se já não existir
          let NovoUsuario = new Usuarios({
            nome,
            email,
            senha
          });

          // Criptografar senha
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(NovoUsuario.senha, salt, (err, hash) => {
              if (err) throw err;

              // Mudar senha para criptografada
              NovoUsuario.senha = hash;

              //Salvar Usuario
              NovoUsuario.save((err) => {
                if (err) return res.json({ success: false, error: err });
                return (res.json({ success: true }));
              });
            }))
        }
      });

  }
});

// Login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return (res.json({ success: false, msg: 'Ambos os campos devem ser preenchidos' }));
  }

  Usuarios.findOne({
    email: email
  }).then(user => {
    if (!user) {
      return (res.json({ success: false, msg: 'Email não cadastrado' }));
    }

    // Checar senha
    bcrypt.compare(senha, user.senha, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return (res.json({ success: true, user: user }));
      } else {
        return (res.json({ success: false, msg: 'Senha errada' }));
      }
    });
  })
});

//Compra 

router.post('/putCompra', (req, res) => {
  const { itensCarrinho } = req.body;

  itensCarrinho.forEach(element => {
    // const item = element;
    const titulo = element.titulo
    const preco = element.preco
    const quantidade = element.quantidade

    let NovaCompra = new Compra({
      titulo,
      preco,
      quantidade
    });

    NovaCompra.save((err) => {
      if (err) return res.json({ success: false, error: err });
    });
  });

  return res.json({ success: true });
});

router.post('/updateEndereco', (req, res) => {
  console.log(req.body)
  const { nomeDestinatario, bairro, cep, cidade, endereco, estado, numero, email } = req.body;
  Usuarios.findOneAndUpdate({ email: email }, { $set: { endereco: { nomeDestinatario, bairro, cep, cidade, endereco, estado, numero } } }, { returnOriginal: false }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));