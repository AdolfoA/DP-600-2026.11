// Teoría DP-600 · Ruta oficial "Implement a Lakehouse with Microsoft Fabric" (7 módulos).
// Estructura y objetivos tomados de Microsoft Learn; el texto de cada lección es un resumen propio en español.
// Bloques: string = párrafo · {ul:[]} lista · {code:""} código · {tip:""} clave de examen · {ej:""} qué practicar
window.TEORIA = window.TEORIA || [];
window.TEORIA.push(

{
  id: "m01", ruta: "Implement a Lakehouse with Microsoft Fabric", titulo: "Introduction to end-to-end analytics using Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/introduction-end-analytics-use-microsoft-fabric/",
  objetivos: ["Identificar las capacidades de Microsoft Fabric.", "Implementar Fabric para cubrir las necesidades de analítica de una empresa.", "Describir cómo Fabric da soporte a la IA mediante Copilot, data agents y Fabric IQ."],
  habilidades: ["s1.1", "s2.5"],
  unidades: [
    { t: "Explore end-to-end analytics with Microsoft Fabric", c: [
      "Microsoft Fabric es una plataforma de analítica SaaS que unifica en un solo producto la ingesta, el almacenamiento, la transformación, el modelado, la ciencia de datos, el análisis en tiempo real y la visualización. Todo funciona sobre una capa de almacenamiento común llamada OneLake.",
      "OneLake funciona como un 'OneDrive para datos': hay un único lago lógico por tenant, y todos los componentes leen y escriben en él. Los datos tabulares se guardan en formato Delta (Parquet + registro de transacciones), de modo que Spark, T-SQL y Power BI trabajan sobre las mismas copias de los datos sin duplicarlos.",
      { ul: [
        "Experiencias (workloads): Data Factory (integración), Data Engineering (lakehouse y Spark), Data Warehouse, Data Science, Real-Time Intelligence y Power BI.",
        "Jerarquía de recursos: tenant → capacidad → workspace → items (lakehouse, warehouse, pipeline, notebook, semantic model, informe…).",
        "Shortcuts: referencias a datos que están en otro sitio (otro lakehouse, ADLS Gen2, S3…) sin copiarlos.",
        "Direct Lake: modo de semantic model que lee directamente las tablas Delta de OneLake."
      ] },
      { tip: "Si una pregunta habla de 'una sola copia de los datos' o de 'evitar duplicar', piensa en OneLake, shortcuts y Direct Lake." }
    ] },
    { t: "Explore data teams and Microsoft Fabric", c: [
      "Fabric está pensado para que distintos perfiles colaboren sobre la misma plataforma. Cada rol usa las experiencias que mejor encajan con su trabajo.",
      { ul: [
        "Data engineer: construye la ingesta y el almacenamiento (pipelines, Spark, lakehouses).",
        "Analytics engineer: es el rol objetivo de DP-600. Transforma los datos ya ingeridos, los modela (esquema en estrella, semantic models, DAX) y los deja listos para consumo.",
        "Data analyst: explora los datos y crea informes y paneles.",
        "Data scientist: entrena y consume modelos de machine learning.",
        "Administrador / gobierno: gestiona la capacidad, la seguridad y las políticas."
      ] },
      "Un analytics engineer actúa como puente: recibe datos de los ingenieros y los transforma en modelos semánticos y activos reutilizables para los analistas."
    ] },
    { t: "Enable and use Microsoft Fabric", c: [
      "Para usar Fabric hay que habilitarlo a nivel de tenant desde el portal de administración (Tenant settings), ya sea para toda la organización o para grupos de seguridad concretos. También hay que disponer de una capacidad.",
      { ul: [
        "Capacidad: recurso de cómputo medido en Capacity Units (CU). Los SKU F (F2, F4… F2048) son de pago por uso y se pueden pausar; también existe el trial.",
        "Un workspace se asigna a una capacidad; los items del workspace consumen CU de esa capacidad.",
        "Licencias: con SKU por debajo de F64 los consumidores de Power BI necesitan licencia Pro o PPU; desde F64 pueden ver contenido con licencia gratuita.",
        "Copilot, data agents y Fabric IQ son capacidades de IA integradas en la plataforma (requieren habilitarlas y una capacidad compatible)."
      ] },
      { tip: "La licencia y el SKU son tema recurrente: recuerda el umbral de F64 (equivalente a P1) para consumo gratuito." },
      { ej: "Crea un workspace, asígnalo a una capacidad trial o F y abre el portal de administración para localizar los Tenant settings." }
    ] }
  ]
},

{
  id: "m02", ruta: "Implement a Lakehouse with Microsoft Fabric", titulo: "Get started with lakehouses in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/get-started-lakehouses/",
  objetivos: ["Describir las características principales de los lakehouses en Fabric.", "Crear un lakehouse.", "Ingerir y transformar datos en un lakehouse.", "Consultar y analizar datos del lakehouse con SQL y Spark."],
  habilidades: ["s4.1", "s4.2", "s4.3", "s11.1"],
  unidades: [
    { t: "Describe lakehouse features and capabilities", c: [
      "Un lakehouse combina la flexibilidad de un data lake (cualquier formato, bajo coste) con las capacidades analíticas de un data warehouse (esquema, tablas, SQL). Se apoya en OneLake y en el formato Delta.",
      { ul: [
        "Sección Tables: tablas Delta gestionadas por el lakehouse; aparecen automáticamente en el SQL analytics endpoint.",
        "Sección Files: archivos sin esquema en cualquier formato (CSV, JSON, Parquet, imágenes…), zona de aterrizaje de datos en bruto.",
        "SQL analytics endpoint: se crea automáticamente y permite consultar las tablas con T-SQL en modo solo lectura.",
        "Se trabaja con Spark (notebooks) para leer y escribir, y se consume desde Power BI (incluido Direct Lake)."
      ] },
      { tip: "Lakehouse = Spark para escribir, T-SQL de solo lectura para consultar. Si necesitas DML en T-SQL, la respuesta es warehouse." }
    ] },
    { t: "Ingest and transform data in a lakehouse", c: [
      "Hay varias formas de llevar datos al lakehouse, y la elección depende del volumen, la complejidad de la transformación y el perfil de quien lo hace.",
      { ul: [
        "Subir archivos manualmente (útil para pruebas).",
        "Dataflows Gen2: ingesta y transformación low-code con Power Query.",
        "Data pipelines (Copy activity): copia a gran escala y orquestación.",
        "Notebooks de Spark: lógica compleja en código (PySpark, Spark SQL).",
        "Shortcuts: acceder a datos externos sin moverlos."
      ] },
      "Los archivos en Files (CSV, Parquet) se pueden convertir en tablas Delta con la opción 'Load to tables' o con Spark (por ejemplo, leyendo el archivo y guardándolo con saveAsTable).",
      { tip: "Low-code y analistas → Dataflow Gen2. Volumen y orquestación → pipeline. Lógica compleja → notebook." }
    ] },
    { t: "Query and analyze lakehouse data", c: [
      "Los datos de un lakehouse se pueden consultar de varias maneras según el caso.",
      { ul: [
        "SQL analytics endpoint: consultas T-SQL de solo lectura, vistas, funciones y procedimientos; también el visual query editor.",
        "Spark SQL y DataFrames desde un notebook.",
        "Power BI: crear un semantic model sobre el lakehouse; en Direct Lake lee las tablas Delta directamente.",
        "Se pueden hacer consultas entre items del mismo workspace con nombres de tres partes."
      ] },
      { code: "-- T-SQL sobre el SQL analytics endpoint\nSELECT TOP 10 Category, SUM(Sales) AS Total\nFROM dbo.sales\nGROUP BY Category\nORDER BY Total DESC;" },
      { ej: "Crea un lakehouse, sube un CSV, conviértelo en tabla y consúltalo con T-SQL y con Spark." }
    ] }
  ]
},

{
  id: "m03", ruta: "Implement a Lakehouse with Microsoft Fabric", titulo: "Use Apache Spark in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/use-apache-spark-work-files-lakehouse/",
  objetivos: ["Configurar Spark en un workspace de Fabric.", "Identificar escenarios adecuados para notebooks y para Spark job definitions.", "Usar DataFrames de Spark para analizar y transformar datos.", "Usar Spark SQL para consultar tablas y vistas.", "Visualizar datos en un notebook de Spark."],
  habilidades: ["s4.1", "s6.7", "s6.8", "s6.9", "s10.3", "s7.1"],
  unidades: [
    { t: "Prepare to use Apache Spark", c: [
      "Spark es el motor de procesamiento distribuido de Fabric para grandes volúmenes de datos. La configuración se hace en los ajustes del workspace (Data Engineering/Science).",
      { ul: [
        "Pools de Spark: el starter pool arranca en segundos porque está pre-calentado; los custom pools permiten ajustar tamaño de nodos y autoescalado.",
        "Runtime: versión de Spark y librerías incluidas; se puede fijar a nivel de workspace.",
        "Environments: conjuntos reutilizables de librerías y configuraciones que se asocian a notebooks.",
        "Notebook vs Spark job definition: el notebook es interactivo (exploración, desarrollo); la Spark job definition ejecuta un script de forma programada, con parámetros, sin interfaz interactiva."
      ] },
      { tip: "Exploración y desarrollo interactivo → notebook. Trabajo batch programado y repetible → Spark job definition." }
    ] },
    { t: "Run Spark code", c: [
      "Los notebooks combinan celdas de código y de Markdown. Cada celda puede usar un lenguaje distinto con 'magic commands'.",
      { ul: [
        "Lenguajes: PySpark (por defecto), Spark SQL (%%sql), Scala y SparkR.",
        "Se asocia un lakehouse al notebook para leer y escribir rutas relativas como Files/... o Tables/...",
        "Los notebooks se pueden programar o incluir en un pipeline con la actividad Notebook.",
        "notebookutils (antes mssparkutils) ofrece utilidades para ejecutar otros notebooks, trabajar con archivos y gestionar parámetros."
      ] },
      { ej: "Crea un notebook, asócialo a un lakehouse y ejecuta una celda PySpark y una celda %%sql." }
    ] },
    { t: "Work with data in a Spark dataframe", c: [
      "Un DataFrame es una tabla distribuida con columnas con nombre y tipo. Es la estructura principal para transformar datos en Spark.",
      { code: "df = spark.read.format('csv').option('header','true').load('Files/orders/*.csv')\n\n# Transformaciones frecuentes\nfrom pyspark.sql.functions import col, year\ndf2 = (df.select('OrderID','CustomerID','Amount','OrderDate')\n         .filter(col('Amount') > 0)\n         .withColumn('Amount', col('Amount').cast('decimal(18,2)'))\n         .withColumn('Year', year(col('OrderDate')))\n         .dropDuplicates(['OrderID']))\n\n# Guardar particionado\ndf2.write.mode('overwrite').partitionBy('Year').parquet('Files/orders_clean')" },
      { ul: [
        "Esquema: se puede inferir o definir explícitamente con StructType (más fiable y rápido).",
        "Limpieza: filter, dropDuplicates, fillna / dropna para nulos, cast para tipos.",
        "Agregación: groupBy(...).agg(...); uniones con join.",
        "describe() y summary() dan estadísticas rápidas para perfilar datos."
      ] },
      { tip: "Conversión de tipos en PySpark = withColumn + cast. Duplicados = dropDuplicates. Son preguntas típicas." }
    ] },
    { t: "Work with data using Spark SQL", c: [
      "Spark SQL permite consultar con SQL los datos de un DataFrame o las tablas del catálogo del lakehouse.",
      { ul: [
        "Vista temporal: df.createOrReplaceTempView('ventas') y después spark.sql('SELECT ...').",
        "Tablas del catálogo: gestionadas (el lakehouse controla datos y metadatos) o externas (los datos están en otra ubicación).",
        "La celda %%sql ejecuta SQL directamente sin envolverlo en spark.sql()."
      ] },
      { code: "df.createOrReplaceTempView('ventas')\nspark.sql(\"SELECT Year, SUM(Amount) AS Total FROM ventas GROUP BY Year ORDER BY Year\").show()" }
    ] },
    { t: "Visualize data in a Spark notebook", c: [
      "Los notebooks incluyen visualización integrada: display(df) muestra una tabla con un selector para convertirla en gráfico (barras, líneas, dispersión…).",
      "Para más control se usan librerías de Python como matplotlib o seaborn, normalmente tras convertir un DataFrame pequeño a pandas con toPandas().",
      { tip: "toPandas() trae todos los datos al driver: solo úsalo con conjuntos pequeños o ya agregados." },
      { ej: "Haz el ejercicio 'Analyze data with Apache Spark' del módulo y crea un gráfico con display()." }
    ] }
  ]
},

{
  id: "m04", ruta: "Implement a Lakehouse with Microsoft Fabric", titulo: "Work with Delta Lake tables in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/work-delta-lake-tables-fabric/",
  objetivos: ["Entender Delta Lake y las tablas Delta en Fabric.", "Crear y gestionar tablas Delta con Spark.", "Optimizar tablas Delta.", "Usar Spark para consultar y transformar datos en tablas Delta.", "Usar tablas Delta con Spark Structured Streaming."],
  habilidades: ["s7.3", "s7.2", "s4.3", "s6.6"],
  unidades: [
    { t: "Understand Delta Lake", c: [
      "Delta Lake es una capa de almacenamiento de código abierto que añade a los archivos Parquet un registro de transacciones (la carpeta _delta_log). Todas las tablas de un lakehouse de Fabric son Delta.",
      { ul: [
        "Transacciones ACID: las operaciones son atómicas y consistentes aunque haya lecturas y escrituras concurrentes.",
        "Time travel: se pueden consultar versiones anteriores de la tabla (por número de versión o marca de tiempo).",
        "Aplicación de esquema (schema enforcement) y evolución de esquema.",
        "Soporte de UPDATE, DELETE y MERGE sobre datos que, en un lago normal, serían inmutables.",
        "Mismo formato para procesamiento batch y streaming."
      ] },
      { tip: "Si hay que actualizar o borrar filas en el lakehouse, la herramienta es Delta (MERGE/UPDATE/DELETE) desde Spark." }
    ] },
    { t: "Create delta tables", c: [
      "Hay varias formas de crear una tabla Delta en Spark, según se quiera gestionada (datos dentro del lakehouse) o externa (datos en otra ruta).",
      { code: "# Tabla gestionada a partir de un DataFrame\ndf.write.format('delta').saveAsTable('ventas')\n\n# Tabla externa (ruta explícita)\ndf.write.format('delta').save('Files/ventas_ext')\n\n# Con SQL\nspark.sql(\"CREATE TABLE ventas2 (Id INT, Total DECIMAL(18,2)) USING DELTA\")\n\n# Con la API de Delta\nfrom delta.tables import DeltaTable\nDeltaTable.create(spark).tableName('ventas3').addColumn('Id','INT').execute()" },
      "Una tabla gestionada elimina también los datos al borrarla; en una externa solo se elimina la definición del catálogo."
    ] },
    { t: "Optimize delta tables", c: [
      "Con el tiempo, las escrituras pequeñas y frecuentes generan muchos archivos pequeños, lo que degrada las lecturas. El mantenimiento de tablas Delta resuelve esto.",
      { ul: [
        "OPTIMIZE: compacta archivos pequeños en archivos más grandes (bin-compaction).",
        "V-Order: optimización de escritura de Parquet específica de Fabric que acelera las lecturas en Spark, SQL y Power BI. Se puede aplicar con OPTIMIZE ... VORDER.",
        "Z-Order: reorganiza los datos para que las columnas de filtro habituales queden juntas (OPTIMIZE ... ZORDER BY).",
        "VACUUM: elimina los archivos de datos antiguos que ya no están referenciados por la versión actual; la retención por defecto es de 7 días (168 horas) y reducirla limita el time travel.",
        "Particionado: útil con columnas de baja cardinalidad; un exceso de particiones empeora el problema de archivos pequeños.",
        "Table maintenance: la interfaz del lakehouse permite lanzar OPTIMIZE y VACUUM sin escribir código."
      ] },
      { code: "OPTIMIZE ventas;\nOPTIMIZE ventas ZORDER BY (CustomerID);\nVACUUM ventas;               -- retención por defecto de 7 días" },
      { tip: "OPTIMIZE ≠ VACUUM. El primero compacta; el segundo borra archivos huérfanos. Es una de las confusiones más habituales." }
    ] },
    { t: "Work with delta tables in Spark", c: [
      "Una tabla Delta se puede leer y modificar con SQL o con la API de Python.",
      { code: "from delta.tables import DeltaTable\ndt = DeltaTable.forName(spark, 'ventas')\n\n# UPDATE y DELETE\ndt.update(condition = \"Country = 'ES'\", set = {\"Amount\": \"Amount * 1.1\"})\ndt.delete(\"Amount < 0\")\n\n# MERGE (upsert)\n(dt.alias('t').merge(nuevos.alias('s'), 't.Id = s.Id')\n   .whenMatchedUpdateAll()\n   .whenNotMatchedInsertAll()\n   .execute())\n\n# Historial y time travel\nspark.sql('DESCRIBE HISTORY ventas').show()\nspark.read.format('delta').option('versionAsOf', 3).table('ventas')" },
      "MERGE es la operación central para cargas incrementales y para implementar dimensiones de cambio lento."
    ] },
    { t: "Use delta tables with streaming data", c: [
      "Una tabla Delta puede ser origen y destino de Spark Structured Streaming: los datos que van llegando se procesan de forma incremental con la misma API que el batch.",
      { code: "# Leer una tabla Delta como flujo\nstream = spark.readStream.format('delta').table('eventos_bronze')\n\n# Escribir el flujo a otra tabla Delta\n(stream.writeStream.format('delta')\n   .outputMode('append')\n   .option('checkpointLocation', 'Files/chk/eventos_silver')\n   .toTable('eventos_silver'))" },
      "El checkpoint guarda el progreso del flujo para poder reanudar sin perder ni duplicar datos.",
      { ej: "Haz el ejercicio 'Use delta tables in Apache Spark': crea una tabla, aplica MERGE, consulta una versión anterior y ejecuta OPTIMIZE y VACUUM." }
    ] }
  ]
},

{
  id: "m05", ruta: "Implement a Lakehouse with Microsoft Fabric", titulo: "Ingest Data with Dataflows Gen2 in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/use-dataflow-gen-2-fabric/",
  objetivos: ["Describir las capacidades de los Dataflows en Fabric.", "Crear soluciones Dataflow para ingerir y transformar datos.", "Incluir un Dataflow en un pipeline."],
  habilidades: ["s4.1", "s5.2", "s5.5", "s7.1"],
  unidades: [
    { t: "Understand Dataflows Gen2 in Microsoft Fabric", c: [
      "Dataflow Gen2 es la herramienta de ingesta y transformación visual de Data Factory en Fabric. Usa Power Query Online, la misma tecnología que Power BI, y ofrece un gran catálogo de conectores.",
      { ul: [
        "Low-code: pensado para analistas y para quien prefiere una interfaz visual frente a código.",
        "Destinos de datos: lakehouse, warehouse, SQL database, Azure Data Explorer, entre otros. Se configura por consulta.",
        "Método de actualización del destino: reemplazar (replace) o anexar (append).",
        "Staging: las consultas pueden pasar por un almacenamiento intermedio para aprovechar un motor de cómputo más potente.",
        "Se pueden programar actualizaciones y usarse como actividad dentro de un pipeline."
      ] },
      { tip: "Dataflow Gen2 incorpora destinos de salida, algo que no tenían los dataflows de Power BI (Gen1)." }
    ] },
    { t: "Explore Dataflows Gen2 in Microsoft Fabric", c: [
      "El editor de Power Query muestra los pasos aplicados (Applied steps), una vista de diagrama y herramientas de perfilado de columnas (calidad, distribución y perfil).",
      { ul: [
        "Query folding: Power Query intenta traducir los pasos a una consulta que ejecuta el origen. Los pasos que se pueden delegar deben ir primero para reducir los datos transferidos.",
        "Parámetros: permiten reutilizar un mismo dataflow con distintos valores.",
        "Configuración de destino: asignación de columnas, nombres y tipos antes de publicar.",
        "Al publicar, el dataflow se valida y se ejecuta una primera actualización."
      ] },
      { tip: "Para mejorar el rendimiento de un dataflow lento: mantener el query folding, filtrar pronto y revisar el uso de staging." }
    ] },
    { t: "Integrate Dataflows Gen2 and Pipelines in Microsoft Fabric", c: [
      "Un pipeline puede incluir una actividad Dataflow para ejecutar un dataflow dentro de un flujo mayor, junto con otras actividades como copias, notebooks o procedimientos almacenados.",
      { ul: [
        "Permite orquestar el orden: por ejemplo, copiar los archivos, ejecutar el dataflow y después un notebook.",
        "El pipeline gestiona la programación, la gestión de errores y las dependencias entre actividades.",
        "Se usa cuando el dataflow forma parte de un proceso de varios pasos y no solo una carga aislada."
      ] },
      { ej: "Haz el ejercicio 'Create and use a Dataflow Gen2': carga un CSV, transfórmalo y publícalo hacia un lakehouse; después inclúyelo en un pipeline." }
    ] }
  ]
},

{
  id: "m06", ruta: "Implement a Lakehouse with Microsoft Fabric", titulo: "Orchestrate processes and data movement with Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/use-data-factory-pipelines-fabric/",
  objetivos: ["Describir las capacidades de los pipelines en Fabric.", "Usar la actividad Copy Data en un pipeline.", "Crear pipelines a partir de plantillas predefinidas y personalizadas.", "Ejecutar y monitorizar pipelines."],
  habilidades: ["s5.1", "s5.2", "s5.3", "s5.4", "s5.5", "s4.1"],
  unidades: [
    { t: "Understand pipelines", c: [
      "Un pipeline de Fabric (Data Factory) es un flujo de trabajo compuesto por actividades que se ejecutan en un orden definido. Sirve para orquestar la ingesta y la transformación de datos.",
      { ul: [
        "Movimiento de datos: Copy data (y Copy job como item aparte para copias más sencillas e incrementales).",
        "Transformación: Dataflow, Notebook, Spark job definition, Stored procedure, Script.",
        "Control de flujo: ForEach, If Condition, Switch, Until, Wait, Set variable, Invoke pipeline, Lookup, Get Metadata.",
        "Parámetros y variables, con expresiones dinámicas para reutilizar un pipeline en distintos escenarios.",
        "Dependencias entre actividades: On success, On fail, On completion y On skip."
      ] },
      { tip: "Para 'ejecutar B solo si A termina bien' usa la dependencia On success; para tareas de limpieza o notificación tras un fallo usa On fail." }
    ] },
    { t: "Use the Copy Data activity", c: [
      "La actividad Copy Data copia datos de un origen a un destino con alto rendimiento, y es la opción habitual para mover grandes volúmenes hacia un lakehouse o warehouse.",
      { ul: [
        "Se configuran origen, destino y asignación de columnas (mapping).",
        "El asistente Copy data assistant guía la creación con una interfaz paso a paso.",
        "Admite una gran variedad de orígenes y destinos, dentro y fuera de Fabric.",
        "Para cargas simples o incrementales existe además el item Copy job."
      ] },
      { ej: "Crea un pipeline con una actividad Copy Data que lleve un CSV de un origen público a la sección Files de un lakehouse." }
    ] },
    { t: "Use pipeline templates", c: [
      "Las plantillas aceleran la creación de pipelines con patrones habituales ya configurados.",
      { ul: [
        "Plantillas predefinidas: escenarios comunes, como copiar datos de un origen concreto a un lakehouse.",
        "Plantillas personalizadas: se pueden exportar un pipeline existente como plantilla y reutilizarlo en otros workspaces o proyectos."
      ] }
    ] },
    { t: "Run and monitor pipelines", c: [
      "Un pipeline se ejecuta manualmente, con una programación (schedule) o por un desencadenador de evento.",
      { ul: [
        "Programación: define frecuencia, hora de inicio y fin, y zona horaria.",
        "Monitorización: el monitoring hub y la vista de ejecuciones muestran estado, duración y la entrada y salida de cada actividad.",
        "Ante un fallo se puede inspeccionar el error de la actividad y volver a ejecutar desde la actividad fallida."
      ] },
      { tip: "Programar pipelines, dataflows y notebooks aparece en la guía de estudio: recuerda que cada uno se puede programar por separado o encadenarse dentro de un pipeline." },
      { ej: "Haz el ejercicio 'Ingest data with a pipeline' y programa su ejecución diaria." }
    ] }
  ]
},

{
  id: "m07", ruta: "Implement a Lakehouse with Microsoft Fabric", titulo: "Organize a Fabric lakehouse using medallion architecture design",
  url: "https://learn.microsoft.com/en-us/training/modules/describe-medallion-architecture/",
  objetivos: ["Describir el patrón de arquitectura medallion y por qué se usa.", "Identificar las decisiones clave al planificarlo en Fabric.", "Describir cómo se sirven los datos de la capa gold para consulta e informes.", "Describir buenas prácticas de seguridad y gobierno de las capas medallion."],
  habilidades: ["s4.5", "s6.1", "s6.2", "s2.1"],
  unidades: [
    { t: "Describe medallion architecture", c: [
      "La arquitectura medallion organiza los datos del lakehouse en capas con calidad creciente. Cada capa refina la anterior.",
      { ul: [
        "Bronze (cruda): los datos tal como llegan del origen, sin transformar; se conserva el histórico y sirve de fuente de verdad para reprocesar.",
        "Silver (validada): datos limpiados, deduplicados, con tipos corregidos y conformados; es la capa de empresa.",
        "Gold (curada): datos modelados para el negocio, normalmente en esquema en estrella, con agregaciones y listos para informes."
      ] },
      { tip: "Orden de calidad: Bronze → Silver → Gold. La limpieza y la deduplicación ocurren al pasar de Bronze a Silver; el modelado dimensional, en Gold." }
    ] },
    { t: "Plan a medallion architecture in Fabric", c: [
      "Antes de implementar hay que tomar decisiones de diseño.",
      { ul: [
        "Separación física: una sola lakehouse con esquemas o carpetas por capa, o un lakehouse (o warehouse) distinto por capa, a veces en workspaces diferentes.",
        "Método de transformación entre capas: notebooks de Spark, dataflows o pipelines.",
        "Carga incremental frente a completa en cada paso.",
        "Formato de almacenamiento: tablas Delta en silver y gold; archivos en bruto en bronze.",
        "El warehouse es una opción habitual para la capa gold cuando se necesita T-SQL completo."
      ] }
    ] },
    { t: "Query and report on data in your Fabric lakehouse", c: [
      "La capa gold se sirve a los consumidores por varias vías.",
      { ul: [
        "SQL analytics endpoint: consultas T-SQL de solo lectura sobre las tablas.",
        "Semantic model en Direct Lake sobre las tablas Delta de gold, con informes de Power BI encima.",
        "Visual query editor y notebooks para exploración."
      ] },
      "Un buen diseño en gold (esquema en estrella, nombres claros, tipos correctos) facilita después un modelo semántico eficiente."
    ] },
    { t: "Secure and govern your medallion lakehouse", c: [
      "Cada capa puede tener distintos niveles de acceso: por ejemplo, ingenieros con acceso a bronze y silver, y analistas solo a gold.",
      { ul: [
        "Roles de workspace y permisos a nivel de item para controlar quién ve cada capa.",
        "Seguridad de datos con OneLake security y T-SQL (RLS, CLS, enmascaramiento) donde aplique.",
        "Gobierno: etiquetas de sensibilidad, endorsement (certificación) de los items de gold y linaje para trazar de dónde vienen los datos."
      ] },
      { ej: "Haz el ejercicio 'Organize your Fabric lakehouse using a medallion architecture': crea las tres capas y mueve datos de bronze a gold." }
    ] }
  ]
}

);
