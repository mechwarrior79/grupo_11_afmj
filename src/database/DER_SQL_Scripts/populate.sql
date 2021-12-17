/* BORRADO DE TODOS LAS TABLAS Y LOS DATOS EXISTENTES
SE ESTABLECE QUE LOS INCREMENTOS DE UNIDADES SON DE A 1 EN CADA TABLA */

-- TABLA products
DELETE FROM afmjdb.products;
ALTER TABLE afmjdb.products AUTO_INCREMENT = 1;

-- TABLA categories
DELETE FROM afmjdb.categories;
ALTER TABLE afmjdb.categories AUTO_INCREMENT = 1;

-- TABLA statuses
DELETE FROM afmjdb.statuses;
ALTER TABLE afmjdb.statuses AUTO_INCREMENT = 1;

-- TABLA users
DELETE FROM afmjdb.users;
ALTER TABLE afmjdb.users AUTO_INCREMENT = 1;

-- TABLA sexes
DELETE FROM afmjdb.sexes;
ALTER TABLE afmjdb.sexes AUTO_INCREMENT = 1;

-- TABLA roles
DELETE FROM afmjdb.roles;
ALTER TABLE afmjdb.roles AUTO_INCREMENT = 1; 

-- TABLA carts. Opcional no aplicable al proyecto

/* ==================================================================================================== */

/* CARGA DE DATOS EN LAS TABLAS */

-- TABLA statuses
INSERT INTO afmjdb.statuses (id, status) VALUES 
(1, 'In-sale'), (2, 'Last-visited');

-- TABLA sexes
INSERT INTO afmjdb.sexes (id, sex) VALUES 
(1, 'Female'), (2, 'Male'), (3, 'Non-binary');

-- TABLA categories
INSERT INTO afmjdb.categories (id, category) VALUES 
(1, 'Electric-car'), (2, 'Accessory');


-- TABLA roles
INSERT INTO afmjdb.roles (id, role) VALUES 
(1, 'Admin'), (2, 'User'),(3, 'Employee');



-- TABLA users
INSERT INTO afmjdb.users (id, name, surname, birthDate, email, password, image, roleId, sexId) VALUES
(1, "Martin", "Gallego", "1978-04-14", "mgallego@hotmail.com", "$2a$10$EvhKddKbL21uPR3q9wAWFOhc.41e961AgTeczPauLO5wGku0fjRdK",
"defaultUser.png", 1, 1),
(2, "Alan", "Bareiro", "1984-08-13", "abareiro@hotmail.com", "$2a$10$4zvfZTMjgI3b5yapgrdma.UEWu8YorcoSx.TSt8z6uRaEuL5OFQaK",
"defaultUser.png", 1, 1),
(3, "Jose", "Peter", "1985-02-27", "jpeter@hotmail.com", "$2a$10$I8U8IfSWHGpLySMguWC9TeW2k4tNpGCilAoXUXrHhpiXlh.9teKkW",
"defaultUser.png", 2, 1);


