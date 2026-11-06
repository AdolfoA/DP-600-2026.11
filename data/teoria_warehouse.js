// Teoría DP-600 · Ruta oficial "Implement a data warehouse with Microsoft Fabric" (módulos propios; el módulo de introducción se comparte con la ruta Lakehouse).
window.TEORIA = window.TEORIA || [];
window.TEORIA.push(

{
  id: "m08", ruta: "Implement a data warehouse with Microsoft Fabric", titulo: "Get started with data warehouses in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/get-started-data-warehouse/",
  objetivos: ["Describir conceptos de data warehouse y fundamentos del modelado dimensional.", "Crear tablas, cargar datos y entender los métodos de ingesta en un warehouse de Fabric.", "Consultar y transformar datos con T-SQL y el visual query editor.", "Modelar los datos del warehouse para informes y consumo posterior.", "Proteger y monitorizar un warehouse."],
  habilidades: ["s4.4", "s6.2", "s6.3", "s11.2"],
  unidades: [
    { t: "Understand data warehouses", c: [
      "Un data warehouse es un almacén analítico con esquema relacional pensado para consultas SQL sobre grandes volúmenes. Se diferencia de una base transaccional (OLTP) en que está optimizado para lectura y agregación (OLAP).",
      { ul: [
        "Tabla de hechos: medidas numéricas de eventos (ventas, pedidos) con claves foráneas a las dimensiones.",
        "Tablas de dimensión: atributos descriptivos (cliente, producto, fecha) que se usan para filtrar y agrupar.",
        "Esquema en estrella: hechos en el centro y dimensiones desnormalizadas alrededor. Esquema copo de nieve: dimensiones normalizadas en varias tablas.",
        "Claves sustitutas (surrogate keys): identificadores propios del warehouse, independientes de las claves del origen.",
        "Dimensiones de cambio lento (SCD): tipo 1 sobrescribe, tipo 2 conserva el historial con filas nuevas y fechas de vigencia."
      ] },
      { tip: "El esquema en estrella es la base de casi todo en DP-600: warehouse, lakehouse gold y semantic model." }
    ] },
    { t: "Understand data warehouses in Fabric", c: [
      "El warehouse de Fabric es un almacén centrado en el lago: los datos se guardan en formato Delta/Parquet en OneLake, y el motor ofrece T-SQL completo con capacidades transaccionales.",
      { ul: [
        "Soporta DDL y DML completos (CREATE, INSERT, UPDATE, DELETE), vistas, funciones y procedimientos almacenados.",
        "Transacciones con garantías ACID que pueden abarcar varias tablas.",
        "Las claves primarias, foráneas y únicas se pueden declarar pero no se imponen (NOT ENFORCED): sirven como metadatos para el motor y para el modelado.",
        "Consultas entre bases de datos del mismo workspace (por ejemplo, un warehouse que lee de un lakehouse) con nombres de tres partes.",
        "No requiere configurar infraestructura ni índices manualmente."
      ] },
      { tabla: [
        ["", "Warehouse", "SQL analytics endpoint del lakehouse"],
        ["Escritura T-SQL (INSERT/UPDATE/DELETE)", "Sí", "No (solo lectura sobre tablas)"],
        ["Motor de escritura principal", "T-SQL", "Spark"],
        ["Vistas, funciones, procedimientos", "Sí", "Sí"],
        ["Datos no estructurados / archivos", "No", "Sí (en el lakehouse, con Spark)"]
      ] },
      { tip: "Pregunta clásica: ¿warehouse o lakehouse? Si el equipo vive en T-SQL y necesita DML transaccional, warehouse. Si trabaja con Spark o con datos semiestructurados, lakehouse." }
    ] },
    { t: "Query and transform data", c: [
      "Los datos del warehouse se consultan y transforman con T-SQL desde el editor SQL integrado o con el visual query editor, que permite construir consultas arrastrando y soltando.",
      { ul: [
        "CTAS (CREATE TABLE AS SELECT): crea una tabla a partir del resultado de una consulta; útil para materializar transformaciones.",
        "Vistas y funciones: encapsulan lógica reutilizable.",
        "Procedimientos almacenados: automatizan secuencias de transformación y se pueden invocar desde un pipeline."
      ] },
      { code: "CREATE VIEW dbo.vw_ventas_mes AS\nSELECT d.Year, d.Month, SUM(f.Amount) AS Total\nFROM dbo.FactSales f\nJOIN dbo.DimDate d ON d.DateKey = f.DateKey\nGROUP BY d.Year, d.Month;" }
    ] },
    { t: "Model data in a warehouse", c: [
      "Sobre las tablas del warehouse se define un modelo semántico: relaciones entre hechos y dimensiones, medidas, jerarquías y ocultación de columnas técnicas. Ese modelo es la base de los informes de Power BI.",
      { ul: [
        "Las relaciones se definen en la vista de modelo del warehouse.",
        "Un diseño en estrella evita relaciones ambiguas y mejora el rendimiento.",
        "El modelo puede consumirse en Direct Lake o en DirectQuery según el caso."
      ] }
    ] },
    { t: "Secure and monitor a warehouse", c: [
      "La seguridad se aplica por capas: roles de workspace, permisos a nivel de item y permisos SQL granulares. Para datos sensibles hay RLS, CLS y enmascaramiento dinámico. La monitorización combina la app Capacity Metrics, las DMV y las vistas de query insights. Los detalles están en los módulos específicos de seguridad y monitorización de esta ruta.",
      { ej: "Haz el ejercicio 'Create and query a warehouse': crea tablas, carga datos de ejemplo y define un modelo con relaciones." }
    ] }
  ]
},

{
  id: "m09", ruta: "Implement a data warehouse with Microsoft Fabric", titulo: "Load data into a Microsoft Fabric data warehouse",
  url: "https://learn.microsoft.com/en-us/training/modules/load-data-into-microsoft-fabric-data-warehouse/",
  objetivos: ["Identificar cuándo usar cargas completas frente a incrementales.", "Describir cómo los Copy jobs de los pipelines ingieren datos en un warehouse.", "Explicar cómo COPY, CTAS e INSERT...SELECT cargan datos con T-SQL.", "Describir cómo Dataflow Gen2 importa y transforma datos antes de cargarlos."],
  habilidades: ["s5.1", "s5.2", "s5.3", "s6.2", "s6.6", "s6.1"],
  unidades: [
    { t: "Explore data load strategies", c: [
      "Antes de elegir herramienta hay que decidir la estrategia de carga.",
      { ul: [
        "Carga completa: se borra y se recarga toda la tabla. Es simple, pero costosa con tablas grandes.",
        "Carga incremental: solo se cargan las filas nuevas o modificadas. Suele basarse en una columna marca (watermark) como una fecha de modificación o un identificador creciente.",
        "Tablas de staging: zona intermedia donde se aterrizan los datos antes de integrarlos en las tablas finales, lo que permite validar y transformar sin afectar al modelo.",
        "SCD tipo 1 (sobrescribir) y tipo 2 (nueva fila con fechas de vigencia o indicador de fila actual) se implementan con UPDATE e INSERT sobre la dimensión."
      ] },
      { tip: "Si hay que conservar el historial de cambios de una dimensión, la respuesta es SCD tipo 2 y la carga incremental sobre una tabla de staging." }
    ] },
    { t: "Use data pipelines to load a warehouse", c: [
      "En un pipeline, la actividad Copy data (o un Copy job) puede tener como destino un warehouse y se usa para mover grandes volúmenes desde orígenes muy variados.",
      { ul: [
        "El Copy job simplifica copias, incluidas las incrementales, con menos configuración.",
        "El pipeline puede encadenar después una actividad Stored procedure para transformar los datos ya cargados en staging.",
        "Se programa con un schedule para automatizar las cargas."
      ] }
    ] },
    { t: "Load data using T-SQL", c: [
      "Dentro del warehouse hay tres sentencias principales para cargar datos.",
      { code: "-- 1) COPY INTO: carga archivos (CSV, Parquet) desde almacenamiento externo\nCOPY INTO dbo.stg_ventas\nFROM 'https://<cuenta>.dfs.core.windows.net/datos/ventas/*.parquet'\nWITH (FILE_TYPE = 'PARQUET');\n\n-- 2) CTAS: crea una tabla nueva a partir de una consulta\nCREATE TABLE dbo.dim_cliente AS\nSELECT DISTINCT CustomerID, Name, City FROM dbo.stg_clientes;\n\n-- 3) INSERT...SELECT: añade filas a una tabla existente\nINSERT INTO dbo.FactSales (DateKey, CustomerKey, Amount)\nSELECT DateKey, CustomerKey, Amount FROM dbo.stg_ventas;" },
      { ul: [
        "También se puede leer de tablas de un lakehouse del mismo workspace con una consulta entre bases de datos y cargarlas con CTAS o INSERT...SELECT.",
        "COPY INTO es la opción de alto rendimiento para ingerir archivos externos."
      ] },
      { tip: "COPY INTO = archivos externos. CTAS = crear tabla desde consulta. INSERT...SELECT = añadir a una existente." }
    ] },
    { t: "Load and transform data with Dataflow Gen2", c: [
      "Dataflow Gen2 permite limpiar y transformar datos con Power Query antes de enviarlos al warehouse como destino. Es adecuado para equipos con perfil de analista y transformaciones moderadas.",
      { ul: [
        "El destino se configura por consulta, con modo reemplazar o anexar.",
        "Conviene mantener el query folding y mover los pasos pesados al motor del origen cuando sea posible."
      ] },
      { ej: "Haz el ejercicio 'Load data into a warehouse': carga con pipeline, con T-SQL y con Dataflow Gen2, y compara." }
    ] }
  ]
},

{
  id: "m10", ruta: "Implement a data warehouse with Microsoft Fabric", titulo: "Query a data warehouse in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/query-data-warehouse-microsoft-fabric/",
  objetivos: ["Usar el editor SQL para escribir y ejecutar consultas T-SQL.", "Construir consultas con el editor visual sin código.", "Conectar desde SQL Server Management Studio con autenticación de Microsoft Entra ID."],
  habilidades: ["s11.2", "s11.1", "s4.4"],
  unidades: [
    { t: "Query data", c: [
      "El warehouse expone un endpoint T-SQL (protocolo TDS) al que se puede conectar desde el portal de Fabric o desde herramientas cliente. Admite consultas analíticas con joins, agregaciones, funciones de ventana y expresiones de tabla comunes.",
      "También se pueden hacer consultas entre bases de datos (cross-database) del mismo workspace, por ejemplo leyendo un lakehouse desde el warehouse."
    ] },
    { t: "Use the SQL query editor", c: [
      "El editor SQL integrado permite escribir y ejecutar T-SQL, con IntelliSense, ejecución de la selección y guardado de consultas.",
      { ul: [
        "Se pueden guardar consultas como vistas.",
        "Los resultados se pueden exportar o visualizar y enviar a Power BI.",
        "Se pueden crear objetos programables como vistas, funciones y procedimientos almacenados."
      ] },
      { code: "CREATE PROCEDURE dbo.usp_resumen_mes @anio INT AS\nBEGIN\n  SELECT Month, SUM(Amount) AS Total\n  FROM dbo.FactSales f JOIN dbo.DimDate d ON d.DateKey = f.DateKey\n  WHERE d.Year = @anio GROUP BY Month;\nEND;" }
    ] },
    { t: "Explore the visual query editor", c: [
      "El visual query editor permite construir consultas sin escribir SQL, con una interfaz parecida a Power Query: se arrastran tablas al lienzo y se aplican operaciones como filtrar, agrupar, combinar (merge) y anexar (append).",
      "Está disponible tanto en el warehouse como en el SQL analytics endpoint del lakehouse. Es útil para analistas que no dominan T-SQL.",
      { tip: "Visual query editor = sin código. Editor SQL = T-SQL. Ambos funcionan sobre warehouse y lakehouse." }
    ] },
    { t: "Use client tools to query a warehouse", c: [
      "Se puede conectar a un warehouse desde SQL Server Management Studio (SSMS), Azure Data Studio u otras herramientas compatibles con TDS.",
      { ul: [
        "Se usa la cadena de conexión SQL del warehouse, que se copia desde su configuración en el portal.",
        "La autenticación es con Microsoft Entra ID (incluida la autenticación multifactor).",
        "Permite ejecutar scripts, administrar objetos y revisar planes de ejecución."
      ] },
      { ej: "Haz el ejercicio 'Query a data warehouse': usa el editor SQL, el editor visual y conéctate con SSMS." }
    ] }
  ]
},

{
  id: "m11", ruta: "Implement a data warehouse with Microsoft Fabric", titulo: "Get started with Copilot in Microsoft Fabric for Data Warehouse",
  url: "https://learn.microsoft.com/en-us/training/modules/get-started-copilot-fabric-data-warehouse/",
  objetivos: ["Usar el chat de IA, las sugerencias en línea y las acciones rápidas para generar, refinar, explicar y corregir T-SQL.", "Aplicar buenas prácticas al escribir prompts."],
  habilidades: ["s11.2"],
  unidades: [
    { t: "Copilot en el warehouse (resumen del módulo)", c: [
      "Copilot es un asistente de IA integrado en el editor SQL del warehouse. Ayuda a escribir y entender T-SQL más rápido.",
      { ul: [
        "Chat: se describe en lenguaje natural lo que se quiere y Copilot propone la consulta.",
        "Sugerencias en línea: autocompleta código mientras se escribe.",
        "Acciones rápidas: explicar una consulta o corregir errores de una ya escrita.",
        "Buenas prácticas de prompt: ser específico con tablas y columnas, indicar el resultado esperado y refinar iterando."
      ] },
      "Siempre hay que revisar el código generado antes de ejecutarlo. Este módulo tiene un peso menor en el examen que los de carga, consulta y seguridad."
    ] }
  ]
},

{
  id: "m12", ruta: "Implement a data warehouse with Microsoft Fabric", titulo: "Monitor a Microsoft Fabric data warehouse",
  url: "https://learn.microsoft.com/en-us/training/modules/monitor-fabric-data-warehouse/",
  objetivos: ["Monitorizar el uso de capacity units con la app Microsoft Fabric Capacity Metrics.", "Monitorizar la actividad actual con vistas de gestión dinámica (DMV).", "Monitorizar tendencias de consultas con las vistas de query insights."],
  habilidades: ["s7.1", "s2.5"],
  unidades: [
    { t: "Monitor capacity metrics", c: [
      "La Microsoft Fabric Capacity Metrics app muestra el consumo de capacity units (CU) de una capacidad: qué items y operaciones consumen más, picos de uso y señales de saturación.",
      { ul: [
        "Se instala desde AppSource y la usan los administradores de la capacidad.",
        "Ayuda a decidir si hay que optimizar cargas, escalar el SKU o repartir el trabajo en el tiempo.",
        "Fabric aplica 'smoothing': reparte el consumo de operaciones en ventanas de tiempo para suavizar picos."
      ] }
    ] },
    { t: "Monitor current activity", c: [
      "Las vistas de gestión dinámica (DMV) muestran lo que ocurre ahora mismo en el warehouse.",
      { ul: [
        "sys.dm_exec_connections: conexiones abiertas.",
        "sys.dm_exec_sessions: sesiones autenticadas.",
        "sys.dm_exec_requests: solicitudes en ejecución.",
        "KILL <session_id>: termina una sesión que bloquea o consume en exceso (requiere permisos de administración)."
      ] },
      { code: "SELECT s.session_id, s.login_name, r.status, r.command, r.total_elapsed_time\nFROM sys.dm_exec_sessions s\nJOIN sys.dm_exec_requests r ON r.session_id = s.session_id;" }
    ] },
    { t: "Monitor queries", c: [
      "Las vistas de query insights (esquema queryinsights) conservan el historial de consultas para analizar tendencias.",
      { ul: [
        "queryinsights.exec_requests_history: historial de solicitudes ejecutadas.",
        "queryinsights.long_running_queries: consultas con mayor duración.",
        "queryinsights.frequently_run_queries: consultas que más se repiten.",
        "queryinsights.exec_sessions_history: historial de sesiones."
      ] },
      { tip: "Actividad en curso → DMV (sys.dm_exec_*). Histórico y tendencias → query insights (esquema queryinsights)." },
      { ej: "Haz el ejercicio 'Monitor a data warehouse': consulta las DMV y las vistas de query insights." }
    ] }
  ]
},

{
  id: "m13", ruta: "Implement a data warehouse with Microsoft Fabric", titulo: "Secure a Microsoft Fabric data warehouse",
  url: "https://learn.microsoft.com/en-us/training/modules/secure-data-warehouse-in-microsoft-fabric/",
  objetivos: ["Identificar las capas de seguridad de un warehouse.", "Describir cómo el enmascaramiento dinámico oculta valores sensibles.", "Explicar cómo la seguridad a nivel de fila restringe filas por usuario.", "Describir cómo la seguridad a nivel de columna controla el acceso a columnas.", "Explicar cómo los permisos SQL granulares controlan el acceso a objetos."],
  habilidades: ["s2.1", "s2.2", "s8.9"],
  unidades: [
    { t: "Explore dynamic data masking", c: [
      "El enmascaramiento dinámico (DDM) oculta parcial o totalmente el valor de una columna a los usuarios sin permiso de ver el dato real. Los datos almacenados no cambian; solo se enmascara el resultado de la consulta.",
      { ul: [
        "default(): enmascara según el tipo de dato.",
        "email(): muestra la primera letra y un dominio genérico.",
        "partial(prefijo, relleno, sufijo): muestra los primeros y últimos caracteres elegidos.",
        "random(): sustituye valores numéricos por uno aleatorio dentro de un rango.",
        "Permiso UNMASK: permite ver el valor real."
      ] },
      { code: "ALTER TABLE dbo.DimCliente\nALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()');\n\nGRANT UNMASK TO [analista_sensible@contoso.com];" }
    ] },
    { t: "Implement row-level security", c: [
      "La seguridad a nivel de fila (RLS) limita qué filas ve cada usuario. Se implementa con una función con valores de tabla (predicado) y una política de seguridad que la aplica a una tabla.",
      { code: "CREATE FUNCTION Security.fn_region(@Region AS varchar(20))\nRETURNS TABLE WITH SCHEMABINDING AS\nRETURN SELECT 1 AS ok\n  WHERE @Region = USER_NAME() OR USER_NAME() = 'director@contoso.com';\n\nCREATE SECURITY POLICY Security.pol_region\nADD FILTER PREDICATE Security.fn_region(Region) ON dbo.FactSales\nWITH (STATE = ON);" },
      { tip: "RLS = predicado + política de seguridad. El filtro se aplica en el motor, de forma transparente para el usuario." }
    ] },
    { t: "Implement column-level security", c: [
      "La seguridad a nivel de columna (CLS) restringe el acceso a columnas concretas mediante permisos SQL: se concede SELECT solo sobre las columnas permitidas o se deniega sobre las sensibles.",
      { code: "GRANT SELECT ON dbo.DimCliente (CustomerID, Name, City) TO [analista@contoso.com];\nDENY  SELECT ON dbo.DimCliente (Salary)                TO [analista@contoso.com];" }
    ] },
    { t: "Configure SQL granular permissions using T-SQL", c: [
      "Además de los roles de workspace, los permisos SQL permiten controlar el acceso a nivel de esquema, tabla, vista, función o procedimiento con GRANT, DENY y REVOKE.",
      { ul: [
        "Los roles de workspace Admin, Member y Contributor dan acceso amplio al warehouse; el rol Viewer da lectura, que se puede restringir con T-SQL.",
        "Se puede compartir el warehouse con un usuario y asignarle solo los permisos necesarios.",
        "Principio de mínimo privilegio: conceder lo mínimo imprescindible."
      ] },
      { ej: "Haz el ejercicio 'Secure a warehouse': configura DDM, RLS y CLS y comprueba el resultado con distintos usuarios." }
    ] }
  ]
}

);
