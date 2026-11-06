// Teoría DP-600 · módulos del Course Syllabus oficial (curso DP-600T00-A) que no estaban en las rutas anteriores.
// Estructura (objetivos y unidades) tomada de Microsoft Learn; el texto de cada lección es un resumen propio en español.
window.TEORIA = window.TEORIA || [];
window.TEORIA.push(

// ======================= RUTA 1 · Explore analytics data stores =======================
{
  id: "m24", ruta: "", titulo: "Discover and connect to data in OneLake",
  url: "https://learn.microsoft.com/en-us/training/modules/discover-data-onelake/",
  objetivos: ["Describir la arquitectura y las capacidades de OneLake.", "Explorar y conectarse a datos con el OneLake catalog.", "Descubrir datos en streaming en el Real-Time hub."],
  habilidades: ["s4.2", "s1.1"],
  unidades: [
    { t: "Understand OneLake", c: [
      "OneLake es la capa de almacenamiento unificada de Fabric: un único lago lógico por tenant, disponible de forma automática, al que acceden todas las experiencias.",
      { ul: [
        "Organización jerárquica: tenant → workspace → item (lakehouse, warehouse…) → carpetas Files y Tables.",
        "Formato abierto: las tablas se guardan como Delta sobre Parquet, así que Spark, T-SQL, KQL y Power BI leen los mismos datos.",
        "Es compatible con las API de ADLS Gen2, por lo que muchas herramientas y SDK de almacenamiento funcionan con OneLake. La dirección usa el dominio onelake.dfs.fabric.microsoft.com.",
        "Shortcuts: referencias a datos de otra ubicación (otro item, ADLS Gen2, Amazon S3…) sin copiarlos.",
        "Gobernanza integrada: el acceso se controla con roles de workspace, permisos de item y seguridad de OneLake."
      ] },
      { tip: "OneLake = 'OneDrive para datos': una sola copia, formato Delta/Parquet abierto, accesible desde todos los motores." }
    ] },
    { t: "Browse and connect to data in OneLake", c: [
      "El OneLake catalog permite descubrir y conectarse a datos de todos los workspaces a los que tienes acceso.",
      { ul: [
        "Explorar: buscar y filtrar items por tipo, workspace, propietario o endorsement.",
        "Conectar: abrir el item, usarlo desde un notebook, consultarlo con el SQL analytics endpoint o crear un semantic model sobre él.",
        "Crear un shortcut en un lakehouse hacia datos que ya existen en OneLake evita duplicarlos y respeta los permisos del origen.",
        "También hay herramientas cliente, como el OneLake file explorer para ver OneLake como una carpeta en el equipo."
      ] },
      { ej: "Abre el OneLake catalog, localiza un lakehouse de otro workspace y crea un shortcut hacia una de sus tablas." }
    ] },
    { t: "Discover streaming data in Real-Time hub", c: [
      "El Real-Time hub es el punto central para descubrir y gestionar datos en movimiento en toda la organización.",
      { ul: [
        "Muestra flujos de datos (eventstreams) y tablas de bases KQL a las que tienes acceso.",
        "Permite conectar orígenes de streaming de Microsoft y de otras nubes.",
        "Publica eventos de Fabric (como eventos de trabajos o de OneLake) que se pueden usar para disparar acciones con Activator."
      ] }
    ] }
  ]
},

{
  id: "m25", ruta: "", titulo: "Get started with Real-Time Intelligence in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/get-started-kusto-fabric/",
  objetivos: ["Describir analítica en tiempo real, flujos (streams) y eventos.", "Entender los componentes de Real-Time Intelligence en Fabric.", "Ingerir y transformar datos en movimiento.", "Almacenar y consultar datos en bases de datos KQL.", "Visualizar datos en streaming con Real-Time Dashboards.", "Automatizar acciones con Activator."],
  habilidades: [],
  unidades: [
    { t: "What is real-time data analytics?", c: [
      "Los datos en tiempo real son eventos que se generan de forma continua (lecturas de sensores, clics, transacciones, registros). En lugar de procesarlos por lotes horas después, se procesan al llegar para detectar patrones y reaccionar de inmediato.",
      { ul: [
        "Evento: un hecho puntual con marca de tiempo.",
        "Flujo (stream): secuencia continua de eventos.",
        "Casos de uso: monitorización de dispositivos, detección de fraude, telemetría de aplicaciones, alertas operativas."
      ] },
      "Nota: este módulo forma parte del syllabus del curso, pero la guía de estudio del examen no lista habilidades específicas de Real-Time Intelligence; sirve sobre todo para elegir correctamente el almacén de datos (módulo siguiente de la ruta de diseño)."
    ] },
    { t: "Real-Time Intelligence in Microsoft Fabric", c: [
      "Real-Time Intelligence (RTI) agrupa en Fabric las capacidades para ingerir, procesar, almacenar, visualizar y actuar sobre datos en movimiento.",
      { tabla: [
        ["Componente", "Función"],
        ["Real-Time hub", "Descubrir y gestionar flujos y eventos."],
        ["Eventstream", "Capturar, transformar y enrutar eventos hacia destinos."],
        ["Eventhouse / KQL database", "Almacenar y consultar datos de series temporales y telemetría."],
        ["Real-Time Dashboard", "Visualizar datos en streaming con actualización automática."],
        ["Activator", "Definir reglas y lanzar acciones cuando se cumple una condición."]
      ] }
    ] },
    { t: "Ingest and transform real-time data", c: [
      "Un eventstream conecta orígenes de eventos y los lleva a uno o varios destinos. Antes de entregarlos se pueden aplicar transformaciones.",
      { ul: [
        "Orígenes: servicios de mensajería, bases de datos con captura de cambios, eventos de Fabric y otros.",
        "Transformaciones en el flujo: filtrar, agregar por ventanas de tiempo, agrupar, unir y gestionar campos.",
        "Destinos: eventhouse (base KQL), lakehouse, Activator u otros flujos derivados."
      ] }
    ] },
    { t: "Store and query real-time data", c: [
      "Un eventhouse contiene una o varias bases de datos KQL optimizadas para datos de series temporales y logs, con ingesta rápida y consultas muy veloces. Se consultan con Kusto Query Language (KQL).",
      { code: "Telemetria\n| where Timestamp > ago(1h)\n| summarize Eventos = count(), Promedio = avg(Valor) by bin(Timestamp, 5m), Sensor\n| order by Timestamp asc" },
      "KQL se escribe como una cadena de operadores unidos con |: where filtra, summarize agrega, project selecciona columnas, take limita filas."
    ] },
    { t: "Visualize real-time data", c: [
      "Los Real-Time Dashboards muestran datos de bases KQL en teselas (tiles) basadas en consultas, con actualización automática y parámetros que filtran todas las teselas a la vez. Son distintos de los informes de Power BI, pensados para datos que cambian de forma continua."
    ] },
    { t: "Automate actions", c: [
      "Activator vigila datos (flujos, tablas KQL, informes) y ejecuta acciones cuando se cumple una condición definida en una regla.",
      { ul: [
        "Acciones: enviar un correo o un mensaje de Teams, lanzar un flujo de Power Automate o ejecutar un item de Fabric.",
        "Se usa también para reaccionar a eventos de trabajos de Fabric, como el fallo de un pipeline."
      ] },
      { ej: "Haz el ejercicio 'Get started with Real-Time Intelligence in Microsoft Fabric'." }
    ] }
  ]
},

// ======================= RUTA 2 · Design and transform analytics data =======================
{
  id: "m26", ruta: "", titulo: "Choose data stores in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/choose-data-store-fabric/",
  objetivos: ["Describir las opciones de almacén de datos analítico en Fabric.", "Evaluar las capacidades de lakehouse, warehouse y eventhouse.", "Elegir el almacén adecuado para un escenario de negocio."],
  habilidades: ["s1.1", "s4.1"],
  unidades: [
    { t: "Describe analytical data store options", c: [
      "Fabric ofrece tres almacenes analíticos principales. Todos guardan sus datos en OneLake y pueden convivir en la misma solución. La elección depende de cuatro factores: el formato de los datos, el lenguaje de consulta, el patrón de escritura y las habilidades del equipo.",
      { tabla: [
        ["", "Lakehouse", "Warehouse", "Eventhouse"],
        ["Datos", "Estructurados, semiestructurados y no estructurados (archivos)", "Estructurados y relacionales", "Eventos, logs y series temporales"],
        ["Lenguaje principal", "Spark (PySpark, Spark SQL); T-SQL de solo lectura vía endpoint", "T-SQL completo", "KQL (también un subconjunto de T-SQL)"],
        ["Escritura", "Spark", "T-SQL (DML transaccional)", "Ingesta en streaming o por lotes, orientada a anexar"],
        ["Perfil típico", "Data engineers y data scientists", "Desarrolladores SQL y analistas", "Analistas de telemetría y tiempo real"]
      ] }
    ] },
    { t: "Evaluate lakehouse capabilities", c: [
      { ul: [
        "Fortalezas: flexibilidad de formatos, procesamiento a gran escala con Spark, machine learning, arquitectura medallion.",
        "Consulta en T-SQL a través del SQL analytics endpoint, de solo lectura.",
        "Ideal cuando hay datos sin esquema fijo o cuando el equipo trabaja con Python/Spark."
      ] }
    ] },
    { t: "Evaluate warehouse capabilities", c: [
      { ul: [
        "Fortalezas: T-SQL con DML completo, procedimientos, transacciones multi-tabla y modelo relacional clásico.",
        "Ideal para la capa gold con esquema en estrella cuando el equipo es de SQL y se necesitan cargas transaccionales.",
        "Menos adecuado para archivos sin estructura o para ML con Spark."
      ] }
    ] },
    { t: "Evaluate eventhouse capabilities", c: [
      { ul: [
        "Fortalezas: ingesta continua de alto volumen y consultas muy rápidas sobre series temporales y logs con KQL.",
        "Ideal para telemetría, IoT, monitorización y análisis casi en tiempo real.",
        "No sustituye al warehouse para modelado dimensional clásico."
      ] },
      { tip: "Regla práctica: archivos y Spark → lakehouse; SQL transaccional y esquema en estrella → warehouse; streaming y series temporales → eventhouse." }
    ] },
    { t: "Case study - Choose data stores for an integrated analytics solution", c: [
      "En un escenario real se combinan los tres. Por ejemplo, una empresa con sensores y ventas:",
      { ul: [
        "Eventhouse para la telemetría de los sensores que llega en continuo.",
        "Lakehouse para guardar los archivos en bruto y preparar datos con Spark (bronze y silver).",
        "Warehouse para la capa gold con el modelo dimensional que consume Power BI.",
        "Shortcuts y consultas entre bases de datos conectan los almacenes sin duplicar datos."
      ] }
    ] }
  ]
},

{
  id: "m27", ruta: "", titulo: "Design dimensional models for analytics in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/design-dimensional-models-fabric/",
  objetivos: ["Describir los tipos de esquema dimensional para analítica.", "Diseñar tablas de hechos para procesos de negocio.", "Diseñar tablas de dimensión para atributos descriptivos.", "Implementar patrones de dimensiones de cambio lento."],
  habilidades: ["s6.2", "s6.3", "s6.4", "s4.5"],
  unidades: [
    { t: "Describe dimensional schema types", c: [
      { ul: [
        "Esquema en estrella: una tabla de hechos central rodeada de dimensiones desnormalizadas. Es el más sencillo y el más eficiente para consultas y semantic models.",
        "Esquema copo de nieve: las dimensiones se normalizan en varias tablas relacionadas (por ejemplo, Producto → Subcategoría → Categoría). Ahorra espacio pero añade joins.",
        "Constelación de hechos: varias tablas de hechos que comparten dimensiones conformadas (como Fecha o Cliente)."
      ] },
      { tip: "Para Power BI y Direct Lake se prefiere la estrella: menos relaciones y mejor rendimiento." }
    ] },
    { t: "Design fact tables", c: [
      "Una tabla de hechos registra un proceso de negocio (ventas, pedidos, envíos). Lo primero que se decide es el grano: qué representa exactamente una fila (por ejemplo, una línea de pedido).",
      { ul: [
        "Contiene claves foráneas hacia las dimensiones y medidas numéricas.",
        "Medidas aditivas (importe, cantidad) se pueden sumar en cualquier dimensión; semiaditivas (saldos) no se suman en el tiempo; no aditivas (ratios) no se suman.",
        "Tipos: transaccional (una fila por evento), instantánea periódica (foto cada periodo) e instantánea acumulativa (una fila que se actualiza a medida que avanza el proceso).",
        "Dimensión degenerada: un identificador como el número de pedido que se guarda en el hecho sin tabla de dimensión propia."
      ] },
      { tip: "Declarar el grano primero evita mezclar niveles de detalle y resultados duplicados." }
    ] },
    { t: "Design dimension tables", c: [
      { ul: [
        "Cada dimensión tiene una clave sustituta (surrogate key), independiente de la clave del sistema origen (clave de negocio o natural).",
        "Contiene atributos descriptivos y jerarquías (País → Región → Ciudad) que se usan para filtrar y agrupar.",
        "La dimensión de fecha es casi obligatoria: año, trimestre, mes, día, semana, indicador de festivo, etc.",
        "Dimensiones conformadas: se comparten entre varias tablas de hechos con el mismo significado.",
        "Dimensiones con rol (role-playing): una misma dimensión (Fecha) usada con varios roles (fecha de pedido, de envío).",
        "Tabla puente (bridge): resuelve relaciones muchos-a-muchos entre un hecho y una dimensión (por ejemplo, un pedido con varios vendedores)."
      ] },
      "Desnormalizar significa traer a la dimensión los atributos de tablas relacionadas para evitar joins en consulta."
    ] },
    { t: "Implement slowly changing dimensions", c: [
      "Las dimensiones de cambio lento (SCD) gestionan los cambios en los atributos de una dimensión a lo largo del tiempo.",
      { tabla: [
        ["Tipo", "Comportamiento", "Historial"],
        ["Tipo 0", "El valor nunca cambia", "No aplica"],
        ["Tipo 1", "Se sobrescribe el valor", "No se conserva"],
        ["Tipo 2", "Se inserta una fila nueva con fechas de vigencia o indicador de fila actual", "Completo"],
        ["Tipo 3", "Se guarda el valor anterior en una columna adicional", "Solo el anterior"]
      ] },
      { code: "-- SCD tipo 2 (patrón en dos pasos)\n-- 1) Cerrar la versión vigente de los clientes que cambiaron de ciudad\nUPDATE d SET EndDate = SYSDATETIME(), IsCurrent = 0\nFROM dbo.DimCliente d\nJOIN stg.Cliente s ON s.CustomerID = d.CustomerID\nWHERE d.IsCurrent = 1 AND d.City <> s.City;\n\n-- 2) Insertar nueva versión para los cambiados y los clientes nuevos\nINSERT INTO dbo.DimCliente (CustomerID, Name, City, StartDate, EndDate, IsCurrent)\nSELECT s.CustomerID, s.Name, s.City, SYSDATETIME(), NULL, 1\nFROM stg.Cliente s\nLEFT JOIN dbo.DimCliente d ON d.CustomerID = s.CustomerID AND d.IsCurrent = 1\nWHERE d.CustomerID IS NULL;" },
      { tip: "Historial completo = tipo 2. Corrección sin historial = tipo 1. Los hechos referencian la clave sustituta de la versión vigente al momento del evento." },
      { ej: "Haz el ejercicio 'Design and implement a dimensional model': crea una dimensión con SCD tipo 2 y comprueba el historial tras un cambio." }
    ] }
  ]
},

{
  id: "m28", ruta: "", titulo: "Transform data using Dataflows Gen2 in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/fabric-transform-data-dataflows/",
  objetivos: ["Crear y configurar Dataflows Gen2 en Fabric.", "Aplicar transformaciones de Power Query para preparar datos.", "Optimizar el rendimiento del dataflow con query folding.", "Cargar los datos transformados en destinos lakehouse o warehouse."],
  habilidades: ["s6.1", "s6.6", "s6.7", "s6.8", "s6.9", "s7.1", "s7.2", "s4.1"],
  unidades: [
    { t: "Understand Dataflows Gen2", c: [
      "Dataflow Gen2 es la experiencia low-code de Power Query Online dentro de Data Factory en Fabric. Se crea desde un workspace, se conecta a un origen y se construye una o varias consultas con pasos de transformación.",
      { ul: [
        "Cada consulta puede tener su propio destino (lakehouse, warehouse, otros) con modo de actualización reemplazar o anexar.",
        "Se puede ejecutar por programación o como actividad de un pipeline.",
        "Guarda un registro de los pasos aplicados (lenguaje M) que se puede revisar y reutilizar."
      ] }
    ] },
    { t: "Transform data with Power Query", c: [
      "Las transformaciones más habituales y su equivalente en limpieza de datos:",
      { ul: [
        "Elegir y quitar columnas; filtrar filas; cambiar tipos de datos.",
        "Reemplazar valores, errores y nulos; rellenar hacia abajo (fill down); recortar espacios y cambiar mayúsculas.",
        "Quitar duplicados.",
        "Dividir columnas y agregar columnas personalizadas o condicionales.",
        "Agrupar por (group by) con agregaciones; pivotar y despivotar.",
        "Combinar consultas: merge (join con distintos tipos) y append (unión de filas)."
      ] },
      { tip: "Merge = unir columnas de dos consultas (join). Append = apilar filas de consultas con la misma estructura (union)." }
    ] },
    { t: "Optimize Dataflows Gen2 performance", c: [
      "El rendimiento depende sobre todo del query folding: Power Query traduce los pasos a una consulta que ejecuta el origen, en lugar de traer todos los datos y transformarlos localmente.",
      { ul: [
        "Se comprueba en un paso con 'View data source query': si está disponible, el paso se delega al origen.",
        "Colocar primero los pasos que se pueden delegar (filtrar filas, quitar columnas) y dejar los que rompen el folding para el final.",
        "Algunas transformaciones, como ciertas columnas personalizadas o fusiones entre orígenes distintos, rompen el folding.",
        "El staging permite que las transformaciones se ejecuten en un motor de cómputo más potente con datos intermedios.",
        "Filtrar y reducir columnas lo antes posible disminuye el volumen que se procesa."
      ] },
      { ej: "Haz el ejercicio 'Transform data with Dataflows Gen2': aplica transformaciones, revisa el folding y carga el resultado en un lakehouse." }
    ] }
  ]
},

{
  id: "m29", ruta: "", titulo: "Transform data using notebooks in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/fabric-transform-data-notebooks/",
  objetivos: ["Describir los notebooks en Microsoft Fabric.", "Dar forma y limpiar datos con Spark SQL y PySpark.", "Combinar y agregar datos con Spark SQL y PySpark.", "Escribir tablas Delta con un tamaño adecuado."],
  habilidades: ["s6.5", "s6.6", "s6.7", "s6.8", "s6.9", "s7.1", "s7.3", "s4.1"],
  unidades: [
    { t: "Describe notebooks in Fabric", c: [
      "Un notebook de Fabric es un entorno interactivo de código y texto sobre Spark. Se asocia a un lakehouse y puede leer de otros almacenes.",
      { ul: [
        "Lenguajes por celda: PySpark, Spark SQL, Scala y R.",
        "Lakehouse por defecto: las rutas Files/ y Tables/ se resuelven contra él.",
        "Se puede leer de un warehouse desde Spark con un conector específico de Fabric (por ejemplo, spark.read.synapsesql con el nombre de tres partes), según la versión del runtime.",
        "Se programan o se incluyen en un pipeline como actividad Notebook."
      ] }
    ] },
    { t: "Shape and clean data", c: [
      { code: "from pyspark.sql.functions import col, trim, lower, when, to_date, coalesce, lit\n\ndf = spark.read.table('bronze_ventas')\nclean = (df\n  .withColumn('Email', lower(trim(col('Email'))))\n  .withColumn('Fecha', to_date(col('Fecha'), 'yyyy-MM-dd'))\n  .withColumn('Importe', col('Importe').cast('decimal(18,2)'))\n  .withColumn('Canal', coalesce(col('Canal'), lit('Desconocido')))\n  .filter(col('Importe').isNotNull())\n  .dropDuplicates(['PedidoID']))" },
      { ul: [
        "Tipos: cast; fechas: to_date, to_timestamp.",
        "Texto: trim, lower, upper, regexp_replace.",
        "Nulos: fillna, dropna, coalesce.",
        "Condiciones: when(...).otherwise(...).",
        "Duplicados: dropDuplicates, o row_number() sobre una ventana para conservar la fila más reciente."
      ] }
    ] },
    { t: "Combine and aggregate data", c: [
      { code: "from pyspark.sql import functions as F, Window\n\n# Join y agregación\nres = (ventas.join(clientes, 'ClienteID', 'left')\n       .groupBy('Pais', F.year('Fecha').alias('Anio'))\n       .agg(F.sum('Importe').alias('Total'), F.countDistinct('PedidoID').alias('Pedidos')))\n\n# Última fila por cliente con una función de ventana\nw = Window.partitionBy('ClienteID').orderBy(F.col('Fecha').desc())\nultima = ventas.withColumn('rn', F.row_number().over(w)).filter('rn = 1')" },
      { ul: [
        "Tipos de join: inner, left, right, full, left_semi y left_anti.",
        "union exige el mismo número de columnas; unionByName alinea por nombre.",
        "El mismo resultado se puede escribir en Spark SQL (%%sql) con JOIN, GROUP BY y funciones de ventana."
      ] }
    ] },
    { t: "Write and size Delta tables", c: [
      "Al escribir en Delta hay que cuidar el modo de escritura y el tamaño de los archivos resultantes.",
      { code: "(clean.write.format('delta')\n   .mode('overwrite')                # o 'append'\n   .partitionBy('Anio')               # solo columnas de baja cardinalidad\n   .saveAsTable('silver_ventas'))" },
      { ul: [
        "mode('overwrite') reemplaza la tabla; 'append' añade filas; MERGE hace upsert.",
        "Muchos archivos pequeños degradan las lecturas: agrupar escrituras, usar optimize write y ejecutar OPTIMIZE periódicamente.",
        "Como orientación general, se buscan archivos de tamaño grande (del orden de cientos de MB) en lugar de miles de archivos diminutos.",
        "No sobre-particionar: demasiadas particiones generan archivos pequeños.",
        "Con V-Order activado, las lecturas posteriores en Spark, SQL y Power BI son más rápidas."
      ] },
      { ej: "Haz el ejercicio 'Transform data with notebooks': limpia, combina y escribe una tabla Delta, y revisa el número de archivos." }
    ] }
  ]
},

{
  id: "m30", ruta: "", titulo: "Transform data using T-SQL in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/fabric-transform-data-tsql/",
  objetivos: ["Transformar datos del warehouse con consultas T-SQL.", "Crear vistas con lógica de transformación reutilizable.", "Construir procedimientos almacenados para procesamiento repetible.", "Implementar tablas dimensionales en un warehouse."],
  habilidades: ["s4.4", "s6.2", "s6.5", "s6.6", "s6.8", "s6.9", "s6.1"],
  unidades: [
    { t: "Transform data with T-SQL queries", c: [
      "En un warehouse, la transformación se hace con T-SQL estándar.",
      { code: "WITH ult AS (\n  SELECT PedidoID, ClienteID, Importe,\n         ROW_NUMBER() OVER (PARTITION BY ClienteID ORDER BY Fecha DESC) AS rn\n  FROM stg.Ventas\n)\nSELECT ClienteID, PedidoID, TRY_CAST(Importe AS DECIMAL(18,2)) AS Importe,\n       COALESCE(NULLIF(TRIM(Canal),''), 'Desconocido') AS Canal\nFROM ult WHERE rn = 1;" },
      { ul: [
        "CTE para estructurar consultas; funciones de ventana (ROW_NUMBER, LAG, SUM OVER) para ranking y acumulados.",
        "Limpieza: TRY_CAST, COALESCE, NULLIF, TRIM, CASE.",
        "Agregación con GROUP BY; unión de datos con JOIN y UNION.",
        "CTAS para materializar el resultado en una tabla nueva."
      ] }
    ] },
    { t: "Create views for reusable logic", c: [
      "Una vista guarda una consulta con nombre y se usa como si fuera una tabla. Sirve para centralizar lógica de transformación, simplificar el acceso para analistas y exponer solo ciertas columnas o filas.",
      { code: "CREATE VIEW dbo.vw_ventas_limpias AS\nSELECT PedidoID, ClienteID, TRY_CAST(Importe AS DECIMAL(18,2)) AS Importe\nFROM stg.Ventas\nWHERE Importe IS NOT NULL;" },
      "Las vistas no almacenan datos; se evalúan en cada consulta. Si se necesita rendimiento, se materializa con CTAS."
    ] },
    { t: "Build stored procedures", c: [
      "Un procedimiento almacenado agrupa varias sentencias reutilizables y parametrizadas, ideal para procesos repetibles como cargas y transformaciones.",
      { code: "CREATE PROCEDURE dbo.usp_cargar_dim_producto AS\nBEGIN\n  BEGIN TRY\n    TRUNCATE TABLE dbo.DimProducto;\n    INSERT INTO dbo.DimProducto (ProductoKey, ProductoID, Nombre, Categoria)\n    SELECT ROW_NUMBER() OVER (ORDER BY ProductoID), ProductoID, Nombre, Categoria\n    FROM stg.Producto;\n  END TRY\n  BEGIN CATCH\n    THROW;\n  END CATCH\nEND;" },
      { ul: [
        "Admiten parámetros, transacciones y manejo de errores con TRY/CATCH.",
        "Se invocan desde un pipeline con la actividad Stored procedure y se programan con el pipeline."
      ] }
    ] },
    { t: "Implement dimensional tables", c: [
      "Las tablas de dimensión y de hechos se crean con CREATE TABLE. En el warehouse de Fabric las claves primarias y foráneas se pueden declarar, pero no se imponen (NOT ENFORCED).",
      { code: "CREATE TABLE dbo.DimProducto (\n  ProductoKey INT NOT NULL,\n  ProductoID  INT NOT NULL,\n  Nombre      VARCHAR(100),\n  Categoria   VARCHAR(50),\n  CONSTRAINT PK_DimProducto PRIMARY KEY NONCLUSTERED (ProductoKey) NOT ENFORCED\n);" },
      { ul: [
        "Se pueden poblar con CTAS o INSERT...SELECT desde la capa de staging.",
        "La dimensión de fecha suele generarse una vez con una consulta o un procedimiento.",
        "Las dimensiones SCD tipo 2 usan columnas de fechas de vigencia e indicador de fila actual."
      ] },
      { tip: "Como no se imponen las restricciones, la integridad referencial debe garantizarse en la lógica de carga." },
      { ej: "Haz el ejercicio 'Transform data with T-SQL': crea una vista, un procedimiento y una dimensión en tu warehouse." }
    ] }
  ]
},

// ======================= RUTA 4 · Prepare AI-ready analytics data =======================
{
  id: "m31", ruta: "", titulo: "Prepare semantic models for AI in Power BI and Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/fabric-prepare-semantic-layer/",
  objetivos: ["Explicar cómo el contexto del semantic model guía las respuestas de Copilot.", "Diseñar una capa gold enfocada al consumo por IA.", "Elegir el control de 'Prep for AI' adecuado según el fallo del modelo.", "Decidir cuándo usar Fabric IQ para compartir entidades estables entre equipos.", "Validar que el modelo está listo para IA probando preguntas prioritarias y corrigiendo la causa de las respuestas erróneas."],
  habilidades: [],
  unidades: [
    { t: "Explain how semantic model context guides Copilot answers", c: [
      "Nota: este módulo es de contenido reciente y la guía de estudio del examen no lista habilidades específicas de IA. Este resumen se basa en los objetivos y en los títulos de las unidades; amplía en Learn.",
      "Copilot y los data agents responden usando el significado que el semantic model les da a los datos: nombres de tablas y columnas, relaciones, medidas, descripciones y reglas de negocio. Cuanto más claro y completo sea ese contexto, más precisas son las respuestas."
    ] },
    { t: "Design a focused gold layer for AI consumption", c: [
      { ul: [
        "Incluir solo las tablas y columnas que responden a las preguntas del negocio; menos ruido mejora la precisión.",
        "Usar nombres claros y comprensibles para el negocio y evitar abreviaturas internas.",
        "Mantener un esquema en estrella con relaciones correctas y medidas explícitas para las métricas clave.",
        "Documentar con descripciones lo que significa cada tabla, columna y medida."
      ] }
    ] },
    { t: "Select the appropriate prep for AI control", c: [
      "Power BI ofrece controles de preparación para IA ('Prep data for AI') que se eligen según el tipo de fallo observado.",
      { ul: [
        "Esquema de datos para IA: limitar qué campos puede usar Copilot cuando responde.",
        "Instrucciones de IA: texto con reglas y contexto de negocio (definiciones, términos, preferencias).",
        "Respuestas verificadas: respuestas aprobadas para preguntas frecuentes."
      ] },
      "Regla general: el campo equivocado → ajustar el esquema; el significado ambiguo → instrucciones; una pregunta recurrente con respuesta crítica → respuesta verificada."
    ] },
    { t: "Decide when to extend a semantic model with Fabric IQ", c: [
      "Cuando varias áreas necesitan compartir entidades de negocio estables (cliente, producto, pedido) con el mismo significado, se puede elevar el modelo a una ontología de Fabric IQ en lugar de duplicar definiciones en cada semantic model. Los detalles de Fabric IQ están en los dos módulos siguientes."
    ] },
    { t: "Validate AI readiness", c: [
      { ul: [
        "Preparar una lista de preguntas prioritarias del negocio con la respuesta esperada.",
        "Probarlas con Copilot y revisar cada respuesta incorrecta.",
        "Identificar la causa (nombre ambiguo, relación faltante, medida inexistente, contexto insuficiente) y corregirla en el modelo, no solo en la pregunta.",
        "Repetir hasta que las respuestas sean estables."
      ] },
      { ej: "Haz el ejercicio 'Prepare a semantic model for AI'." }
    ] }
  ]
},

{
  id: "m32", ruta: "", titulo: "Understand Microsoft Fabric IQ fundamentals",
  url: "https://learn.microsoft.com/en-us/training/modules/understand-fabric-iq-fundamentals/",
  objetivos: ["Explicar qué es Fabric IQ y cómo encaja en la capa de inteligencia empresarial Microsoft IQ.", "Describir el papel de los ontology items: tipos de entidad, instancias, propiedades, relaciones y reglas.", "Distinguir los roles de cada item de la carga de trabajo IQ.", "Comparar el modelado de ontologías, guiado por conceptos, con el modelado tradicional guiado por casos de uso."],
  habilidades: [],
  unidades: [
    { t: "Get started with Fabric IQ", c: [
      "Nota: contenido reciente que no aparece en las habilidades de la guía de estudio. Resumen basado en lo que publica el módulo; amplía en Learn.",
      "Fabric IQ forma parte de Microsoft IQ, una capa de inteligencia empresarial que convierte los datos de negocio en conceptos compartidos que pueden usar tanto personas como agentes de IA."
    ] },
    { t: "Explore Microsoft Fabric IQ components", c: [
      "La carga de trabajo IQ incluye seis items:",
      { ul: [
        "Ontology items: definen el vocabulario de negocio mediante tipos de entidad, instancias, propiedades, relaciones y reglas.",
        "Data agents: agentes de IA que responden preguntas sobre los datos.",
        "Graph in Microsoft Fabric: modelo de grafo para representar relaciones.",
        "Power BI semantic models: modelos con métricas y medidas del negocio.",
        "Operations agents y planning: items orientados a operaciones y planificación (consulta el módulo para su alcance exacto)."
      ] }
    ] },
    { t: "Understand the ontology modeling paradigm", c: [
      "El modelado de ontologías empieza por los conceptos del negocio (qué es un cliente, un pedido, un producto y cómo se relacionan) y no por un caso de uso concreto.",
      { ul: [
        "Enfoque tradicional: se modelan los datos para responder a un informe o caso de uso específico.",
        "Enfoque de ontología: se modelan los conceptos una vez, de forma reutilizable, y múltiples casos de uso se apoyan en ellos.",
        "Ventaja: todos hablan el mismo vocabulario, también los agentes de IA."
      ] }
    ] }
  ]
},

{
  id: "m33", ruta: "", titulo: "Create an ontology with Fabric IQ",
  url: "https://learn.microsoft.com/en-us/training/modules/create-ontology-with-fabric-iq/",
  objetivos: ["Evaluar dos enfoques para crear una ontología en Fabric IQ.", "Construir una ontología manualmente con tipos de entidad, propiedades, claves y relaciones.", "Generar una ontología a partir de un semantic model de Power BI.", "Conectar una ontología a orígenes de datos y previsualizarla."],
  habilidades: [],
  unidades: [
    { t: "Choose an ontology creation approach", c: [
      "Nota: contenido reciente fuera de las habilidades de la guía de estudio; resumen basado en los objetivos del módulo.",
      { ul: [
        "Construcción manual: se definen tipos de entidad, propiedades, claves y relaciones desde cero. Sirve para entender los componentes y cuando no hay un modelo previo.",
        "Generación desde un semantic model de Power BI: se parte de un modelo existente para acelerar el desarrollo."
      ] }
    ] },
    { t: "Build an ontology manually", c: [
      { ul: [
        "Tipo de entidad: un concepto de negocio (Cliente, Pedido).",
        "Propiedades: atributos del concepto (nombre, fecha).",
        "Clave: propiedad que identifica de forma única una instancia.",
        "Relaciones: vínculos entre tipos de entidad (un Cliente realiza Pedidos)."
      ] }
    ] },
    { t: "Generate an ontology from a Power BI semantic model", c: [
      "Se puede generar una ontología a partir de las tablas, columnas y relaciones de un semantic model existente, y luego revisarla y ajustarla. Es el camino rápido cuando el negocio ya tiene un modelo bien diseñado, que además es la base que se preparó en el módulo anterior."
    ] },
    { t: "Connect an ontology to data", c: [
      "La ontología se enlaza a datos de OneLake, como tablas de un lakehouse o flujos de un eventhouse, de modo que cada tipo de entidad se alimenta de datos reales."
    ] },
    { t: "Configure ontology relationships and preview", c: [
      "Se configuran las relaciones entre tipos de entidad usando las claves y se previsualiza la ontología para validar que las instancias y sus vínculos se ven como se espera antes de usarla.",
      { ej: "Haz los dos ejercicios del módulo: construir una ontología manualmente y generarla desde un semantic model." }
    ] }
  ]
}

);
