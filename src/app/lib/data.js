"use server";
import { getCompleteDate } from "./date";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function registerGuides(formData) {
  try {

    const currentDay = formData.get("cuantosDias");
    const guide = {
      numbOfGuide: formData.get("numeroDeGuia"),
      forklift_driver: 1,
      dateGuide: currentDay ? formData.get('otherDay') : getCompleteDate(),
      enterprise: formData.get('empresa') || 'Particular',
      totalHoursWorked: Number(formData.get("totalHorasTrabajadas")),
      typePrice: 'Normal',
      startHours: formData.get("horaInicio"),
      endHours: formData.get("horaTermino"),
      arrivalHours: formData.get("horaLLegada"),
      numbMachine: formData.get("numeroMaquina"),
    };

      Number(guide.startHours.replace(":", ".")) > 8.5 && Number(guide.startHours.replace(":", ".")) < 18.5
      ? guide.typePrice = 'Nromal'
      : (Number(guide.arrivalHours.replace(":", ".")) > 18.5 && Number(guide.arrivalHours.replace(":", ".")) < 22.5) 
        ? guide.typePrice = 'Extra'
        :(Number(guide.startHours.replace(":", ".")) < 8.5 && Number(guide.arrivalHours.replace(":", ".") > 22.5)) 
          ? guide.typePrice = 'S.Extra': 'null'
    
    guide.startHours.toString()
    guide.arrivalHours.toString()

    await sql
      `INSERT INTO GUIDES (numb_of_guide, forklift_driver, date_guide, enterprise, total_hours_worked, type_price, start_hours, end_hours, arrival_hours, numbMachine) 
       VALUES (${guide.numbOfGuide}, ${guide.forklift_driver}, ${guide.dateGuide}, ${guide.enterprise}, ${guide.totalHoursWorked}, ${guide.typePrice}, ${guide.startHours}, ${guide.endHours}, ${guide.arrivalHours}, ${guide.numbMachine});`
    
    
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getGuides(numbOfGuide) {
  try {
    const data = await sql`SELECT * FROM GUIDES`;
    console.log(data);
    
    if (numbOfGuide) {
      return {
        success: true,
        guides: data.filter((guide) => guide.numbOfGuide === numbOfGuide),
      };
    }

    return {
      success: true,
      guides: data,
    };
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
}

export async function getUsersData() {
  return await sql.query("SELECT * FROM USERS");
}

export async function createDatabase() {
  try {
    await sql.query("DROP TABLE USERS");
    console.log("Drop table users");

    const res = await sql.query(`CREATE TABLE USERS (
      id SERIAL PRIMARY KEY,
      nombre_user VARCHAR(100),
      password_user VARCHAR(25) NOT NULL,
      email_user VARCHAR(255) NOT NULL UNIQUE
    )`);
    console.log("Create table USERS");

    await sql.query(`INSERT INTO USERS (nombre_user, password_user, email_user) VALUES 
      ('JuanAdmin', 'juanpassadmin123', 'juandev@gmail.com'),
      ('Francisco', 'juan1234', 'dev@gmail.com'),
      ('Exequiel', 'ex23334', 'exequiel@dev.cl')`);
    console.log("Add data for table USERS");

    const data = await sql.query("SELECT * FROM USERS");

    return data;
  } catch (error) {
    return {
      message: error,
      isOk: false,
    };
  }
}
