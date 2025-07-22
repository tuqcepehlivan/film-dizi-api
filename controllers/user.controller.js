
const {User} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {

    register: async (req, res) => {
        try {
            const { username, email, password, role }= req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                role:role || "user"

            });
            res.status(201).json({message: "kullanıcı oluşturuldu", user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.finOne({ where: { email } });
            if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı"});

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return res.status(401).json({ error: "Şifre hatalı"});

            const token = jwt.sign({ id: user.id, role: user.role}, JWT_SECRET, { 
                expiresIn: "1d"
            });

            res.json({ message: "Giriş başarılı", token });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    profile: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: ["id", "username", "email", "role"]
            });

            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};