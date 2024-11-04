require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

dbConnection();

app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/accesos', require('./routes/acceso.routes'));
app.use('/api/horarios', require('./routes/horario.routes'));
app.use('/api/puertas', require('./routes/puerta.routes'));
app.use('/api/registros-puerta', require('./routes/registroPuerta.routes'));
app.use('/api/admin', require('./routes/auth.routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
