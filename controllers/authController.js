const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//rejestracja
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();
    res.status(201).json({ message: "Użytkownik utworzony" });
  } catch (err) {
    res.status(400).json({ message: "Błąd podczas rejestracji" });
  }
};

// logowanie
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Nie znaleziono użytkownika" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Nieprawidłowe hasło" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Błąd logowania" });
  }
};