-- TABLA products
INSERT INTO afmjdb.products (id, name, mainDescription, secondaryDescription, image, price, discount, categoryId, statusId) VALUES
(1, "Solar Roof", "El Solar Roof es el �nico techo que puede ayudar a pagarse solo con la energ�a que produce. Alimente su hogar con
energ�a solar y tome el control de su recibo mensual de electricidad.", 
"Se paga solo con el tiempo, ademas de reducir el impacto negativo en nuestro plante. --Potencia de carga max 50A, 2200 w 220v--",
"solar01.jpg", 60000, 15, 2, 2),
(2, "Android Bot", "Android Bot tendr� una altura de 1,72 metros y un peso cercano a 57 kilos, y se espera que sea capaz de 
transportar cargas de hasta 20 kilos, e incluso levantar hasta 68 kilos en peso muerto. Su velocidad m�xima para andar ser� de 
8 km/h.", 
"Tesla Bot, que tendr� manos con cinco dedos y vendr� en blanco y negro ser� amistoso y construido de tal manera que en todo caso 
puedas huir de �l y apagarlo",
"robotics-1.jfif", 90000, 10, 2, 2),
(3, "Mini-Dron PG2021 HQ", "El peque�o dron integra una c�mara de un sensor de 1/2,3 pulgadas capaz de capturar v�deos 
a 2,7K a 30 frames por segundo y 1.080p a 60 fps y fotograf�as a 12 megap�xeles. El estabilizador de tres ejes busca que los v�deos 
sean fluidos y estables","Asciende en vertical mientras encuadra el objetivo con la c�mara apuntando hacia abajo. Puede 
fijar un limite de altura de 40 a 120 pies", 
"mini-dron-2.webp", 60000, 30, 2, 1),
(4, "Home Charger", "El Wall Connector es un accesorio de carga universal para autos Electricos, que se instala de forma permanente 
en una pared o un poste. Instale la unidad en un interruptor de 60 Amps.", 
"El mejor lugar para cargar tu Tesla es en casa, por la noche. Solo tiene que conectarlo cuando llegue a tu casa y despertar� con 
una carga completa cada ma�ana",
"wall-conector-3.jpg", 75000, 30, 2, 1),
(5, "Modelo S", "El Model S est� construido desde cero como un veh�culo el�ctrico, con una arquitectura de alta resistencia y un 
paquete de bater�as colocado en el piso para una incre�ble protecci�n de los ocupantes y un bajo riesgo de volcadura.",
"Las plataformas del Model S unen las tecnolog�as de sistema de propulsi�n y bater�a para un performance, autonom�a y eficiencia 
inigualables-Potencia maxima: 1,020 hp 0 a 100 km/h: 2.1s 250 km/h 1/4 milla-", 
"modelsplaid-1.jfif", 1400000, 15, 1, 2),
(6, "CyberTruck", "Cybertruck est� fabricado con un revestimiento exterior para m�xima durabilidad y protecci�n de los 
pasajeros.Cuenta con un exoesqueleto impenetrable ya que todos los componentes est�n dise�ados para proporcionar resistencia y
 firmeza superiores.",
"Velocidad y versatilidad, solo posible con un dise�o totalmente el�ctrico. --Potencia maxima: 1,020 hp 0 a 100 km/h: 2.1s 250 km/h 
1/4 milla-- lo que permite que la aceleraci�n vaya de 0 a 60 mph en tan solo 2.9 segundos y hasta 500 millas de autonom�a.",
"Cybertruck_01.jfif", 2100000, 25, 1, 1),
(7, "Modelo 3", "El Model 3 ofrece la opci�n de motor dual con tracci�n integral, ruedas �berturbine de 20, frenos de gran desempe�o
 y suspensi�n m�s baja para mayor control total en todas las condiciones clim�ticas.",
"La tracci�n en todas las ruedas del Motor dual controla instant�neamente la tracci�n y el torque en todas las condiciones clim�ticas.
Potencia maxima: 995 hp 0 a 100 km/h: 3.3s 261 km/h 1/4 milla--",
"Model3_26.jfif", 1600000, 10, 1, 2),
(8, "Roadster", "El Tesla Roadster es un deportivo con una relaci�n entre potencia y peso suficiente para ser el mas r�pido del mundo. 
Su transmisi�n de potencia entre bater�as y motores el�ctricos muy superior a la que nunca antes visto en un coche el�ctrico",
"Con capacidad de almacenamiento en bater�as de 200 kWh., el doble de la capacidad que puede acumular un Tesla Model S, 
o un Tesla Model X, cuenta con una autonom�a el�ctrica de 1000 kil�metros--",
 "Roadster_01.jfif", 1700000, 25, 1, 1); 


/*  TABLA carts. Opcional no aplicable al proyecto */ 



