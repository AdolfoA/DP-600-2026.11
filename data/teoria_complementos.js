// Complementos: habilidades de la guía oficial DP-600 que los módulos anteriores no desarrollan a fondo.
// Estas lecciones son de elaboración propia a partir de los temas de la guía; consulta la documentación oficial para ampliar.
window.TEORIA = window.TEORIA || [];
window.TEORIA.push(

{
  id: "mx1", ruta: "Complementos de la guía de estudio", titulo: "Entorno, shortcuts y ciclo de vida (complemento)",
  url: "https://learn.microsoft.com/en-us/search/?terms=Fabric%20shortcuts%20OneLake",
  objetivos: ["Cubrir shortcuts, tipos de gateway, temas de informe, análisis de impacto y uso compartido de datos."],
  habilidades: ["s1.3", "s1.4", "s3.4", "s2.2", "s4.2", "s4.3", "s4.5", "s6.4", "s6.5"],
  unidades: [
    { t: "Shortcuts en OneLake", c: [
      "Un shortcut es un puntero a datos que viven en otra ubicación, de modo que aparecen como si estuvieran en el lakehouse sin copiarlos.",
      { ul: [
        "Orígenes: otros items de Fabric (lakehouse, warehouse), ADLS Gen2, Amazon S3, Google Cloud Storage y otros.",
        "Se pueden crear en la sección Files o en Tables (en Tables, el destino debe tener formato Delta para que se trate como tabla).",
        "Eliminar el shortcut elimina el puntero, no el dato de origen; cambios en el origen se ven de inmediato.",
        "Los permisos del usuario sobre el origen siguen aplicándose."
      ] },
      { tip: "Datos en otro sitio sin copiarlos → shortcut. Datos en otro sitio que hay que transformar y guardar → copia con pipeline, dataflow o notebook." }
    ] },
    { t: "Particionado de archivos y enriquecimiento de datos", c: [
      "El particionado divide una tabla o carpeta en subcarpetas por los valores de una o varias columnas, lo que permite saltar particiones al filtrar.",
      { ul: [
        "Elegir columnas de baja cardinalidad (año, mes, región).",
        "Evitar particionar por columnas de alta cardinalidad o en tablas pequeñas: genera demasiados archivos.",
        "En Spark: df.write.partitionBy('Year', 'Month')."
      ] },
      "Enriquecer datos consiste en añadir columnas o tablas derivadas (por ejemplo, una columna de año o categoría calculada, o una tabla de referencia) mediante Spark, SQL o Power Query."
    ] },
    { t: "Desnormalizar, agregar y desagregar datos", c: [
      { ul: [
        "Desnormalizar: unir tablas relacionadas en una más ancha para evitar joins en cada consulta. Es habitual al construir dimensiones del esquema en estrella a partir de varias tablas normalizadas del origen.",
        "Agregar: resumir datos a un nivel superior (por ejemplo, ventas diarias a mensuales) con GROUP BY o groupBy/agg. Reduce volumen y acelera informes; se usa en tablas de agregación de la capa gold.",
        "Desagregar: repartir un valor de un nivel superior a un nivel de detalle (por ejemplo, un presupuesto anual a meses) con reglas de asignación o tablas de pesos."
      ] },
      { code: "-- Dimensión desnormalizada\nSELECT p.ProductID, p.Name, c.CategoryName, s.SubcategoryName\nFROM Product p\nJOIN Subcategory s ON s.SubcategoryID = p.SubcategoryID\nJOIN Category c ON c.CategoryID = s.CategoryID;\n\n-- Agregación mensual\nSELECT YEAR(OrderDate) AS Y, MONTH(OrderDate) AS M, SUM(Amount) AS Total\nFROM FactSales GROUP BY YEAR(OrderDate), MONTH(OrderDate);" }
    ] },
    { t: "Tipos de data gateway", c: [
      "Un gateway permite que los servicios en la nube accedan a orígenes que están en redes privadas.",
      { tabla: [
        ["Tipo", "Para qué sirve"],
        ["On-premises data gateway (modo estándar)", "Orígenes locales compartidos por varios usuarios y servicios (Power BI, Dataflows, pipelines)."],
        ["On-premises data gateway (modo personal)", "Un solo usuario y solo Power BI; no es para uso compartido."],
        ["VNet data gateway", "Orígenes dentro de una red virtual de Azure, sin infraestructura propia que gestionar."]
      ] },
      { tip: "Varios usuarios y orígenes locales → modo estándar. Orígenes en una VNet de Azure → VNet data gateway." }
    ] },
    { t: "Tema de informe personalizado", c: [
      "Un tema de informe es un archivo JSON que define colores, tipografías y formato por defecto de los visuales. Se importa en Power BI Desktop (Ver > Temas > Examinar temas) y permite coherencia visual entre informes.",
      "Se puede crear editando un tema existente o con el editor de temas integrado."
    ] },
    { t: "Análisis de impacto (impact analysis)", c: [
      "El análisis de impacto muestra qué items dependen de otro: por ejemplo, qué semantic models e informes se verán afectados si cambias una tabla de un lakehouse.",
      { ul: [
        "Se consulta desde la vista de linaje (lineage view) del workspace.",
        "Permite avisar a los propietarios de los items dependientes antes de hacer un cambio.",
        "Abarca lakehouses, warehouses, dataflows y semantic models."
      ] }
    ] },
    { t: "Uso compartido de datos", c: [
      "Se puede compartir un workspace (con roles), un item concreto (con permisos específicos) o los datos con usuarios de otros tenants mediante el uso compartido externo.",
      { ul: [
        "Compartir un lakehouse o warehouse da acceso a los datos sin dar acceso al workspace completo.",
        "Los permisos que se conceden se combinan con la seguridad granular de OneLake o de T-SQL."
      ] }
    ] }
  ]
},

{
  id: "mx2", ruta: "Complementos de la guía de estudio", titulo: "Modelos semánticos avanzados (complemento)",
  url: "https://learn.microsoft.com/en-us/search/?terms=Direct%20Lake%20semantic%20model",
  objetivos: ["Cubrir Direct Lake, DAX Studio, Tabular Editor, grupos de cálculo, parámetros de campo, funciones de ventana, formato grande, modelos compuestos e incremental refresh."],
  habilidades: ["s8.1", "s8.2", "s8.4", "s8.5", "s8.6", "s8.7", "s8.8", "s9.2", "s9.3", "s9.4"],
  unidades: [
    { t: "Direct Lake", c: [
      "Direct Lake carga en memoria las columnas necesarias directamente desde los archivos Delta/Parquet de OneLake cuando se consulta, sin pasar por una importación tradicional ni por consultas SQL al origen.",
      { ul: [
        "Rendimiento cercano a Import con la frescura de los datos del lago.",
        "'Framing': el modelo se refresca para apuntar a la última versión de los archivos; es una operación de metadatos y muy rápida.",
        "Fallback: en Direct Lake sobre SQL endpoint, algunas condiciones (vistas, ciertas formas de seguridad, límites de tamaño) hacen que se use DirectQuery.",
        "Las tablas deben estar en formato Delta y se benefician de V-Order, compactación y pocos archivos."
      ] },
      { tip: "Para que Direct Lake rinda bien: tablas Delta limpias, compactadas (OPTIMIZE) y con V-Order." }
    ] },
    { t: "DAX Studio y Tabular Editor 2", c: [
      "Son herramientas externas gratuitas muy usadas en el examen.",
      { tabla: [
        ["Herramienta", "Para qué se usa"],
        ["DAX Studio", "Escribir y ejecutar consultas DAX, analizar rendimiento (Server Timings, planes de consulta) y revisar el tamaño del modelo con VertiPaq Analyzer."],
        ["Tabular Editor 2", "Editar el modelo (medidas, relaciones, jerarquías), crear grupos de cálculo y dynamic format strings, configurar OLS, ejecutar scripts y el Best Practice Analyzer."]
      ] },
      { tip: "Analizar tiempos de una consulta DAX → DAX Studio. Modificar metadatos del modelo o crear un calculation group → Tabular Editor." }
    ] },
    { t: "Funciones DAX de ventana, de información y filtrado de tablas", c: [
      { ul: [
        "Funciones de ventana: OFFSET, INDEX, WINDOW y RANK devuelven filas relativas a la actual dentro de una tabla ordenada (por ejemplo, el valor del mes anterior).",
        "Funciones de información: ISBLANK, ISFILTERED, ISCROSSFILTERED, HASONE y similares permiten ramificar la lógica según el contexto.",
        "Filtrado de tablas: FILTER, ALL, ALLEXCEPT, REMOVEFILTERS y KEEPFILTERS controlan qué filtros se aplican dentro de CALCULATE."
      ] },
      { code: "Ventas mes anterior =\nCALCULATE([Ventas], OFFSET(-1, ALLSELECTED(Fechas[Mes]), ORDERBY(Fechas[Mes])))" }
    ] },
    { t: "Grupos de cálculo, dynamic format strings y field parameters", c: [
      { ul: [
        "Calculation group: una tabla con 'calculation items' que reescriben el cálculo de las medidas (por ejemplo, YTD, año anterior). Se crea con Tabular Editor. Se usa SELECTEDMEASURE() para referirse a la medida activa.",
        "Dynamic format string: una expresión DAX que decide el formato (moneda, porcentaje) de una medida según el contexto.",
        "Field parameter: tabla especial para que el usuario elija en un segmentador qué medidas o columnas muestra un visual."
      ] },
      { code: "-- Calculation item 'YTD'\nCALCULATE(SELECTEDMEASURE(), DATESYTD(Fechas[Fecha]))" }
    ] },
    { t: "Relaciones muchos-a-muchos y tablas puente", c: [
      "Una relación muchos-a-muchos aparece cuando ninguna de las dos tablas tiene valores únicos en la columna de relación. Power BI permite crearla directamente, pero es más claro modelarla con una tabla puente (bridge) que contiene los pares de claves y relaciones uno-a-muchos con cada lado.",
      { ul: [
        "Evitar filtros bidireccionales salvo que sea necesario.",
        "En el warehouse o lakehouse, la tabla puente se construye en la capa gold para simplificar el modelo."
      ] }
    ] },
    { t: "Formato de almacenamiento grande y modelos compuestos", c: [
      { ul: [
        "Large semantic model storage format: permite que el modelo crezca más allá del límite estándar y mejora la carga y escritura de particiones; es requisito para otras funciones de escala.",
        "Modelos compuestos: combinan tablas en Import, DirectQuery y Dual; las agregaciones definidas por el usuario aceleran consultas sobre tablas grandes.",
        "En un modelo compuesto, las relaciones entre tablas de distinto modo son 'limitadas' (limited relationships), con restricciones en algunas operaciones."
      ] }
    ] },
    { t: "Actualización incremental (incremental refresh)", c: [
      "Evita recargar todo el conjunto de datos en cada actualización: solo se actualizan las particiones recientes y se conservan las históricas.",
      { ul: [
        "Se crean los parámetros RangeStart y RangeEnd de tipo fecha/hora.",
        "Se filtra la tabla en Power Query con esos parámetros sobre una columna de fecha.",
        "Se define la política: cuánto histórico conservar y cuánto periodo actualizar.",
        "Requiere query folding en el origen para ser eficiente."
      ] },
      { tip: "Los nombres RangeStart y RangeEnd son obligatorios y distinguen mayúsculas y minúsculas." }
    ] }
  ]
},

{
  id: "mx3", ruta: "Complementos de la guía de estudio", titulo: "Explorar y analizar datos (complemento)",
  url: "https://learn.microsoft.com/en-us/search/?terms=Power%20BI%20analytics%20forecast%20key%20influencers",
  objetivos: ["Cubrir tipos de análisis, perfilado de datos y consultas con el endpoint XMLA."],
  habilidades: ["s10.1", "s10.2", "s10.3", "s11.3"],
  unidades: [
    { t: "Tipos de análisis: descriptivo, diagnóstico, predictivo y prescriptivo", c: [
      { tabla: [
        ["Tipo", "Pregunta que responde", "Ejemplos en Fabric / Power BI"],
        ["Descriptivo", "¿Qué pasó?", "KPI, tablas, gráficos de tendencia, tarjetas."],
        ["Diagnóstico", "¿Por qué pasó?", "Decomposition tree, key influencers, drill-down y drill-through."],
        ["Predictivo", "¿Qué pasará?", "Forecast del panel de análisis, detección de anomalías, modelos de ML consumidos desde un informe."],
        ["Prescriptivo", "¿Qué debemos hacer?", "Recomendaciones y optimizaciones derivadas de modelos, mostradas en el informe."]
      ] },
      "Se pueden integrar los resultados de un modelo (por ejemplo, entrenado en un notebook de Fabric y guardado como tabla de predicciones) en un visual o informe para análisis predictivo y prescriptivo."
    ] },
    { t: "Perfilado de datos", c: [
      "Perfilar datos es entender su calidad y distribución antes de transformarlos o modelarlos.",
      { ul: [
        "Power Query: Column quality (válido, error, vacío), Column distribution (valores distintos y únicos) y Column profile (estadísticas y distribución de valores).",
        "Spark: df.describe(), df.summary(), conteo de nulos y de distintos.",
        "T-SQL: COUNT(DISTINCT ...), MIN/MAX, conteo de NULL por columna."
      ] },
      { code: "df.describe().show()\nfrom pyspark.sql.functions import col, sum as _sum\ndf.select([_sum(col(c).isNull().cast('int')).alias(c) for c in df.columns]).show()" }
    ] },
    { t: "Consultas con el endpoint XMLA", c: [
      "El endpoint XMLA permite conectar herramientas cliente (SSMS, DAX Studio, Excel) a un semantic model y ejecutar consultas DAX (y MDX) directamente sobre él.",
      { ul: [
        "Se usa la cadena de conexión del workspace (powerbi://api.powerbi.com/v1.0/myorg/<workspace>).",
        "En modo solo lectura sirve para consultar; en lectura/escritura también para desplegar y administrar.",
        "Se necesita una capacidad de Fabric o Premium con el endpoint habilitado."
      ] },
      { code: "EVALUATE\nSUMMARIZECOLUMNS(Fechas[Año], \"Ventas\", [Ventas])\nORDER BY Fechas[Año]" }
    ] }
  ]
}

);
