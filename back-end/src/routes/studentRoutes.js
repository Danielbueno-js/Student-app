// Rotas da API
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Models
const Student = require("../models/Student");
const User = require("../models/User");

// validação token

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "acesso negado" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);

    next();
  } catch (error) {
    return res.status(422).json({ msg: "Token Invalido" });
  }
}

// Resgistrar usuario
router.post("/auth/register", async (req, res) => {
  const { name, password, confirmPassword } = req.body;

  //validações
  if (!name) {
    return res.status(422).json({ msg: "Nome do usuario obrigatório" });
  }
  if (!password) {
    return res.status(422).json({ msg: "Senha do usuario obrigatório" });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ msg: "Senhas não conferem" });
  }

  //validação se usuario já existe
  const nameExist = await User.findOne({ name: name });

  if (nameExist) {
    return res
      .status(422)
      .json({ msg: "Por favor, utilize outro nome de usuario!" });
  }

  //Criação da senha
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  //Criação do Usuario
  const user = new User({
    name,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "Usuario cadastrado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "erro ao cadastrar usuario!" });
  }
});

// Rota publica / Login
router.post("/auth/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name) {
    return res.status(422).json({ msg: "Nome do usuario obrigatório" });
  }
  if (!password) {
    return res.status(422).json({ msg: "Senha do usuario obrigatório" });
  }

  //validação se usuario já existe
  const user = await User.findOne({ name: name });

  if (!user) {
    return res.status(422).json({ msg: "Usuario não encontrado" });
  }

  //validação senha correta
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(404).json({ msg: "Senha invalida!" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(201).json({ msg: "Autenticado com sucesso", token });
  } catch (error) {
    console.log(error);
    res.status(422).json({ msg: "Ocorreu um erro na validação do Token" });
  }
});

// Criação dos Estudantes
router.post("/", checkToken, async (req, res) => {
  // {name: 'Daniel', age: 22, course: 'A1', school: 'School 1'}
  const { name, age, course, school } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome não foi inserido" });
    return;
  }
  if (!age) {
    res.status(422).json({ error: "A idade não foi inserido" });
    return;
  }
  if (!course) {
    res.status(422).json({ error: "O curso não foi inserido" });
    return;
  }
  if (!school) {
    res.status(422).json({ error: "A escola não foi inserido" });
    return;
  }

  const student = {
    name,
    age,
    course,
    school,
  };
  //criando dados

  try {
    await Student.create(student);
    res.status(201).json({ massage: "Estudante cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao tentar cadastrar dados" });
  }
});

//Read - Leitura dos dados
router.get("/", checkToken, async (req, res) => {
  const id = req.params.id;

  try {
    const students = await Student.find();
    res.status(201).json(students);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

//search - Busca por ID
router.get("/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Student.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ massage: "Usuario não encontrado" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao procurar Estudante" });
  }
});

// search - Busca por nome
router.get("/search/:name", checkToken, async (req, res) => {
  const name = req.params.name;

  try {
    const person = await Student.findOne({ name: name });
    console.log(person);

    if (!person) {
      res.status(422).json({ massage: "Usuario não encontrado" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao procurar Estudante" });
  }
});

//update - atualização de Cadastro (put, patch)
router.patch("/:id", checkToken, async (req, res) => {
  const id = req.params.id;
  const { name, age, course, school } = req.body;
  const student = {
    name,
    age,
    course,
    school,
  };

  try {
    const updateStudent = await Student.updateOne({ _id: id }, student);

    //Validação se o usuario existe, para impedir de imputar dados em usuarios inexistentes
    if (!updateStudent.matchedCount === 0) {
      return res.status(422).json({ massage: "Usuario não encontrado" });
    }

    return res.status(200).json({ massage: "Estudante atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Delete - Deletar Cadastro
router.delete("/:id", checkToken, async (req, res) => {
  const id = req.params.id;
  const student = await Student.findOne({ _id: id });

  if (!student) {
    res.status(422).json({ massage: "Usuario não encontrado" });
    return;
  }

  try {
    await Student.deleteOne({ _id: id });

    res.status(200).json({ message: "Cadastro removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
