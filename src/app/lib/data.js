"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function registerGuides(formData) {
  try {
    console.log(formData);
    
    const {
      numbOfGuide,
      forklift_driver,
      dateGuide,
      enterprise,
      totalHoursWorked,
      normalHour,
      extraHour,
      superExtraHour,
      typePrice,
      startHours,
      endHours,
      arrivalHours,
      numbMachine,
    } = formData;

    const res =
      await sql`INSERT INTO GUIDES (num_of_guide, forklift_driver, date_guide, enterprise, total_hours_worked, normal_hour, extra_hour, super_extra_hour ,type_price, start_hours, end_hours, arrival_hours, num_machine) 
       VALUES (
        ${numbOfGuide}, ${forklift_driver}, ${dateGuide}, ${enterprise}, ${totalHoursWorked} ,${normalHour}, ${extraHour}, ${superExtraHour}, ${typePrice}, ${startHours}, ${endHours}, ${arrivalHours}, ${numbMachine}
       )`;

    return {
      code: 200,
      success: true,
      result: res,
      message: "create success",
    };
  } catch (error) {
    return {
      code: 505,
      result: [],
      success: false,
      message: "Server internal error" + error.message,
    };
  }
}

export async function getGuides(limit) {
  try {
    const data = await sql.query(`   
      SELECT * FROM GUIDES
      ORDER BY 	num_of_guide DESC
      ${limit ? `LIMIT ${limit}` : ""};
    `);

    return {
      success: true,
      guides: data,
    };
  } catch (error) {
    return {
      success: false,
      guides: [],
      errorMessage: error.message,
    };
  }
}

export async function getGuideForPeriod(initDate, endDate) {
  try {
    return sql`
      SELECT * FROM GUIDES
      WHERE date_guide BETWEEN ${initDate} AND ${endDate};`;
  } catch (error) {
    console.error(error);
    return []
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
