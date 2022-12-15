
import createConnection from "../index";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

//Este usuario deve ser criado quando inicia a aplicação pela primeira vez, 
//Comando: yarn seed:admin
//Apos a criação deve logar com: email: rentx@gmail.com, password: admin
async function create() {
    const connection = await createConnection("localhost");

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(`
     INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at) 
               values ('${id}', 'admin', 'rentx@gmail.com', '${password}', true, 'XXX', 'now()' )
  `);
    await connection.close();

}

create().then(() => console.log("Admin user created."));